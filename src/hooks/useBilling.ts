/**
 * useBilling.ts
 *
 * Wraps cordova-plugin-purchase (CdvPurchase) to handle Google Play Billing
 * for the consumable "heart_refill_099" product.
 *
 * Requirements:
 *   npm install cordova-plugin-purchase
 *   npx cap sync
 *
 * The hook exposes a single async function: purchaseHearts()
 * which initialises the store (idempotent), launches the purchase flow,
 * grants hearts on success, and consumes the purchase so it can be bought again.
 */

import { useCallback, useRef } from 'react';
// ─── Product constant ─────────────────────────────────────────────────────────
const PRODUCT_ID = 'heart_refill_099';

// ─── Capacitor platform detection ─────────────────────────────────────────────
// Reads window.Capacitor directly so we don't need @capacitor/core installed
// at the time of writing this hook. Capacitor always sets this on the window
// when running inside a native WebView.
declare global {
    interface Window {
        // Capacitor runtime object (set by the Capacitor bridge in native builds)
        Capacitor?: { isNativePlatform?: () => boolean };
        CdvPurchase?: typeof CdvPurchase;
    }
}
const isNativePlatform = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.Capacitor?.isNativePlatform === 'function' &&
    window.Capacitor.isNativePlatform();
declare namespace CdvPurchase {
    const store: Store;
    interface Store {
        register(products: RegisteredProduct[]): void;
        initialize(platforms?: Platform[]): Promise<void[]>;
        get(id: string): Product | undefined;
        when(): When;
        order(offer: Offer): Promise<{ isError: boolean; code?: ErrorCode; message?: string }>;
    }
    interface RegisteredProduct { id: string; type: ProductType; platform: Platform; }
    interface Product { id: string; offers: Offer[]; }
    interface Offer { id: string; }
    interface Transaction { finish(): Promise<void>; }
    interface When {
        productUpdated(cb: (product: Product) => void): When;
        approved(cb: (transaction: Transaction) => void): When;
        finished(cb: (transaction: Transaction) => void): When;
        unverified(cb: (transaction: Transaction) => void): When;
    }
    enum ProductType { CONSUMABLE = 'consumable', NON_CONSUMABLE = 'non consumable', PAID_SUBSCRIPTION = 'paid subscription' }
    enum Platform { GOOGLE_PLAY = 'android', APPLE_APPSTORE = 'ios' }
    enum ErrorCode { PAYMENT_CANCELLED = 6 }
}
// ─────────────────────────────────────────────────────────────────────────────

type BillingOptions = {
    /** Called when the purchase is fully acknowledged and hearts should be granted */
    onSuccess: () => void;
};

export function useBilling({ onSuccess }: BillingOptions) {
    const initialised = useRef(false);
    const initialisingPromise = useRef<Promise<void> | null>(null);

    // ── Initialise the billing store (idempotent) ────────────────────────────
    const initStore = useCallback(async (): Promise<boolean> => {
        // Only meaningful on a real device (Capacitor native WebView)
        if (!isNativePlatform()) {
            console.warn('[useBilling] Not running on a native platform — billing unavailable.');
            return false;
        }

        const CdvPurchase = window.CdvPurchase;
        if (!CdvPurchase) {
            console.warn('[useBilling] cordova-plugin-purchase is not loaded. Did you run npx cap sync?');
            return false;
        }

        if (initialised.current) return true;

        // Guard against concurrent init calls
        if (initialisingPromise.current) {
            await initialisingPromise.current;
            return initialised.current;
        }

        initialisingPromise.current = (async () => {
            try {
                // Register the consumable product
                CdvPurchase.store.register([{
                    id: PRODUCT_ID,
                    type: CdvPurchase.ProductType.CONSUMABLE,
                    platform: CdvPurchase.Platform.GOOGLE_PLAY,
                }]);

                // Wire up the approved handler: finish (consume) the transaction.
                // Finishing a CONSUMABLE tells Google Play Billing to consume it,
                // allowing the user to purchase it again.
                CdvPurchase.store.when().approved((transaction) => {
                    transaction.finish();
                });

                // Wire up the finished handler: grant the reward once consumed.
                CdvPurchase.store.when().finished(() => {
                    onSuccess();
                });

                // Initialise — this loads product details from Google Play.
                await CdvPurchase.store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]);

                initialised.current = true;
                console.info('[useBilling] Store initialised successfully.');
            } catch (err) {
                console.warn('[useBilling] Store initialisation failed:', err);
            }
        })();

        await initialisingPromise.current;
        initialisingPromise.current = null;
        return initialised.current;
    }, [onSuccess]);

    // ── Launch the purchase flow ─────────────────────────────────────────────
    const purchaseHearts = useCallback(async (): Promise<void> => {
        try {
            const ready = await initStore();
            if (!ready) {
                // On web/dev builds, skip gracefully — the caller already handles
                // the 'iap' path as a no-op in the web environment.
                console.warn('[useBilling] Billing not available — skipping purchase.');
                return;
            }

            const CdvPurchase = window.CdvPurchase!;
            const product = CdvPurchase.store.get(PRODUCT_ID);

            if (!product || product.offers.length === 0) {
                console.warn('[useBilling] Product not found or has no offers:', PRODUCT_ID);
                return;
            }

            // Use the first (and only) offer
            const offer = product.offers[0];
            const result = await CdvPurchase.store.order(offer);

            if (result.isError) {
                if (result.code === CdvPurchase.ErrorCode.PAYMENT_CANCELLED) {
                    // User cancelled — not a real error, just close silently
                    console.info('[useBilling] Purchase cancelled by user.');
                } else {
                    console.warn('[useBilling] Purchase failed:', result.code, result.message);
                }
            }
            // On SUCCESS the "approved" → finish() → "finished" → onSuccess() chain fires automatically.
        } catch (err) {
            console.warn('[useBilling] Unexpected error during purchase flow:', err);
        }
    }, [initStore]);

    return { purchaseHearts };
}

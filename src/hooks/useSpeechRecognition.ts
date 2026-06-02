import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Levenshtein Distance ─────────────────────────────────────────────────────
// Inline implementation — no external dependency needed
function levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// ─── Japanese Normalization ───────────────────────────────────────────────────
const KANJI_TO_KANA: Record<string, string> = {
    '元気': 'げんき', '私': 'わたし', '水': 'みず', '日本': 'にほん',
    '今日': 'きょう', '明日': 'あした', '仕事': 'しごと', '名前': 'なまえ',
    '会社': 'かいしゃ', '車': 'くるま', '電車': 'でんしゃ', '学校': 'がっこう',
    '時間': 'じかん', '友達': 'ともだち', '好き': 'すき', '大好き': 'だいすき',
    '桜': 'さくら', '富士山': 'ふじさん', '海': 'うみ', '窓': 'まど',
    '靴': 'くつ', '財布': 'さいふ', '帽子': 'ぼうし', '空': 'そら',
    '青い': 'あおい', '赤い': 'あかい', '白い': 'しろい', '黒い': 'くろい',
    '高い': 'たかい', '速い': 'はやい', '静か': 'しずか', '部屋': 'へや',
    '猫': 'ねこ', '犬': 'いぬ', '鳥': 'とり', '魚': 'さかな',
    '山': 'やま', '川': 'かわ', '寺': 'てら', '神社': 'じんじゃ',
    '刀': 'かたな', '剣': 'けん', '障子': 'しょうじ', '先生': 'せんせい',
    '誰': 'だれ', '何': 'なに', '英語': 'えいご', '中国語': 'ちゅうごくご',
    '韓国語': 'かんこくご', '寿司': 'すし', 'お茶': 'おちゃ', 'ご飯': 'ごはん',
    'お腹': 'おなか', '手紙': 'てがみ', '時計': 'とけい', '電話': 'でんわ',
    '辞書': 'じしょ', '眼鏡': 'めがね', '月': 'つき', '星': 'ほし',
    '銀行': 'ぎんこう', '鍵': 'かぎ', '雑誌': 'ざっし', '写真': 'しゃしん',
    '宿題': 'しゅくだい', '食堂': 'しょくどう', '旅行': 'りょこう',
    '牛乳': 'ぎゅうにゅう', '準備': 'じゅんび', '病気': 'びょうき', '風': 'かぜ',
    // Places
    '東京': 'とうきょう', '京都': 'きょうと', '大阪': 'おおさか',
    // Adjectives
    '楽しい': 'たのしい', '嬉しい': 'うれしい', '美味しい': 'おいしい',
    // Verbs
    '食べる': 'たべる', '食べて': 'たべて', '食べ物': 'たべもの', '食べます': 'たべます',
    '飲む': 'のむ', '飲み物': 'のみもの', '飲みます': 'のみます',
    '行く': 'いく', '行きます': 'いきます',
    '見る': 'みる', '見ます': 'みます',
    '休む': 'やすむ', '休みます': 'やすみます',
    '寝る': 'ねる', '寝ます': 'ねます',
    '起きる': 'おきる', '起きます': 'おきます',
};

export function normalizeJapanese(str: string): string {
    let normalized = str;
    // Remove all punctuation (Japanese and English) and whitespace
    normalized = normalized.replace(/[、。！？\s!?,.]/g, '');

    // Replace known kanji with hiragana to aid matching
    // (Sort keys by length descending to replace longest matches first if needed, 
    // though here dictionary is mostly distinct)
    for (const [kanji, kana] of Object.entries(KANJI_TO_KANA)) {
        normalized = normalized.split(kanji).join(kana);
    }

    return normalized;
}

// ─── Context-Aware Fuzzy Match ────────────────────────────────────────────────
// Short words (≤3 chars): max 1 edit distance (precise pronunciation)
// Longer words/phrases: dynamic edit distance (lenient for complex sentences)
export function fuzzyMatch(transcript: string, candidate: string): boolean {
    const t = normalizeJapanese(transcript);
    const c = normalizeJapanese(candidate);
    if (!t || !c) return false;

    const threshold = Math.max(c.length <= 3 ? 1 : 2, Math.floor(c.length * 0.3));

    // Full match first
    if (levenshtein(t, c) <= threshold) return true;
    // Also check if transcript CONTAINS the candidate (partial speech)
    if (c.length > 2 && t.includes(c)) return true;
    return false;
}

// ─── Find Best Match Among Candidates ────────────────────────────────────────
export function findBestMatch(transcript: string, candidates: string[]): string | null {
    let bestCandidate: string | null = null;
    let bestDistance = Infinity;

    const t = normalizeJapanese(transcript);

    for (const candidate of candidates) {
        const c = normalizeJapanese(candidate);
        const dist = levenshtein(t, c);
        const threshold = Math.max(c.length <= 3 ? 1 : 2, Math.floor(c.length * 0.3));

        if (dist <= threshold && dist < bestDistance) {
            bestDistance = dist;
            bestCandidate = candidate;
        }
        // Full substring match always wins
        if (t.includes(c) && c.length > 2) {
            return candidate;
        }
    }
    return bestCandidate;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
interface SpeechRecognitionState {
    isListening: boolean;
    transcript: string;
    interimTranscript: string;
    error: string | null;
    isSupported: boolean;
}

interface SpeechRecognitionActions {
    startListening: () => void;
    stopListening: () => void;
    reset: () => void;
}

type UseSpeechRecognitionReturn = SpeechRecognitionState & SpeechRecognitionActions;

declare global {
    interface SpeechRecognition extends EventTarget {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        maxAlternatives: number;
        onstart: (event: Event) => void;
        onresult: (event: any) => void;
        onerror: (event: any) => void;
        onend: (event: Event) => void;
        start(): void;
        stop(): void;
        abort(): void;
    }

    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const SpeechRecognitionClass =
        typeof window !== 'undefined'
            ? (window.SpeechRecognition || window.webkitSpeechRecognition)
            : null;

    const isSupported = !!SpeechRecognitionClass;

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const startListening = useCallback(() => {
        if (!SpeechRecognitionClass) {
            setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }
        if (isListening) return;

        setTranscript('');
        setInterimTranscript('');
        setError(null);

        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'ja-JP';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript;
                } else {
                    interim += result[0].transcript;
                }
            }

            if (interim) setInterimTranscript(interim);
            if (final) {
                setTranscript(final);
                setInterimTranscript('');
            }
        };

        recognition.onerror = (event: any) => {
            let message = 'An error occurred.';
            switch (event.error) {
                case 'no-speech':
                    message = 'No speech was detected. Try again!';
                    break;
                case 'audio-capture':
                    message = 'Microphone not found.';
                    break;
                case 'not-allowed':
                    message = 'Microphone access denied. Please allow it in your browser settings.';
                    break;
                case 'network':
                    message = 'Network error. Check your connection.';
                    break;
                case 'aborted':
                    message = '';
                    break;
            }
            setError(message);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
            setInterimTranscript('');
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch (e) {
            setError('Could not start speech recognition.');
            setIsListening(false);
        }
    }, [SpeechRecognitionClass, isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    const reset = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
        setTranscript('');
        setInterimTranscript('');
        setError(null);
        setIsListening(false);
    }, []);

    return {
        isListening,
        transcript,
        interimTranscript,
        error,
        isSupported,
        startListening,
        stopListening,
        reset,
    };
};

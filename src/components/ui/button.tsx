import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useAudio } from "../../hooks/useAudio";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-black ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide border-b-[4px] active:border-b-0 active:translate-y-[4px]",
    {
        variants: {
            variant: {
                default: "bg-deep-indigo border-indigo-dark text-white hover:bg-opacity-90",
                primary: "bg-sakura-pink border-sakura-dark text-white hover:bg-opacity-90",
                success: "bg-success border-success-dark text-white hover:bg-opacity-90",
                danger: "bg-error border-error-dark text-white hover:bg-opacity-90",
                outline: "bg-white border-slate-300 text-slate-500 hover:bg-slate-50 border-2 border-b-4",
                ghost: "border-transparent bg-transparent hover:bg-slate-100 text-slate-600 active:translate-y-0 active:bg-slate-200",
            },
            size: {
                default: "h-12 px-6 py-2",
                sm: "h-10 rounded-xl px-4 text-xs",
                lg: "h-16 rounded-3xl px-10 text-xl",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> &
    HTMLMotionProps<"button"> & {
        asChild?: boolean;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
        const { playClick } = useAudio();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            playClick();
            if (onClick) onClick(e);
        };

        return (
            <motion.button
                whileTap={{ scale: 0.97 }}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onClick={handleClick}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };

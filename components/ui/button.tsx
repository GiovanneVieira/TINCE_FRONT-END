import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "danger" | "ghost" | "surface";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
};

const VARIANTS: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: "bg-primary active:bg-primary/80",
    text: "text-white",
  },
  danger: {
    container: "bg-danger active:bg-danger/80",
    text: "text-white",
  },
  ghost: {
    container: "bg-transparent active:bg-surface",
    text: "text-foreground",
  },
  surface: {
    container: "bg-surface active:bg-surface-elevated",
    text: "text-foreground",
  },
};

const SIZES: Record<Size, { container: string; text: string }> = {
  sm: { container: "px-3 py-2 rounded-xl", text: "text-sm" },
  md: { container: "px-4 py-3.5 rounded-2xl", text: "text-base" },
  lg: { container: "px-6 py-5 rounded-2xl", text: "text-lg" },
};

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  leftIcon,
  rightIcon,
  className,
  textClassName,
}: ButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        v.container,
        s.container,
        "flex-row items-center justify-center gap-2",
        isDisabled && "opacity-60",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          {leftIcon}
          <Text
            className={cn(v.text, s.text, "font-semibold", textClassName)}
          >
            {children}
          </Text>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}

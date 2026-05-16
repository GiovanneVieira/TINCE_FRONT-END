import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

type CardProps = ViewProps & {
  elevated?: boolean;
};

export function Card({
  className,
  elevated,
  children,
  ...rest
}: CardProps) {
  return (
    <View
      className={cn(
        elevated ? "bg-surface-elevated" : "bg-surface",
        "rounded-2xl p-4",
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}

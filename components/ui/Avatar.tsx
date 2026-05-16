import { View, Text, Image } from "react-native";
import { cn, getInitials } from "@/lib/utils";

type AvatarProps = {
  uri?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  showEditBadge?: boolean;
  className?: string;
};

const SIZES = {
  sm: { container: "w-10 h-10", text: "text-sm" },
  md: { container: "w-16 h-16", text: "text-lg" },
  lg: { container: "w-24 h-24", text: "text-2xl" },
  xl: { container: "w-32 h-32", text: "text-3xl" },
};

export function Avatar({
  uri,
  name,
  size = "md",
  showEditBadge,
  className,
}: AvatarProps) {
  const { container, text } = SIZES[size];

  return (
    <View className={cn("relative", className)}>
      <View
        className={cn(
          container,
          "rounded-full bg-surface-elevated items-center justify-center overflow-hidden",
        )}
      >
        {uri ? (
          <Image source={{ uri }} className="w-full h-full" />
        ) : (
          <Text className={cn("text-foreground font-semibold", text)}>
            {getInitials(name)}
          </Text>
        )}
      </View>

      {showEditBadge && (
        <View className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full items-center justify-center border-2 border-background">
          <Text className="text-white text-xs">✎</Text>
        </View>
      )}
    </View>
  );
}

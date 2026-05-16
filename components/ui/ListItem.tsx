import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ListItemProps = {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
  hideChevron?: boolean;
  className?: string;
};

export function ListItem({
  icon,
  label,
  onPress,
  hideChevron,
  className,
}: ListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center py-4 active:opacity-60",
        className,
      )}
    >
      <View className="w-11 h-11 rounded-full bg-surface items-center justify-center">
        {icon}
      </View>
      <Text className="ml-4 flex-1 text-foreground text-base font-semibold">
        {label}
      </Text>
      {!hideChevron && <ChevronRight size={22} color="#A1A1A1" />}
    </Pressable>
  );
}

export function ListDivider() {
  return <View className="h-px bg-border ml-16" />;
}

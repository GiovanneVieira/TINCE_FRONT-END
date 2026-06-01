import { Pressable, Text, View } from "react-native";
import { ChevronLeft, Bell, Menu as MenuIcon } from "lucide-react-native";
import { router } from "expo-router";
import { cn } from "@/lib/utils";

type HeaderProps = {
  variant?: "home" | "back";
  title?: string;
  onMenuPress?: () => void;
  onBellPress?: () => void;
  className?: string;
};

export function Header({
  variant = "home",
  title,
  onMenuPress,
  onBellPress,
  className,
}: HeaderProps) {
  if (variant === "back") {
    return (
      <View
        className={cn(
          "flex-row items-center justify-between px-4 py-2",
          className,
        )}
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center active:opacity-50"
        >
          <ChevronLeft size={28} color="#F5F5F5" />
        </Pressable>
        <Text className="text-foreground text-xl font-bold absolute left-12">
          {title}
        </Text>
        <View className="w-10" />
      </View>
    );
  }

  return (
    <View className={cn("bg-[#232325] border-b border-[#3A3A3E] px-6 py-3.5", className)}>
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={onMenuPress}
          className="w-10 h-10 items-center justify-center active:opacity-50"
        >
          <MenuIcon size={31} color="#F5F5F5" strokeWidth={2.3} />
        </Pressable>

        <View className="w-10 h-10" />

        <Pressable
          onPress={onBellPress}
          className="w-10 h-10 items-center justify-center active:opacity-50"
        >
          <Bell size={29} color="#F5F5F5" strokeWidth={2.1} />
        </Pressable>
      </View>
    </View>
  );
}

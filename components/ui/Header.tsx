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
    <View
      className={cn(
        "flex-row items-center justify-between px-5 py-3",
        className,
      )}
    >
      <Pressable
        onPress={onMenuPress}
        className="w-10 h-10 items-center justify-center active:opacity-50"
      >
        <MenuIcon size={26} color="#F5F5F5" />
      </Pressable>

      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
          <Text className="text-white font-black text-xs">F</Text>
        </View>
        <Text className="text-foreground text-2xl font-extrabold tracking-tight">
          <Text className="text-muted">Uni</Text>Facens
        </Text>
      </View>

      <Pressable
        onPress={onBellPress}
        className="w-10 h-10 items-center justify-center active:opacity-50"
      >
        <Bell size={26} color="#F5F5F5" />
      </Pressable>
    </View>
  );
}

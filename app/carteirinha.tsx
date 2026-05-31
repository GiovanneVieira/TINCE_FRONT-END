import { Pressable, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

import { Avatar } from "@/components/ui/Avatar";
import { IdentityCard } from "@/components/cards/IdentityCard";
import { useAuthStore } from "@/stores/useAuthStore";

export default function CarteirinhaScreen() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center" edges={["top"]}>
        <Text className="text-[#D3D3D6] text-[15px] text-center px-6">
          Sessao nao carregada. Faca login para ver sua carteirinha.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <Pressable onPress={() => router.back()} className="flex-1">
      <BlurView intensity={40} tint="dark" className="flex-1">
        <View className="flex-1 bg-black/60">
          <SafeAreaView edges={["top"]}>
            <View className="flex-row items-center px-4 py-2">
              <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 items-center justify-center"
              >
                <ChevronLeft size={28} color="#F5F5F5" />
              </Pressable>
              <Text className="text-foreground text-xl font-bold">Menu</Text>
            </View>
          </SafeAreaView>

          <View className="items-center mt-2">
            <Avatar uri={user.avatarUrl} name={user.name} size="lg" />
            <Text className="text-foreground text-2xl font-bold mt-3">
              {user.name}
            </Text>
          </View>

          <View className="flex-1 items-center justify-center">
            <IdentityCard user={user} />
          </View>

          <Text className="text-muted text-center pb-6">4.0.15-b116</Text>
        </View>
      </BlurView>
    </Pressable>
  );
}

import { Pressable, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <View className="flex-1 bg-black/55 items-center justify-center px-4">
          <SafeAreaView className="w-full">
            <View className="items-center justify-center">
              <IdentityCard user={user} />
            </View>
          </SafeAreaView>
        </View>
      </BlurView>
    </Pressable>
  );
}

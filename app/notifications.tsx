import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, ExternalLink } from "lucide-react-native";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5 pt-3">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 items-center justify-center active:opacity-70"
            >
              <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
            </Pressable>
            <Text className="text-[#A0A0A5] text-[18px] font-medium ml-2">
              Notificações
            </Text>
          </View>

          <Text className="text-[#505055] text-[13px] mt-1 ml-11 font-medium">
            Você não possui novas notificações
          </Text>
        </View>

        <View className="px-5 mt-16">
          <Text className="text-[#69696E] text-[18px] leading-[24px] font-semibold">
            Esta semana
          </Text>

          <View className="mt-8 px-4">
            <View className="flex-row items-start">
              <View className="w-12 h-12 rounded-full bg-[#2B2B2F] items-center justify-center mt-1">
                <Text className="text-[#BDBDC2] text-[16px] font-bold">F</Text>
              </View>

              <View className="flex-1 ml-4">
                <View className="flex-row items-start justify-between">
                  <Text className="text-[#C7C7CB] text-[18px] leading-[30px] font-semibold flex-1 pr-3">
                    O 2º Mutirão de Doação de sangue da UniFacens está chegando.
                  </Text>
                  <Text className="text-[#8E8E93] text-[11px] mt-1.5">4 dias atrás</Text>
                </View>

                <Text className="text-[#9D9DA2] text-[14px] leading-[25px] mt-3.5">
                  Data: 25 a 30 de maio. A UniFacens irá disponibilizar o
                  transporte para os voluntários, que sairá do Campus no dia 27
                  de maio às 9h no Coworking UniFacens.
                </Text>

                <Pressable className="mt-5 h-[50px] rounded-[10px] border border-[#626267] px-5 flex-row items-center justify-between active:opacity-80">
                  <Text className="text-[#C5C5C9] text-[12px] underline font-medium">
                    Clique aqui para saber mais
                  </Text>
                  <ExternalLink size={22} color="#C5C5C9" strokeWidth={2.2} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Pin,
  Presentation,
} from "lucide-react-native";

type DayTab = { key: string; label: string };

type ClassShell = {
  id: string;
  startsAt: string;
  subject: string;
  teachers: string;
  room: string;
};

const DAY_TABS: DayTab[] = [
  { key: "mon", label: "Seg" },
  { key: "tue", label: "Ter" },
  { key: "wed", label: "Qua" },
  { key: "thu", label: "Qui" },
  { key: "fri", label: "Sex" },
  { key: "sat", label: "Sab" },
];

// API slot: replace by real classes payload later.
const CLASS_SHELL: ClassShell[] = [
  {
    id: "c-1",
    startsAt: "19:00",
    subject: "Upx - TIC para Cidades Inteligentes",
    teachers: "Eliane Rodrigues, Rosana Antonio, Wilson Junior",
    room: "C29",
  },
  {
    id: "c-2",
    startsAt: "19:50",
    subject: "Upx - TIC para Cidades Inteligentes",
    teachers: "Eliane Rodrigues, Rosana Antonio, Wilson Junior",
    room: "C29",
  },
];

export default function AulasScreen() {
  const [activeDay, setActiveDay] = useState<string>("mon");

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <View className="px-5 pt-3 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="w-9 h-9 items-center justify-center active:opacity-70"
              >
                <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
              </Pressable>
              <Text className="text-[#A0A0A5] text-[20px] font-medium ml-2">
                Aulas
              </Text>
            </View>

            <Pressable className="w-9 h-9 rounded-full bg-[#2A2A2D] items-center justify-center active:opacity-70">
              <CircleHelp size={20} color="#B8B8BC" strokeWidth={2.1} />
            </Pressable>
          </View>
        </View>

        <View className="flex-row justify-between px-5 pt-3 pb-1 border-b border-[#242428]">
          {DAY_TABS.map((day) => {
            const active = day.key === activeDay;
            return (
              <Pressable
                key={day.key}
                onPress={() => setActiveDay(day.key)}
                className="items-center pb-2 active:opacity-70"
              >
                <Text
                  className={
                    active
                      ? "text-[#3E7ED8] text-[17px] font-semibold"
                      : "text-[#95959A] text-[17px] font-semibold"
                  }
                >
                  {day.label}
                </Text>
                {active && (
                  <View className="h-[3px] w-[54px] bg-[#3E7ED8] rounded-full mt-1.5" />
                )}
              </Pressable>
            );
          })}
        </View>

        <View className="px-5 pt-5">
          <Text className="text-right text-[#77777C] text-[13px]">
            Última sincronização às 16:09
          </Text>

          <View className="mt-3">
            {CLASS_SHELL.map((item, index) => (
              <View key={item.id} className="flex-row">
                <View className="w-[52px] items-center pt-1">
                  <View className="flex-row items-center gap-1">
                    <Clock3 size={16} color="#6F6F74" />
                    <Text className="text-[#8E8E93] text-[16px] font-medium">
                      {item.startsAt}
                    </Text>
                  </View>
                  {index < CLASS_SHELL.length - 1 && (
                    <View className="w-[2px] h-[208px] bg-[#2A2A2E] mt-3" />
                  )}
                </View>

                <View className="flex-1 ml-2 mb-5">
                  <Pressable className="rounded-[28px] border border-[#2A2A2E] px-6 py-6 active:opacity-80">
                    <View className="flex-row items-start justify-between">
                      <Text
                        className="text-[#B9B9BE] text-[16px] font-semibold flex-1 pr-2"
                        numberOfLines={1}
                      >
                        {item.subject}
                      </Text>
                      <ChevronRight size={28} color="#86868B" strokeWidth={2.1} />
                    </View>

                    <View className="mt-5 flex-row items-start gap-3">
                      <Presentation size={18} color="#6F6F74" />
                      <Text className="text-[#A9A9AE] text-[14px] leading-[20px] flex-1">
                        {item.teachers}
                      </Text>
                    </View>

                    <View className="mt-3 flex-row items-center gap-3">
                      <Pin size={17} color="#6F6F74" />
                      <Text className="text-[#A9A9AE] text-[14px]">{item.room}</Text>
                    </View>

                    <View className="mt-7 flex-row items-center justify-end gap-2">
                      <Clock3 size={17} color="#7D7D82" />
                      <Text className="text-[#9A9AA0] text-[14px] font-medium">
                        {item.startsAt}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

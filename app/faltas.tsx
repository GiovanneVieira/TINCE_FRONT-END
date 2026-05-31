import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, CircleHelp } from "lucide-react-native";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";

type AbsenceItem = {
  id: string;
  subject: string;
  misses: number;
  limit: number | null;
};

const TERM_LABEL = "2026/01";
const LAST_SYNC_LABEL = "Última sincronização às 13:10";

function progressWidth(misses: number, limit: number | null): `${number}%` {
  if (!limit || limit <= 0) return "0%";
  const ratio = Math.max(0, Math.min(1, misses / limit));
  return `${Math.round(ratio * 100)}%`;
}

function ratioLabel(misses: number, limit: number | null): string {
  if (!limit) return `${misses}/-`;
  return `${misses}/${limit}`;
}

export default function FaltasScreen() {
  const alunoId = useAuthStore((state) => state.user?.id);
  const { data: absenceShell = [] } = useQuery({
    queryKey: ["faltas-by-aluno", alunoId],
    enabled: !!alunoId,
    queryFn: async (): Promise<AbsenceItem[]> => {
      const faltas = await api.getFaltasMe();
      return faltas.map((f) => ({
        id: f.materiaId,
        subject: f.materiaNome,
        misses: f.faltas,
        limit: f.limite,
      }));
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="px-5 pt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="w-9 h-9 items-center justify-center active:opacity-70"
              >
                <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
              </Pressable>
              <Text className="text-[#A0A0A5] text-[19px] font-medium ml-2">
                Faltas
              </Text>
            </View>

            <Pressable className="w-9 h-9 rounded-full bg-[#2A2A2D] items-center justify-center active:opacity-70">
              <CircleHelp size={20} color="#B8B8BC" strokeWidth={2.1} />
            </Pressable>
          </View>
        </View>

        <View className="mt-8 items-center">
          <View className="flex-row items-center gap-8">
            <Pressable className="w-8 h-8 items-center justify-center active:opacity-70">
              <ChevronLeft size={26} color="#75757A" />
            </Pressable>

            <View className="h-[72px] min-w-[136px] rounded-[22px] bg-[#242427] items-center justify-center px-7">
              <Text className="text-[#D0D0D4] text-[17px] font-semibold tracking-wide">
                {TERM_LABEL}
              </Text>
            </View>

            <Pressable className="w-8 h-8 items-center justify-center active:opacity-70">
              <ChevronRight size={26} color="#75757A" />
            </Pressable>
          </View>
        </View>

        <Text className="text-[#6E6E73] text-[13px] mt-6 px-5 font-medium">
          {LAST_SYNC_LABEL}
        </Text>

        <View className="px-5 mt-6 gap-4">
          {absenceShell.map((item) => (
            <Pressable
              key={item.id}
              className="rounded-[24px] bg-[#242427] px-5 py-6 active:opacity-80"
            >
              <Text className="text-[#D3D3D6] text-[16px] font-semibold leading-[30px] pr-6">
                {item.subject}
              </Text>

              <View className="mt-6 flex-row items-center">
                <View className="flex-1 h-[14px] rounded-full bg-black overflow-hidden">
                  <View
                    className="h-full bg-[#3E74B8] rounded-full"
                    style={{ width: progressWidth(item.misses, item.limit) }}
                  />
                </View>

                <Text className="text-[#A8A8AC] text-[16px] font-semibold ml-5 min-w-[54px] text-right">
                  {ratioLabel(item.misses, item.limit)}
                </Text>

                <ChevronRight size={28} color="#6E6E73" strokeWidth={2.1} />
              </View>
            </Pressable>
          ))}
          {!alunoId && (
            <Text className="text-[#A8A8AC] text-[15px]">
              Sessao nao carregada. Faca login para ver as faltas.
            </Text>
          )}
          {alunoId && absenceShell.length === 0 && (
            <Text className="text-[#A8A8AC] text-[15px]">Nenhuma falta encontrada.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

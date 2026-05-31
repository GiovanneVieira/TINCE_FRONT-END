import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { CalendarDays, Moon, Sun } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/ui/Header";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { QuickActions } from "@/components/QuickActions";
import { api } from "@/lib/api";
import { formatDatePtBr } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import type { CanvasActivity, NewsItem } from "@/types";

const SCREEN_W = Dimensions.get("window").width;
const CANVAS_CARD_W = Math.min(470, SCREEN_W * 0.76);
const NEWS_CARD_W = Math.min(360, SCREEN_W * 0.56);

const HOME_GREETING_NAME = "Lucas";

const CANVAS_PLACEHOLDER: CanvasActivity[] = [
  {
    id: "cv-1",
    course: "Upx - TIC para Cidades Inteligentes",
    title: "UPX-TIC para Cidades Inteligentes-UP015TIN3",
    description: "UPX-TIC para Cidades Inteligentes-UP015TIN3",
  },
  {
    id: "cv-2",
    course: "Programacao para Dispositivos Moveis",
    title: "PDM-2026-1",
    description: "Proxima atividade disponivel no Canvas.",
  },
];

const NEWS_PLACEHOLDER: NewsItem[] = [
  {
    id: "nw-1",
    title: "Centro de Aceleracao de Carreiras UniFacens participa de evento",
    excerpt: "",
    imageUrl:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
    publishedAt: "2026-05-24",
  },
  {
    id: "nw-2",
    title: "UniFacens promove acoes em inovacao e sustentabilidade",
    excerpt: "",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    publishedAt: "2026-05-24",
  },
];

function isDaytime(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 6 && hour < 18;
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HomeScreen() {
  const now = new Date();
  const daytime = isDaytime(now);
  const alunoId = useAuthStore((state) => state.user?.id);

  const { data: todayClasses = [] } = useQuery({
    queryKey: ["home-aulas-hoje", alunoId],
    enabled: !!alunoId,
    queryFn: async (): Promise<Array<{ id: string; title: string }>> => {
      if (!alunoId) return [];
      const aulas = await api.getAulasMe();
      const todayKey = toLocalDateKey(now);
      return aulas
        .map((aula) => ({
          id: aula.id,
          dataHora: new Date(aula.dataHora),
          title: aula.materiaNome ?? "Materia",
        }))
        .filter((item) => toLocalDateKey(item.dataHora) === todayKey)
        .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime())
        .map((item) => ({ id: item.id, title: item.title }));
    },
  });

  const hasClassesToday = todayClasses.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <Header
        variant="home"
        onMenuPress={() => router.push("/menu")}
        onBellPress={() => router.push("/notifications")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="bg-[#232325] px-6 pt-8 pb-7">
          <View className="flex-row items-center gap-3">
            <Text className="text-white text-[38px] leading-[44px] font-semibold tracking-tight">
              Ola, {HOME_GREETING_NAME}
            </Text>
            <View className="w-11 h-11 rounded-full items-center justify-center bg-white/5 shadow-sm">
              {daytime ? (
                <Sun size={25} color="#F4F4F5" />
              ) : (
                <Moon size={25} color="#F4F4F5" />
              )}
            </View>
          </View>

          <View className="flex-row items-center gap-2 mt-2">
            <CalendarDays size={18} color="#ECECEC" />
            <Text className="text-[#ECECEC] text-[14px] font-medium">
              {formatDatePtBr(now)}
            </Text>
          </View>
        </View>

        <View className="bg-black border-t border-b border-[#232325] px-6 pt-14 pb-7 min-h-[290px]">
          <View className="min-h-[220px] justify-between">
            {!alunoId ? (
              <View className="items-center">
                <Text className="text-[#7E7E82] text-[16px] text-center font-medium">
                  Sessao nao carregada. Faca login para ver as aulas de hoje.
                </Text>
                <Pressable
                  onPress={() => router.push("/login")}
                  className="mt-4 bg-[#3E74B8] rounded-2xl px-5 py-3 active:opacity-80"
                >
                  <Text className="text-white font-semibold">Ir para login</Text>
                </Pressable>
              </View>
            ) : hasClassesToday ? (
              <View className="gap-2">
                {todayClasses.map((item) => (
                  <Text
                    key={item.id}
                    className="text-[#C8C8C9] text-[20px] leading-[28px]"
                  >
                    {item.title}
                  </Text>
                ))}
              </View>
            ) : (
              <Text className="text-[#7E7E82] text-[16px] text-center font-medium">
                Nao possui aulas hoje
              </Text>
            )}

            <QuickActions
              onAulas={() => router.push("/aulas")}
              onNotas={() => router.push("/notas")}
              onFaltas={() => router.push("/faltas")}
              onVerMais={() => router.push("/mais-opcoes")}
            />
          </View>
        </View>

        <View className="pt-3 pb-1.5 px-6">
          <SectionHeader title="Canvas" onPress={() => {}} />
        </View>
        <FlatList
          data={CANVAS_PLACEHOLDER}
          keyExtractor={(c) => c.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 0, paddingBottom: 8 }}
          renderItem={({ item }) => (
            <ActivityCard activity={item} width={CANVAS_CARD_W} />
          )}
        />

        <View className="border-y border-[#232325] pt-3 pb-2.5 px-6 mt-1">
          <SectionHeader title="Proximos Eventos" onPress={() => {}} />
        </View>

        <View className="border-b border-[#232325] pt-3 pb-2.5 px-6">
          <SectionHeader title="Noticias" onPress={() => {}} />
        </View>
        <FlatList
          data={NEWS_PLACEHOLDER}
          keyExtractor={(n) => n.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 8 }}
          renderItem={({ item }) => <NewsCard item={item} width={NEWS_CARD_W} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  CalendarDays,
  ChevronLeft,
  CreditCard,
  FileText,
  Newspaper,
} from "lucide-react-native";
import type { ReactNode } from "react";

type Shortcut = {
  id: string;
  label: string;
  icon: ReactNode;
};

type OptionItem = {
  id: string;
  title: string;
  subtitle: string;
};

// API slots: replace by backend payload later.
const SHORTCUTS: Shortcut[] = [
  { id: "carteirinha", label: "Carteirinha", icon: <CreditCard size={20} color="#C8C8CC" /> },
  { id: "horas", label: "Horas comp.", icon: <FileText size={20} color="#C8C8CC" /> },
  { id: "eventos", label: "Eventos", icon: <CalendarDays size={20} color="#C8C8CC" /> },
  { id: "noticias", label: "Notícias", icon: <Newspaper size={20} color="#C8C8CC" /> },
];

const OPTIONS: OptionItem[] = [
  {
    id: "acesso",
    title: "Acesso",
    subtitle: "Portal Acadêmico\nSecretaria e Tesouraria",
  },
  {
    id: "canvas",
    title: "Canvas",
    subtitle: "Conteúdo das aulas",
  },
  {
    id: "biblioteca",
    title: "Biblioteca",
    subtitle: "Livros e artigos",
  },
  {
    id: "labs",
    title: "Agendamento de Laboratórios",
    subtitle: "Escolha uma data e horário para reservar sua vaga",
  },
  {
    id: "fablab",
    title: "FabLAB Facens",
    subtitle: "Espaço de fabricação digital para prototipar ideias",
  },
  {
    id: "carreiras",
    title: "Facens Carreiras",
    subtitle: "Apoio para desenvolvimento da sua carreira",
  },
];

export default function MaisOpcoesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 26 }}
      >
        <View className="px-5 pt-3">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 items-center justify-center active:opacity-70"
            >
              <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
            </Pressable>
            <Text className="text-[#A0A0A5] text-[19px] font-medium ml-2">
              Mais opções
            </Text>
          </View>
        </View>

        <View className="px-5 mt-9">
          <View className="flex-row justify-between">
            {SHORTCUTS.map((item) => (
              <Pressable
                key={item.id}
                className="items-center active:opacity-70"
              >
                <View className="w-[102px] h-[102px] rounded-full bg-[#242427] items-center justify-center mb-3">
                  {item.icon}
                </View>
                <Text className="text-[#B8B8BC] text-[14px] font-medium">
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-5 mt-11">
          {OPTIONS.map((item) => (
            <Pressable key={item.id} className="py-6 border-b border-[#2F2F33] active:opacity-75">
              <Text className="text-[#9D9DA2] text-[16px] font-semibold mb-2">
                {item.title}
              </Text>
              <Text className="text-[#8B8B90] text-[12px] leading-[22px]">
                {item.subtitle}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

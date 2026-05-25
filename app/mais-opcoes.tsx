import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CalendarDays, CreditCard, FileText, Newspaper } from "lucide-react-native";

import { Header } from "@/components/ui/Header";

type Shortcut = {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  onPress: () => void;
};

type ModuleItem = {
  key: string;
  title: string;
  subtitle: string;
};

const shortcuts: Shortcut[] = [
  {
    key: "carteirinha",
    label: "Carteirinha",
    icon: CreditCard,
    onPress: () => router.push("/carteirinha"),
  },
  {
    key: "horas",
    label: "Horas comp.",
    icon: FileText,
    onPress: () => {},
  },
  {
    key: "eventos",
    label: "Eventos",
    icon: CalendarDays,
    onPress: () => {},
  },
  {
    key: "noticias",
    label: "Notícias",
    icon: Newspaper,
    onPress: () => {},
  },
];

const modules: ModuleItem[] = [
  { key: "acesso", title: "Portal Acadêmico", subtitle: "Secretaria e Tesouraria" },
  { key: "canvas", title: "Canvas", subtitle: "Conteúdo das aulas" },
  { key: "biblioteca", title: "Biblioteca", subtitle: "Livros e artigos" },
  {
    key: "labs",
    title: "Agendamento de Laboratórios",
    subtitle: "Escolha uma data e horário para reservar sua vaga",
  },
  {
    key: "fablab",
    title: "FabLAB Facens",
    subtitle: "Espaço de fabricação digital para prototipar ideias",
  },
  {
    key: "carreiras",
    title: "Facens Carreiras",
    subtitle: "Apoio para desenvolvimento da sua carreira",
  },
];

export default function MaisOpcoesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header variant="back" title="Mais opções" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
      >
        <View className="flex-row justify-between mt-4">
          {shortcuts.map(({ key, label, icon: Icon, onPress }) => (
            <Pressable
              key={key}
              onPress={onPress}
              className="items-center active:opacity-60"
            >
              <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-2">
                <Icon size={28} color="#D1D5DB" />
              </View>
              <Text className="text-foreground text-base">{label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-8">
          {modules.map((item, index) => (
            <View key={item.key} className={index > 0 ? "pt-6" : ""}>
              <Text className="text-foreground text-2xl font-semibold leading-tight">
                {item.title}
              </Text>
              <Text className="text-muted-foreground text-lg mt-2">{item.subtitle}</Text>
              <View className="h-px bg-border mt-6" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

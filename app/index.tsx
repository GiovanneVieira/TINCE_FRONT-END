import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { Calendar, Moon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { Header } from "@/components/ui/Header";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClassCard } from "@/components/cards/ClassCard";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { QuickActions } from "@/components/QuickActions";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCanvas, useClasses, useNews } from "@/queries";
import { formatDatePtBr } from "@/lib/utils";

const SCREEN_W = Dimensions.get("window").width;
const CARD_W = SCREEN_W * 0.85;

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { data: classes = [] } = useClasses();
  const { data: canvas = [] } = useCanvas();
  const { data: news = [] } = useNews();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header
        variant="home"
        onMenuPress={() => router.push("/menu")}
        onBellPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Greeting */}
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-3">
            <Text className="text-foreground text-4xl font-bold">
              Olá, {user?.firstName}
            </Text>
            <Moon size={28} color="#F5F5F5" fill="#F5F5F5" />
          </View>
          <View className="flex-row items-center gap-2 mt-2">
            <Calendar size={18} color="#A1A1A1" />
            <Text className="text-muted-foreground text-base">
              {formatDatePtBr(new Date())}
            </Text>
          </View>
        </View>

        {/* Classes carousel */}
        <FlatList
          data={classes}
          keyExtractor={(c) => c.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <ClassCard session={item} width={CARD_W} />
          )}
        />

        {/* Quick actions */}
        <QuickActions
          onAulas={() => {}}
          onNotas={() => {}}
          onFaltas={() => {}}
          onVerMais={() => router.push("/mais-opcoes")}
        />

        <View className="h-px bg-border mx-5 mb-6" />

        {/* Canvas */}
        <View className="px-5">
          <SectionHeader title="Canvas" onPress={() => {}} />
        </View>
        <FlatList
          data={canvas}
          keyExtractor={(c) => c.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <ActivityCard activity={item} width={CARD_W} />
          )}
        />

        <View className="h-px bg-border mx-5 my-6" />

        {/* Events */}
        <View className="px-5">
          <SectionHeader title="Próximos Eventos" onPress={() => {}} />
        </View>

        <View className="h-px bg-border mx-5 my-6" />

        {/* News */}
        <View className="px-5">
          <SectionHeader title="Notícias" onPress={() => {}} />
        </View>
        <FlatList
          data={news}
          keyExtractor={(n) => n.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => <NewsCard item={item} width={CARD_W} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

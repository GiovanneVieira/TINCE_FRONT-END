import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import {
  Bell,
  Bug,
  CreditCard,
  HelpCircle,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/ui/Header";
import { Avatar } from "@/components/ui/Avatar";
import { ListItem, ListDivider } from "@/components/ui/ListItem";
import { EmergencyButton } from "@/components/EmergencyButton";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MenuScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Desconectar", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header variant="back" title="Menu" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Profile */}
        <View className="items-center pt-4 pb-6">
          <Avatar uri={user?.avatarUrl} name={user?.name ?? ""} size="xl" />
          <Text className="text-foreground text-2xl font-bold mt-4">
            {user?.name}
          </Text>
          <Text className="text-muted-foreground text-lg mt-1">
            {user?.course}
          </Text>
        </View>

        <View className="px-5 gap-3">
          {/* Carteirinha quick access */}
          <Pressable
            onPress={() => router.push("/carteirinha")}
            className="bg-surface rounded-2xl py-4 px-5 flex-row items-center justify-center active:opacity-70"
          >
            <CreditCard size={22} color="#F5F5F5" />
            <Text className="text-foreground text-base font-semibold ml-2">
              Carteirinha de identidade UniFacens
            </Text>
          </Pressable>

          <EmergencyButton />
        </View>

        <View className="px-5 mt-2">
          <ListItem
            icon={<Bell size={20} color="#F5F5F5" />}
            label="Notificações"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<SettingsIcon size={20} color="#F5F5F5" />}
            label="Configurações"
            onPress={() => router.push("/settings")}
          />
          <ListDivider />
          <ListItem
            icon={<HelpCircle size={20} color="#F5F5F5" />}
            label="Ajuda"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<Bug size={20} color="#F5F5F5" />}
            label="Reportar um problema"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<LogOut size={20} color="#F5F5F5" />}
            label="Desconectar"
            onPress={handleLogout}
            hideChevron
          />
        </View>

        <Text className="text-muted text-center mt-8">4.0.15-b116</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

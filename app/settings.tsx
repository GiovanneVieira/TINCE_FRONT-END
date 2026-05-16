import { ScrollView, Text, View } from "react-native";
import {
  Globe,
  RefreshCw,
  Shield,
  Sparkles,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/ui/Header";
import { Avatar } from "@/components/ui/Avatar";
import { ListDivider, ListItem } from "@/components/ui/ListItem";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SettingsScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header variant="back" />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="items-center pt-2 pb-8">
          <Avatar
            uri={user?.avatarUrl}
            name={user?.name ?? ""}
            size="xl"
            showEditBadge
          />
          <Text className="text-foreground text-2xl font-bold mt-4">
            {user?.name}
          </Text>
          <Text className="text-muted-foreground text-lg mt-1">
            {user?.course}
          </Text>
        </View>

        <View className="px-5">
          <ListItem
            icon={<Sparkles size={20} color="#F5F5F5" />}
            label="Aparência"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<RefreshCw size={20} color="#F5F5F5" />}
            label="Atualizações do aplicativo"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<Shield size={20} color="#F5F5F5" />}
            label="Segurança"
            onPress={() => {}}
          />
          <ListDivider />
          <ListItem
            icon={<Globe size={20} color="#F5F5F5" />}
            label="Idioma do Aplicativo"
            onPress={() => {}}
          />
        </View>

        <Text className="text-muted text-center mt-12">4.0.15-b116</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

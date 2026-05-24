import { Alert, Pressable, ScrollView, Text, View, Image } from "react-native";
import {
  Bell,
  Bug,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ReactNode } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

// API slots: replace by backend profile payload later.
const MENU_PROFILE_FALLBACK = {
  name: "Lucas Rodrigues Paifer",
  course: "Engenharia de Computação",
  avatarUrl:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
};

type MenuAction = {
  key: string;
  label: string;
  icon: ReactNode;
  onPress: () => void;
};

export default function MenuScreen() {
  const { user, logout } = useAuthStore();

  const profileName = user?.name || MENU_PROFILE_FALLBACK.name;
  const profileCourse = user?.course || MENU_PROFILE_FALLBACK.course;
  const profileAvatar = user?.avatarUrl || MENU_PROFILE_FALLBACK.avatarUrl;

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

  const actions: MenuAction[] = [
    {
      key: "notifications",
      label: "Notificações",
      icon: <Bell size={20} color="#8F8F93" />,
      onPress: () => router.push("/notifications"),
    },
    {
      key: "settings",
      label: "Configurações",
      icon: <Settings size={20} color="#8F8F93" />,
      onPress: () => router.push("/settings"),
    },
    {
      key: "help",
      label: "Ajuda",
      icon: <CircleHelp size={20} color="#8F8F93" />,
      onPress: () => {},
    },
    {
      key: "report",
      label: "Reportar um problema",
      icon: <Bug size={20} color="#8F8F93" />,
      onPress: () => {},
    },
    {
      key: "logout",
      label: "Desconectar",
      icon: <LogOut size={20} color="#8F8F93" />,
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        <View className="flex-row items-center px-5 pt-3 pb-1">
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 items-center justify-center active:opacity-70"
          >
            <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
          </Pressable>
          <Text className="text-[#9A9AA0] text-[19px] font-medium ml-2">Menu</Text>
        </View>

        <View className="items-center pt-3 pb-4">
          <Image
            source={{ uri: profileAvatar }}
            className="w-[160px] h-[160px] rounded-full"
          />
          <Text className="text-white text-[23px] leading-[30px] font-semibold mt-6 text-center px-8">
            {profileName}
          </Text>
          <Text className="text-[#D3D3D6] text-[15px] mt-2">{profileCourse}</Text>
        </View>

        <View className="px-6 gap-3.5">
          <Pressable
            onPress={() => router.push("/carteirinha")}
            className="h-[74px] rounded-[24px] bg-[#242427] px-5 flex-row items-center justify-center active:opacity-80"
          >
            <CreditCard size={20} color="#D8D8DB" />
            <Text className="text-[#D8D8DB] text-[15px] font-semibold ml-3">
              Carteirinha de identidade UniFacens
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {}}
            className="h-[84px] rounded-[24px] bg-[#EE5752] items-center justify-center active:opacity-85"
          >
            <Text className="text-white text-[15px] font-semibold">Botão de Emergência</Text>
          </Pressable>
        </View>

        <View className="px-6 pt-8">
          {actions.map((item, index) => (
            <View key={item.key}>
              <Pressable
                onPress={item.onPress}
                className="flex-row items-center py-5 active:opacity-70"
              >
                <View className="w-13 h-13 rounded-full bg-[#242427] items-center justify-center">
                  {item.icon}
                </View>
                <Text className="ml-4 flex-1 text-[#8F8F93] text-[17px] font-semibold">
                  {item.label}
                </Text>
                <ChevronRight size={30} color="#707075" strokeWidth={2.1} />
              </Pressable>
              {index < actions.length - 1 && (
                <View className="h-px bg-[#2D2D31] ml-[68px]" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

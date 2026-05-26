import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import type { NewsItem } from "@/types";

type NewsCardProps = {
  item: NewsItem;
  onPress?: () => void;
  width?: number;
};

export function NewsCard({ item, onPress, width }: NewsCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={width ? { width } : undefined}
      className="mr-4 rounded-[30px] overflow-hidden bg-[#242427] active:opacity-80"
    >
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
        style={{ width: "100%", height: 195 }}
      />
      <View className="px-5 py-4">
        <Text
          className="text-[#D0D0D3] text-[16px] leading-[30px] mb-3"
          numberOfLines={4}
        >
          {item.title}
        </Text>
        <Text className="text-[#B8B8BC] text-[14px] font-medium">Ler mais</Text>
      </View>
    </Pressable>
  );
}

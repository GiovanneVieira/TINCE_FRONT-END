import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { CanvasActivity } from "@/types";

type ActivityCardProps = {
  activity: CanvasActivity;
  onPress?: () => void;
  width?: number;
};

export function ActivityCard({ activity, onPress, width }: ActivityCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={width ? { width } : undefined}
      className="bg-[#242427] rounded-[26px] px-6 py-4 mr-4 active:opacity-80"
    >
      <View className="flex-row items-start justify-between mb-2.5">
        <Text
          className="text-[#D3D3D5] text-[17px] leading-[24px] font-medium flex-1 mr-2"
          numberOfLines={1}
        >
          {activity.course}
        </Text>
        <ChevronRight size={28} color="#AAAAAE" />
      </View>
      <Text className="text-[#909095] text-[16px] leading-[24px]" numberOfLines={2}>
        {activity.description}
      </Text>
    </Pressable>
  );
}

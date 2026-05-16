import { View, Text } from "react-native";
import { User, Pin, Clock } from "lucide-react-native";
import { Card } from "@/components/ui/Card";
import type { ClassSession } from "@/types";

type ClassCardProps = {
  session: ClassSession;
  width?: number;
};

export function ClassCard({ session, width }: ClassCardProps) {
  return (
    <Card style={width ? { width } : undefined} className="mr-3">
      <Text
        className="text-foreground text-xl font-semibold mb-3"
        numberOfLines={1}
      >
        {session.subject}
      </Text>

      <View className="flex-row items-center gap-2 mb-1.5">
        <User size={16} color="#8A8A8A" />
        <Text className="text-muted-foreground text-base">
          {session.teacher}
        </Text>
      </View>

      <View className="flex-row items-center gap-2 mb-4">
        <Pin size={16} color="#8A8A8A" />
        <Text className="text-muted-foreground text-base">{session.room}</Text>
      </View>

      <View className="flex-row items-center justify-end gap-1.5">
        <Clock size={16} color="#A1A1A1" />
        <Text className="text-muted-foreground text-base font-medium">
          {session.startsAt}
        </Text>
      </View>
    </Card>
  );
}

import { Dimensions, Text, View } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import type { User } from "@/types";

type IdentityCardProps = {
  user: User;
};

/**
 * Rotated student card (landscape) - matches the modal in screen 1.
 * The card itself is laid out in landscape (wider than tall), and
 * the parent rotates the whole element 90deg when used in a modal.
 */
export function IdentityCard({ user }: IdentityCardProps) {
  const screen = Dimensions.get("window");
  // landscape card sized relative to screen height when rotated
  const width = screen.height * 0.55;
  const height = screen.width * 0.85;

  return (
    <View
      style={{ width, height, transform: [{ rotate: "90deg" }] }}
      className="rounded-3xl overflow-hidden flex-row bg-surface-elevated shadow-2xl"
    >
      {/* Left dark side: data */}
      <View className="flex-1 p-6 justify-between">
        <View>
          <Text className="text-muted text-xs mb-1">Curso</Text>
          <Text className="text-foreground text-lg font-semibold">
            {user.course}
          </Text>
        </View>

        <View>
          <Text className="text-muted text-xs mb-1">CPF</Text>
          <Text className="text-foreground text-lg font-semibold">
            {user.cpf}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <View>
            <Text className="text-muted text-xs mb-1">Validade</Text>
            <Text className="text-foreground text-lg font-semibold">
              {user.validity}
            </Text>
          </View>
          <View>
            <Text className="text-muted text-xs mb-1">RA</Text>
            <Text className="text-foreground text-lg font-semibold">
              {user.ra}
            </Text>
          </View>
        </View>
      </View>

      {/* Right blue side: photo + name */}
      <View className="w-2/5 bg-primary items-center justify-between py-6 px-3 relative overflow-hidden">
        {/* Pattern overlay placeholder */}
        <View
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: "#1976D2" }}
        />

        <Avatar
          uri={user.avatarUrl}
          name={user.name}
          size="lg"
          className="border-4 border-background rounded-full"
        />

        <Text
          className="text-white text-xl font-bold text-center"
          numberOfLines={2}
        >
          {user.name}
        </Text>

        {/* Logo mark */}
        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
          <Text className="text-white font-black">F</Text>
        </View>
      </View>
    </View>
  );
}

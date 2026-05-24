import { Pressable, Text, View } from "react-native";
import {
  Clock3,
  FileBadge2,
  Hand,
  Plus,
  type LucideIcon,
} from "lucide-react-native";

type Action = {
  key: string;
  label: string;
  Icon: LucideIcon;
  onPress?: () => void;
};

type QuickActionsProps = {
  onAulas?: () => void;
  onNotas?: () => void;
  onFaltas?: () => void;
  onVerMais?: () => void;
};

export function QuickActions({
  onAulas,
  onNotas,
  onFaltas,
  onVerMais,
}: QuickActionsProps) {
  const actions: Action[] = [
    { key: "aulas", label: "Aulas", Icon: Clock3, onPress: onAulas },
    { key: "notas", label: "Notas", Icon: FileBadge2, onPress: onNotas },
    { key: "faltas", label: "Faltas", Icon: Hand, onPress: onFaltas },
    { key: "vermais", label: "Ver mais", Icon: Plus, onPress: onVerMais },
  ];

  return (
    <View className="flex-row justify-between px-2">
      {actions.map(({ key, label, Icon, onPress }) => (
        <Pressable
          key={key}
          onPress={onPress}
          className="items-center active:opacity-70"
        >
          <View className="w-[56px] h-[56px] rounded-full bg-[#2A2A2D] items-center justify-center mb-2">
            <Icon size={24} color="#CECED1" strokeWidth={1.9} />
          </View>
          <Text className="text-[#CECED1] text-[11px] font-medium">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

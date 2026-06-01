import { Dimensions, Image, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import type { User } from "@/types";

type IdentityCardProps = {
  user: User;
};

export function IdentityCard({ user }: IdentityCardProps) {
  const screen = Dimensions.get("window");
  const width = Math.min(screen.height * 0.72, 560);
  const height = Math.min(screen.width * 0.78, 390);
  const photoSize = 118;
  const photoTop = Math.round(height * 0.39 - photoSize / 2);
  const name = user.name || "-";
  const course = user.course || "-";
  const cpf = formatCpf(user.cpf);
  const validity = formatValidity(user.validity);
  const ra = user.ra || "-";

  return (
    <View
      style={{ width, height, transform: [{ rotate: "90deg" }] }}
      className="rounded-[34px] overflow-hidden bg-[#1D1F24] shadow-2xl"
    >
      <View className="h-[39%] bg-[#2A79D8] px-6 py-4 relative z-10">
        <View className="absolute inset-0 opacity-10 bg-[#1C5DB2]" />
        <View className="absolute inset-0 opacity-15">
          <View className="flex-row flex-wrap">
            {Array.from({ length: 30 }).map((_, i) => (
              <View key={i} className="w-8 h-8 m-1 rounded-full border border-white/15" />
            ))}
          </View>
        </View>
        <View
          className="absolute left-3 w-[118px] h-[118px] rounded-full bg-[#1B1F23] items-center justify-center z-30"
          style={{ top: photoTop }}
        >
          <View className="w-[104px] h-[104px] rounded-full overflow-hidden bg-[#D9D9D9] border-[2px] border-[#ECECEC]">
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} className="w-full h-full" />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Text className="text-[#1D1F24] text-3xl font-bold">
                  {name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="absolute left-[132px] top-0 bottom-0 right-[56px] items-center justify-center">
          <Text
            className="text-white text-[24px] font-medium tracking-tight"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {name}
          </Text>
        </View>

        <View className="absolute right-6 top-4 w-[52px] h-[52px] items-center justify-center">
          <Svg width={46} height={46} viewBox="0 0 100 100">
            <Path
              d="M50 6.5A43.5 43.5 0 0 1 84 22"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <Path
              d="M89 33A43.5 43.5 0 0 1 57 93"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <Path
              d="M46 93A43.5 43.5 0 0 1 13 26"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <Path d="M35 43 77 27v16L35 59Z" fill="#F3F4F6" />
            <Path d="M35 67 68 55v16L35 83Z" fill="#F3F4F6" />
            <Circle cx={31} cy={88} r={8} fill="#F3F4F6" />
          </Svg>
        </View>
      </View>

      <View className="flex-1 bg-[#1D1F24] px-7 py-6 justify-end z-0">
        <View className="flex-row justify-between mt-2">
          <View className="w-[56%]">
            <Text className="text-[#9EA3AA] text-[12px]">Curso</Text>
            <Text
              className="text-[#E9ECEF] text-[18px] leading-[24px] font-medium mt-1"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {course}
            </Text>
          </View>

          <View className="w-[36%]">
            <Text className="text-[#9EA3AA] text-[12px]">Validade</Text>
            <Text className="text-[#E9ECEF] text-[18px] leading-[24px] font-medium mt-1">
              {validity}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-6">
          <View className="w-[56%]">
            <Text className="text-[#9EA3AA] text-[12px]">CPF</Text>
            <Text className="text-[#E9ECEF] text-[18px] leading-[24px] font-medium mt-1">
              {cpf}
            </Text>
          </View>
          <View className="w-[36%]">
            <Text className="text-[#9EA3AA] text-[12px]">RA</Text>
            <Text className="text-[#E9ECEF] text-[18px] leading-[24px] font-medium mt-1">
              {ra}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function formatCpf(value: string): string {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length !== 11) return value || "-";
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatValidity(value: string): string {
  if (!value) return "-";
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!isoMatch) return value;
  const [, year, month] = isoMatch;
  return `${month}/${year}`;
}

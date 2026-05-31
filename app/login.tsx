import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthReady = useAuthStore((s) => s.setAuthReady);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      setError(null);
      await api.signIn({ email, password });
      const me = await api.getMe();
      return me;
    },
    onSuccess: (me) => {
      setUser({
        id: me.id,
        name: me.name,
        firstName: me.firstName,
        course: me.course ?? "",
        cpf: me.cpf ?? "",
        ra: me.RA,
        validity: me.validity ?? "",
        avatarUrl: me.avatarUrl,
      });
      setAuthReady(true);
      queryClient.invalidateQueries({ queryKey: ["session-me"] });
      router.replace("/");
    },
    onError: () => {
      setError("Falha no login. Verifique email e senha.");
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-black px-6 py-8">
      <View className="mt-8">
        <Text className="text-white text-3xl font-bold">Entrar</Text>
        <Text className="text-[#9A9AA0] text-base mt-2">
          Use sua conta academica para acessar o app.
        </Text>
      </View>

      <View className="mt-10 gap-4">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#7E7E82"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-[#1E1E21] text-white px-4 py-4 rounded-2xl"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor="#7E7E82"
          secureTextEntry
          className="bg-[#1E1E21] text-white px-4 py-4 rounded-2xl"
        />
      </View>

      {error && <Text className="text-[#EE5752] mt-4">{error}</Text>}

      <Pressable
        disabled={loginMutation.isPending}
        onPress={() => loginMutation.mutate()}
        className="mt-8 bg-[#3E74B8] rounded-2xl py-4 items-center disabled:opacity-60"
      >
        <Text className="text-white text-base font-semibold">
          {loginMutation.isPending ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/")} className="mt-4 items-center">
        <Text className="text-[#9A9AA0]">Voltar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

import '../global.css';

import { useEffect } from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { api } from '@/lib/api';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/stores/useAuthStore';

function SessionBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthReady = useAuthStore((s) => s.setAuthReady);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authReady = useAuthStore((s) => s.authReady);
  const pathname = usePathname();
  const router = useRouter();

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['session-me'],
    queryFn: api.getMe,
    retry: false,
    refetchInterval: 1000 * 60 * 4,
  });

  useEffect(() => {
    if (data) {
      setUser({
        id: data.id,
        name: data.name,
        firstName: data.firstName,
        course: data.course ?? '',
        cpf: data.cpf ?? '',
        ra: data.RA,
        validity: data.validity ?? '',
        avatarUrl: data.avatarUrl,
      });
      setAuthReady(true);
      return;
    }
    if (isError) {
      setUser(null);
      setAuthReady(true);
      return;
    }
    if (isSuccess) {
      setAuthReady(true);
    }
  }, [data, isError, isSuccess, setAuthReady, setUser]);

  useEffect(() => {
    if (!authReady) return;

    const isLoginRoute = pathname === '/login';
    if (!isAuthenticated && !isLoginRoute) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && isLoginRoute) {
      router.replace('/');
    }
  }, [authReady, isAuthenticated, pathname, router]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <SessionBootstrap />
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0A0A0A' },
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="menu" />
            <Stack.Screen name="settings" />
            <Stack.Screen
              name="carteirinha"
              options={{
                presentation: 'transparentModal',
                animation: 'fade',
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

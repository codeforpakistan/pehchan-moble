import React, { useEffect, useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthCallback() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("🔹 OAuth Response Params:", params);

        const accessToken = params.access_token;
        const idToken = params.id_token;
        const code = params.code;
        const error = params.error;
        const state = params.state;

        if (error) throw new Error(error);

        if (accessToken) {
          await AsyncStorage.setItem('access_token', accessToken);
          if (idToken) await AsyncStorage.setItem('id_token', idToken);
          
          console.log('✅ Access Token Stored:', accessToken);

          // 🔹 Fetch user info
          const userResponse = await fetch(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/api/auth/userinfo`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!userResponse.ok) throw new Error('Failed to fetch user info');

          const userInfo = await userResponse.json();
          await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));

          console.log('✅ User Info Stored:', userInfo);
        }

        if (code) {
          const storedState = await AsyncStorage.getItem('auth_state');
          if (state && state !== storedState) throw new Error('Invalid state parameter');

          console.log("🔹 OAuth Code Received:", code);

          // 🔹 Exchange Code for Tokens
          const tokenResponse = await fetch(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/api/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
              redirect_uri: AuthSession.makeRedirectUri({ useProxy: true }),
              grant_type: 'authorization_code',
            }),
          });

          if (!tokenResponse.ok) throw new Error('Token exchange failed');

          const tokens = await tokenResponse.json();
          await AsyncStorage.setItem('access_token', tokens.access_token);
          await AsyncStorage.setItem('id_token', tokens.id_token);

          console.log('✅ Tokens Stored Successfully!');

          // 🔹 Fetch user info after getting tokens
          const userResponse = await fetch(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/api/auth/userinfo`, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });

          if (!userResponse.ok) throw new Error('Failed to fetch user info');

          const userInfo = await userResponse.json();
          await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));

          console.log('✅ User Info Stored:', userInfo);
        }
      } catch (error) {
        console.error('❌ Auth Callback Error:', error);
        Alert.alert('Authentication Failed', error.message || 'An error occurred during login');
      } finally {
        await AsyncStorage.removeItem('auth_state');
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        console.log("✅ Access token found, navigating to Dashboard");
        router.replace('/Dashboard');
      }
    };

    if (!isProcessing) {
      checkLoginStatus();
    }
  }, [isProcessing]);

  if (isProcessing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Processing your login...</Text>
      </View>
    );
  }

  return null;
}

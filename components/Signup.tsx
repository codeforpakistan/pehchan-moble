import React from "react";
import { TouchableOpacity, Text, View, Linking } from "react-native";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleSignup = async () => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  
  try {
    const signupUrl = new URL(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/signup`);
    signupUrl.searchParams.set('service_name', 'FBR Tax Portal');
    signupUrl.searchParams.set('client_id', process.env.EXPO_PUBLIC_CLIENT_ID);
    signupUrl.searchParams.set('redirect_uri', `${redirectUri}/Signup`);
    signupUrl.searchParams.set('response_type', 'code');
    signupUrl.searchParams.set('scope', 'openid profile email');

    const state = Math.random().toString(36).substring(2, 15);
    await AsyncStorage.setItem('auth_state', state);
    signupUrl.searchParams.set('state', state);

    Linking.openURL(signupUrl.toString()).catch((err) => {
      console.error('Failed to open signup URL:', err);
    });
  } catch (error) {
    console.error('Error constructing signup URL:', error);
  }
};

const Signup = () => {
  return (
    <TouchableOpacity
      onPress={handleSignup}
      className="border border-green-600 px-4 py-3 rounded-lg"
    >
      <Text className="text-green-600 text-base font-bold text-center">
        Sign Up
      </Text>
    </TouchableOpacity>
  );
};

export default Signup;

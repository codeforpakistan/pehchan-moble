import React from "react";
import { TouchableOpacity, Text, View, Linking } from "react-native";
import Constants from 'expo-constants';
import Logo from "./logo";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';


const handleLogin = async () => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, // For development
    projectNameForProxy: Constants.expoConfig.name, // Optional: Use your app's name
  });
  try {
    const loginUrl = new URL(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/login`);
    loginUrl.searchParams.set('service_name', 'FBR Tax Portal');
    loginUrl.searchParams.set('client_id', process.env.EXPO_PUBLIC_CLIENT_ID);
    console.log(Constants.expoConfig?.extra?.redirectUri)
    loginUrl.searchParams.set('redirect_uri', `${redirectUri}/Login`);
    loginUrl.searchParams.set('response_type', 'code');
    loginUrl.searchParams.set('scope', 'openid profile email');

    const state = Math.random().toString(36).substring(2, 15); 
    await AsyncStorage.setItem('auth_state', state);
    loginUrl.searchParams.set('state', state);

    Linking.openURL(loginUrl.toString()).catch((err) => {
      console.error('Failed to open login URL:', err);
    });
  } catch (error) {
    console.error('Error constructing login URL:', error);
  }
};

const PehchanButton = () => {
  return (
    <TouchableOpacity
      onPress={handleLogin}
      className="bg-green-600 hover:bg-green-700 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md"
      activeOpacity={0.8}
    >
      {/* Logo Icon */}
      <Logo size={24} name={'white'} />
      {/* Button Text */}
      <Text className="text-white text-base font-bold">
        Continue with Pehchan
      </Text>
    </TouchableOpacity>
  );
};

export default PehchanButton;

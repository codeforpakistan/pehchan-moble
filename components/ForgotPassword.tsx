import React from "react";
import { TouchableOpacity, Text, Linking } from "react-native";
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';

const handleForgotPassword = async () => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
    projectNameForProxy: Constants.expoConfig.name,
  });

  try {
    const forgotPasswordUrl = new URL(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/forgot-password`);
    forgotPasswordUrl.searchParams.set('client_id', process.env.EXPO_PUBLIC_CLIENT_ID);
    forgotPasswordUrl.searchParams.set('redirect_uri', `${redirectUri}/ForgotPassword`);
    
    Linking.openURL(forgotPasswordUrl.toString()).catch((err) => {
      console.error('Failed to open forgot password URL:', err);
    });
  } catch (error) {
    console.error('Error constructing forgot password URL:', error);
  }
};

const ForgotPassword = () => {
  return (
    <TouchableOpacity onPress={handleForgotPassword}>
      <Text style={{ color: "blue", textDecorationLine: "underline" }}>
        Forgot Password?
      </Text>
    </TouchableOpacity>
  );
};

export default ForgotPassword;

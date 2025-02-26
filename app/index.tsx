import React from "react";
import { View, Text } from "react-native";
import SiteHeader from "@/components/header";
import PehchanButton from "@/components/PehchanButton";
import Signup from "@/components/Signup";
import ForgotPassword from "@/components/ForgotPassword";

const IndexPage = () => {
  return (
    <View className="flex-1 bg-gradient-to-b from-green-600/10 to-green-600/20 items-center">
      <SiteHeader />

      <View className="flex-1 justify-center items-center px-4 w-full max-w-sm">
        <View className="items-center">
          <Text className="text-xl font-bold text-center mb-3">Welcome to Pehchan</Text>
          <Text className="text-2xl font-bold leading-tight text-center">
            <Text className="text-green-600">Pakistan's First </Text>
            Secure and Seamless Digital Identity Platform
          </Text>

          <View className="flex flex-col gap-3 pt-6 w-full">
            {/* Pehchan Login Button */}
            <PehchanButton />

            {/* Signup and Forgot Password in a Column */}
            <View className="flex flex-col items-center gap-2 w-full">
              <View className="flex w-full">
                <Signup />
              </View>
              <View className="flex flex-row justify-end w-full">
                <ForgotPassword />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IndexPage;

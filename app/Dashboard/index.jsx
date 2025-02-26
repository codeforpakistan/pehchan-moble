import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SiteHeader from "@/components/header"; // Ensure correct path

export default function Dashboard() {
  const [authInfo, setAuthInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useRouter();

  // Fetch user info from AsyncStorage
  const fetchAuthInfo = async () => {
    try {
      const userData = await AsyncStorage.getItem("user_info");
      if (!userData) {
        navigation.replace("/");
        return;
      }
      setAuthInfo(JSON.parse(userData));
    } catch (error) {
      console.error("Failed to fetch auth info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthInfo();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* 🔹 Site Header */}
      <SiteHeader />

      {/* 🔹 Main Content */}
      <ScrollView className="p-4">
        {/* User Profile */}
        <View className="bg-white p-4 rounded-lg shadow mb-6 flex-row items-center space-x-4">
          <Image
            source={{ uri: authInfo?.profile?.avatar_url || "https://via.placeholder.com/150" }}
            className="h-16 w-16 rounded-full"
          />
          <View>
            <Text className="text-lg font-bold">
              Welcome, {authInfo?.profile?.full_name || authInfo?.name || "User"}
            </Text>
            <Text className="text-gray-500">CNIC: {authInfo?.profile?.cnic || "Not provided"}</Text>
            <Text className="text-gray-400">{authInfo?.email}</Text>
          </View>
        </View>

        {/* Notifications */}
        <View className="bg-white p-4 rounded-lg shadow mb-6">
          <Text className="text-lg font-bold">Notifications</Text>
          <ScrollView className="max-h-48">
            <View className="flex-row items-start space-x-4 py-2">
              <Ionicons name="notifications" size={20} color="blue" />
              <View>
                <Text className="font-medium">Tax return due in 7 days</Text>
                <Text className="text-sm text-gray-500">Submit your annual tax return by July 31st.</Text>
              </View>
            </View>
            <View className="flex-row items-start space-x-4 py-2">
              <Ionicons name="notifications" size={20} color="green" />
              <View>
                <Text className="font-medium">COVID-19 vaccination available</Text>
                <Text className="text-sm text-gray-500">Book your appointment for the COVID-19 vaccine.</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Data Requests */}
        <View className="bg-white p-4 rounded-lg shadow">
  <Text className="text-lg font-bold">Data Requests</Text>
  <ScrollView className="max-h-48">
    <View className="py-2 border-b border-gray-200">
      <Text className="font-medium text-base">
        National Database & Registration Authority
      </Text>
      <Text className="text-sm text-gray-500">
        Requested access to your address
      </Text>

      {/* Deny/Approve Buttons - FIXED */}
      <View className="flex-row justify-end space-x-3 mt-2">
        <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-lg">
          <Text className="text-gray-700 font-medium">Deny</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-medium">Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
</View>

      </ScrollView>
    </View>
  );
}

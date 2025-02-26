import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "./logo";
import Sidebar from "./Sidebar";

const SiteHeader: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const route = useRoute(); // Get current route
  const currentRoute = route.name; // Get route name

  const isHomePage = currentRoute === "index"; // Check if on home page

  return (
    <View className="bg-white sticky top-0 z-40 w-full border-b">
      <View className="flex flex-row h-16 items-center justify-between px-4">
        {/* Logo Button (Disabled on Home Page) */}
        <TouchableOpacity
          onPress={() => !isHomePage && setSidebarOpen(true)}
          disabled={isHomePage} // Prevent sidebar opening on home
          className={`flex flex-row items-center space-x-2`}
        >
          <Logo size={40} />
          <Text className="text-lg font-bold text-green-800">Pehchan Digital Identity</Text>
        </TouchableOpacity>

        {/* GitHub Link */}
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/codeforpakistan/pehchan-portal")}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="logo-github" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </View>
  );
};

export default SiteHeader;


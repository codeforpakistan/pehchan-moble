import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigation = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_PEHCHAN_URL}/api/auth/logout`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Logout failed')
      } else {
        navigation.replace('/')
      }
    } catch (error) {
    }
  }

  const menuItems = [
    { name: "Dashboard", icon: "grid", route: "dashboard", color: "gray" },
    { name: "Edit Profile", icon: "person", route: "edit-profile", color: "gray" },
    { name: "Notifications", icon: "notifications", route: "notifications", color: "gray" },
    { name: "Data Requests", icon: "document", route: "data-requests", color: "gray" },
    { name: "Settings", icon: "settings", route: "settings", color: "gray" },
    { name: "Log Out", icon: "log-out", route: "logout", color: "#E11D48" },
  ];

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4">
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} className="self-end p-2">
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* Sidebar Navigation Links */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // navigation.replace(`/${item}`);
              item.route === 'logout' ? handleLogout() : ''
              onClose(); // Close sidebar after navigation
            }}
            className="flex flex-row items-center space-x-2 p-3 rounded-lg hover:bg-gray-200"
          >
            <Ionicons name={item.icon as any} size={24} color={item.color} />
            <Text className={`text-lg font-semibold ${item.route === "logout" ? "text-red-600" : "text-gray-800"}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default Sidebar;

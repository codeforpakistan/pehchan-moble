import React from "react";
import { Image, View } from "react-native";

type LogoProps = {
  size?: number; // Optional prop to define the size of the logo
  name?: string;
};

// Mapping available logos
const logoAssets: Record<string, any> = {
  logo: require("../assets/images/logo.png"),
  white: require("../assets/images/whitelogo.png"),
};

const Logo: React.FC<LogoProps> = ({ size = 40,  name = "logo" }) => {
  const logoSource = logoAssets[name] || logoAssets["logo"]; 

  return (
    <View style={{  width: size, height: size }}>
      <Image
        source={logoSource}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
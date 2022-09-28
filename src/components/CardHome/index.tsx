import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface CardHomeProps extends TouchableOpacityProps {
  title: string;
  icon: string;
}

export function CardHome({ title, icon, ...rest } : CardHomeProps) {
  return(
    <TouchableOpacity {...rest}
      style={{
        backgroundColor: "#e6e6e6",
        width: "47%",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
      }}
    >
      <Ionicons 
        size={58}
        name={icon}
      />
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold"
        }}
      >{title}</Text>
    </TouchableOpacity>
  );
}
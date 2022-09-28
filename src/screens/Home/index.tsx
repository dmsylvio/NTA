import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { MainStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  Layout,
  Avatar,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { data } from "./data";
import { CardHome } from "../../components/CardHome";


export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { signOut, user } = useContext(AuthContext);

  function handleSignout(){
    alert("Signed out!");
    signOut();
  }
  
  const { isDarkmode, setTheme } = useTheme();
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 50
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold"
            }}
          >Hi,</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              fontFamily: "Ubuntu_700Bold"
            }}
          >{user?.name}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <Avatar
            source={require("../../assets/default-avatar.jpeg")}
            size="lg"
            shape="round"
          />
        </TouchableOpacity>
      </View>
      
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {
          data.map((item, index) => (
            <CardHome
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => navigation.navigate(item.route)}
            />
          ))
        }
      </View>
    </ScrollView>
  );
}
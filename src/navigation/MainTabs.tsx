import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Home from "../screens/Home";
import Appointments from "../screens/Appointments";
import Documents from "../screens/Documents";
import Options from "../screens/Options";


const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />

      <Tabs.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: ({ focused }) => (
              <TabBarText focused={focused} title="Appointment" />
          ),
          tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={"calendar"} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Documents"
        component={Documents}
        options={{
            tabBarLabel: ({ focused }) => (
                <TabBarText focused={focused} title="Documents" />
            ),
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} icon={"document"} />
            ),
        }}
      />

      <Tabs.Screen
        name="Options"
        component={Options}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Options" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"options"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
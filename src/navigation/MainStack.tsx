import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Newbusiness from "../screens/Newbusiness";
import MainTabs from "./MainTabs";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Newbusiness" component={Newbusiness} />
    </MainStack.Navigator>
  );
};

export default Main;
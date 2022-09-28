import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgetPassword from "../screens/Auth/ForgetPassword";

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return(
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
}

export default Auth;
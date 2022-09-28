import React, { useState, useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor
} from "react-native-rapi-ui";

import api from "../../services/api";
import { AuthContext } from "../../contexts/auth";

interface User{
  id: number;
  email: string;
  password: string;
  device_name: string;
  company_id: number;
}

interface Response{
  user: User;
  type: string;
  token: string;
}

export default function ({ navigation }: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { signIn } = useContext(AuthContext);
  
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<User>();

  async function handleSignIn(data: User){
    setLoading(true);

    data = {
      ...data,
      device_name: "mobile_app",
      company_id: 1
    };

    api.post<Response>("api/v1/auth/customer", data)
      .then((response) => {
        if(response){
          setLoading(false);
          signIn(response.data);
        }
      }).catch((err) => {
        setLoading(false);
        alert(err.response.data.errors!.email);
      });
  }

  return(
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../assets/login.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Login
            </Text>
            
            <Text>Email</Text>
            <Controller
              control={control}
              rules={{ 
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your email"
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}


            <Text style={{ marginTop: 15 }}>Password</Text>
            <Controller
              control={control}
              rules={{ 
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your password"
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}

            <Button
              text={loading ? "Loading" : "Continue"}
              onPress={handleSubmit(handleSignIn)}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" fontWeight="bold">
                  Forget password
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  )
}
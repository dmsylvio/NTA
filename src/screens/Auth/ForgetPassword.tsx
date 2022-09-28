import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import api from "../../services/api";

interface Forget{
  email: string;
  company: string;
}

interface Response{
  message: string;
  data: string
}

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
  const { control, handleSubmit, formState: { errors } } = useForm<Forget>();
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleForget(data: Forget) {
    setLoading(true);

    data = {
      ...data,
      company: "xyz"
    }

    api.post<Response>("api/v1/xyz/customer/auth/password/email", data)
      .then((response) => {
        if(response){
          setLoading(false);
          alert(response.data.message);
          navigation.push("Login");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data);
      })
  }

  return (
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
              source={require("../../assets/forget.png")}
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
              size="h3"
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Forget Password
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
            <Button
              text={loading ? "Loading" : "Send email"}
              onPress={handleSubmit(handleForget)}
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
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
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
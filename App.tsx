import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-rapi-ui";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { AuthProvider } from "./src/contexts/auth";

import {
  Ubuntu_400Regular, 
  Ubuntu_500Medium, 
  Ubuntu_700Bold, 
} from '@expo-google-fonts/ubuntu';
import Navigation from "./src/navigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ 
          Ubuntu_400Regular,
          Ubuntu_500Medium,
          Ubuntu_700Bold
        });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    async function onLayoutRootView(){
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
    onLayoutRootView();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
        <StatusBar />
      </AuthProvider>
    </ThemeProvider>
  );
}
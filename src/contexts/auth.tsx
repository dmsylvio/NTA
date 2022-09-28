import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ContextProps{
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<Response>;
  signOut(): void;
}

interface Props {
	children: React.ReactNode;
}

interface User{
  id: number;
  name: string;
  email: string;
}

interface Response{
  user: User;
  type: string;
  token: string;
}
const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(){
      const storagedUser = await AsyncStorage.getItem("NTAauth:user");
      const storagedToken = await AsyncStorage.getItem("NTAauth:token");

      if(storagedUser && storagedToken){
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(response: Response){
    setUser(response.user);

    await AsyncStorage.setItem("NTAauth:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("NTAauth:token", response.token);
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return(
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };
import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

import { NavigationContainer } from "@react-navigation/native";

import Main from './MainStack';
import Auth from './AuthStack';
import Loading from '../screens/utils/Loading';

export default () => {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    <Loading />
  }

  return(
    <NavigationContainer>
      { user ? <Main /> : <Auth /> }
    </NavigationContainer>
  );
}
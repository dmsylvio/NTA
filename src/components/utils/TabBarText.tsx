import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
import { Dimensions } from "react-native";

export default ({ title, focused }: { title: string; focused: boolean }) => {
  const { isDarkmode } = useTheme();
  const heightY = Dimensions.get("window").height;
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.warning600
          : "rgb(143, 155, 179)",
          fontSize: heightY * 0.014,
      }}
    >
      {title}
    </Text>
  );
};
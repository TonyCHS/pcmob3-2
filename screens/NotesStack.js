import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";
import AppLoading from "expo-app-loading";
import { useFonts, Aclonica_400Regular } from "@expo-google-fonts/aclonica";

const InnerStack = createStackNavigator();

export default function NotesStack() {
  let [fontsLoaded] = useFonts({
    Aclonica_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <InnerStack.Navigator>
        <InnerStack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            headerTitleStyle: {
              color: "white",
              fontSize: 40,
              fontFamily: "Aclonica_400Regular",
            },
            headerTitle: "Notes App",
            hearderTitleAlign: "center",
            headerStyle: {
              height: 120,
              backgroundColor: "orange",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            },
          }}
        />
      </InnerStack.Navigator>
    );
  }
}

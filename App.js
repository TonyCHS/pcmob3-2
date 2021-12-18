import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import NotesStack from "./screens/NotesStack";
import AddScreen from "./screens/AddScreen";

// Note: Missing line
function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([
    { title: "Walk the cat", done: false, id: "0" },
    { title: "Feed the elephant", done: false, id: "1" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          {/* // <TouchableOpacity onPress={() => navigation.navigate("Add Note")}> */}
          <Entypo
            name="new-message"
            size={20}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    navigation.navigate("Add Note");
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
      />
    </View>
  );
}

const InnerStack = createStackNavigator();

// function NotesStack() {
//   return (
//     <InnerStack.Navigator>
//       <InnerStack.Screen
//         name="Notes"
//         component={NotesScreen}
//         options={{
//           headerTitle: "Notes App",
//           headerTitleStyle: {
//             fontWeight: "bold",
//             fontSize: 30,
//           },
//           headerStyle: {
//             height: 120,
//             backgroundColor: "yellow",
//             borderBottomColor: "#ccc",
//             borderBottomWidth: 1,
//           },
//         }}
//       />
//     </InnerStack.Navigator>
//   );
// }

// function AddScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>This is the add screen</Text>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{ padding: 10 }}
//       >
//         <Text style={{ color: "orange" }}>Dismiss</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator mode="modal" headerMode="none"> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Notes Stack"
          component={NotesStack}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="Add Note" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});

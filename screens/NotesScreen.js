import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppLoading from "expo-app-loading";
import { useFonts, Aclonica_400Regular } from "@expo-google-fonts/aclonica";

import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Aclonica_400Regular,
  });

  const [notes, setNotes] = useState([]);
  // { title: "Walk the cat", done: false, id: "0" },
  // { title: "Feed the elephant", done: false, id: "1" },

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done TEXT)`
        );
      },
      null,
      refreshNotes
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo
            name="new-message"
            size={30}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (done, ?)", [
            route.params.done,
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );

      console.log(route.params.done);
      console.log(route.params.text);

      const newNote = {
        title: route.params.text,
        done: route.params.done,
        // done: true,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Note");
  }

  function deleteNote(id) {
    console.log("Deleting " + id);
    console.log(notes);
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
      },
      null,
      refreshNotes
    );
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor="orange"
          unfillColor="#FFFFFF"
          isChecked={item.done}
          text={item.title}
          iconStyle={{ borderColor: "orange" }}
          textStyle={{
            fontSize: 20,
            fontFamily: "Aclonica_400Regular",
            // onPress={(isChecked: boolean) => {}}
          }}
        />

        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Entypo name="trash" size={30} color="sienna" />
        </TouchableOpacity>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});

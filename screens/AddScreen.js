import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  SnowburstOne_400Regular,
} from "@expo-google-fonts/snowburst-one";

export default function AddScreen({ route, navigation }) {
  let bouncyCheckboxRef = null;
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  let [fontsLoaded] = useFonts({
    SnowburstOne_400Regular,
  });

  const onClick = (e) => {
    setDone(!done);
    console.log(!done);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.label}>Add your todo</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={(newText) => setText(newText)}
        ></TextInput>
        <BouncyCheckbox
          // isChecked={done}
          ref={(ref) => (bouncyCheckboxRef = ref)}
          size={25}
          fillColor="orange"
          unfillColor="#FFFFFF"
          text="Done?"
          iconStyle={{ borderColor: "sienna" }}
          textStyle={{
            fontSize: 20,
            fontFamily: "SnowburstOne_400Regular",
            textDecorationLine: "none",
          }}
          onPress={onClick}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes", { text })}
            style={[styles.button, styles.submitButton]}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 40, color: "grey" }}>
          This is what you typed:
        </Text>
        <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 35,
    fontFamily: "SnowburstOne_400Regular",
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 20,
    fontFamily: "SnowburstOne_400Regular",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "SnowburstOne_400Regular",
  },
  submitButton: {
    backgroundColor: "orange",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  bodytype: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
});

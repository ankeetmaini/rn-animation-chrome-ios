import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import TabHeader from "./TabHeader";

export default function Root() {
  return (
    <SafeAreaView style={[styles.container]}>
      <TabHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212223",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
    position: "relative"
  }
});

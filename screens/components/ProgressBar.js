import React from "react";
import { View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { styles } from "../../style";

export default function ProgressBarComponent({ progress }) {
  return (
    <View style={styles.progressBarContainer}>
      <ProgressBar progress={progress} color="#8A2BE2" style={styles.progressBarContainer} />
    </View>
  );
}

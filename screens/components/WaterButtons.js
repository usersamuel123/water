import React from "react";
import { View, Button, Text } from "react-native";
import { styles } from "../../style";

export default function WaterButtons({ addWater }) {
    return (
      <View style={styles.buttonContainer}>
        <Button title="+200ml" onPress={() => addWater(200)} />
        <Button title="-200ml" onPress={() => addWater(-200)} />
        <Button title="+500ml" onPress={() => addWater(500)} />
        <Button title="-500ml" onPress={() => addWater(-500)} />
      </View>
    );
  }

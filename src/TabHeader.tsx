import React, { FunctionComponent, useRef } from "react";
import { View, StyleSheet, MaskedViewIOS, Animated } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

type Props = {
  background: string;
  borderColor: string;
  color: string;
};

const BAR_WIDTH = 100;
const BAR_HEIGHT = 50;

const TabContent: FunctionComponent<Props> = ({
  background,
  borderColor,
  color
}) => {
  return (
    <View style={styles.bar}>
      <View style={[styles.tab, { backgroundColor: background, borderColor }]}>
        <Icon name="eye-off" size={32} {...{ color }}></Icon>
      </View>
      <View style={[styles.tab, { backgroundColor: background, borderColor }]}>
        <Icon name="grid" size={32} {...{ color }}></Icon>
      </View>
      <View style={[styles.tab, { backgroundColor: background, borderColor }]}>
        <Icon name="chrome" size={32} {...{ color }}></Icon>
      </View>
    </View>
  );
};

const TabHeader = () => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const translateX = animationValue.interpolate({
    inputRange: [0, BAR_WIDTH * 3],
    outputRange: [0, BAR_WIDTH * 2]
  });
  return (
    <View style={styles.container}>
      <TabContent background="#828384" borderColor="#505152" color="#f8f9fa" />
      <MaskedViewIOS
        style={StyleSheet.absoluteFill}
        maskElement={
          <Animated.View
            style={{
              transform: [{ translateX }],
              backgroundColor: "black",
              width: BAR_WIDTH,
              height: BAR_HEIGHT
            }}
          />
        }
      >
        <TabContent
          background="#f8f9fa"
          borderColor="#f8f9fa"
          color="#3b4043"
        />
      </MaskedViewIOS>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
        contentContainerStyle={{ width: BAR_WIDTH * 3 * 2 }}
        scrollEventThrottle={16}
        bounces={false}
        snapToInterval={BAR_WIDTH * 1.5}
        disableIntervalMomentum={true}
        decelerationRate="fast"
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: animationValue } }
            }
          ],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    width: "70%"
  },
  tab: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2
  }
});

export default TabHeader;

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const EventDetails = () => {
  const { title, image, description, isBooked } = JSON.parse(
    useLocalSearchParams().event
  ) as unknown as {
    title: string;
    image: string;
    description: string;
    isBooked: boolean;
  };
  console.log(useLocalSearchParams());

  const src = "https://loremflickr.com/200/200?random=1";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: src }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.isBooked}>{isBooked ? "Booked" : "Not Booked"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center",
  },
  isBooked: {
    fontSize: 16,
  },
});

export default EventDetails;

import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventCard from "../../components/EventCard";

const Dashboard = () => {
  const router = useRouter();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbXVrIiwiaWF0IjoxNzM3MzY0MTgzLCJleHAiOjE3MzczOTY1ODN9.tRoypRGhnnfLCrIKlWMQTxP9-symxN3giqQC77YRJpQ`
        );

        const response = await fetch(
          "http://192.168.43.50:8000/api/admin/events",
          {
            method: "GET",
            headers: myHeaders,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result = await response.json();
        const mappedEvents = result.map((event) => ({
          ...event,
          title: event.name,
          onPress: (event) =>
            router.push({
              pathname: "/EventDetail",
              params: { event: JSON.stringify(event) },
            }),
          onBook: () => alert(`Event '${event.title}' booked successfully!`),
        }));

        setEventsData(mappedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken"); // Remove token
    router.replace("/"); // Redirect to login
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Welcome to the Events Dashboard!</Text>
      {eventsData.length > 0 ? (
        eventsData.map((event) => (
          <EventCard style={styles.card} key={event.id} event={event} />
        ))
      ) : (
        <Text style={styles.noEventsText}>No events available.</Text>
      )}
      <View style={{ marginBottom: 40 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  contentContainer: { justifyContent: "center" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 20 },
  noEventsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Dashboard;

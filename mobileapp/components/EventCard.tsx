import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const EventCard = ({ event, style }) => {
  const src = "https://loremflickr.com/200/200?random=1";

  return (
    <Card style={style} onPress={() => event.onPress(event)}>
      <Card.Cover source={{ uri: src }} />
      <Card.Content>
        <Title>{event.title}</Title>
        <Paragraph>{event.description}</Paragraph>
        <Button
          mode="contained"
          onPress={event.onBook}
          disabled={event.isBooked}
        >
          {event.isBooked ? "Already Booked" : "Book"}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default EventCard;

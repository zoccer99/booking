import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EventCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={"https://picsum.photos/200/300"}
          alt={`Ein Bild vom Fussballspiel`}
          height="250"
        />
        <Card.Body>
          <Card.Title>{`${props.home_team} gg ${props.away_team}`}</Card.Title>
          <Card.Subtitle className="mb-3">
            {props.date} {"\u00B7"} {props.stadium}
          </Card.Subtitle>
          <Card.Text>Ein aufregendes Spiel</Card.Text>
          <Button variant="primary" onClick={() => {navigate(`/events/${props.id}`)}}>
            Jetzt buchen
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

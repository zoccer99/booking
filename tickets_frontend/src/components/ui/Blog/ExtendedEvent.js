import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Jumbotron, Form, ListGroup, Alert } from "react-bootstrap";
import bundesliga_logo from "../../../assets/pictures/bundesliga_logo.png";
import cl_logo from "../../../assets/pictures/cl_logo.jpg";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";

const competitons = {
  bundesliga: bundesliga_logo,
  champions_league: cl_logo,
};

const bookTicket = async (username, eventId, ticketId) => {
  const data = {
    user: username,
    eventId: eventId,
    ticketId: ticketId,
  };
  try {
    const res = await axios.post("http://localhost:5000/booking", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    if (res.status === 200) {
      alert("Erfolgreich Ticket hinzugefügt");
    }
  } catch (err) {
    alert("leider trat ein Fehler auf");
  }
};

export const ExtendedEvent = () => {
  const [selected, setSelected] = useState({});
  const [bookingState, setBookingState] = useState();
  const id = useParams()["id"];
  const { data, loading, error } = useFetch(
    `http://localhost:5000/events/${id}`
  );
  return (
    <>
      {loading ? (
        <div>isLoading...</div>
      ) : (
        <div className="container-fluid w-75">
          <blockquote className="blockquote">
            <h1 className="mb-0">Detailansicht</h1>
            <h2 className="blockquote-footer pt-4 ">
              {data?.home_team} gegen {data?.away_team}
            </h2>
          </blockquote>
          <div className="">
            <img
              src={competitons[data?.competition]}
              className="img-fluid img-thumbnail my-3 "
              alt="Das Logo des Wettbewerbes"
            />
          </div>
          <div className="border">
            <ListGroup>
              {data?.tickets.map((ticket) => (
                <ListGroup.Item
                  key={ticket._id}
                  action
                  onClick={() =>
                    setSelected({ ticketId: ticket._id, eventId: id })
                  }
                >
                  <div className="d-flex justify-content-between">
                    <h4>Block {ticket.Block}</h4>
                    <h4>Reihe {ticket.line}</h4>
                    <h4>Sitzplatz {ticket.seat}</h4>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                className="my-3"
                onClick={() => {
                  bookTicket(
                    localStorage.getItem("user"),
                    selected["eventId"],
                    selected["ticketId"]
                  );
                }}
              >
                Jetzt buchen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

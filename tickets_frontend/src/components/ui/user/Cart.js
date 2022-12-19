import React, { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

export const Cart = () => {
  const [data, setData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        let data = await axios.post(
          "http://localhost:5000/myTickets",
          { user: localStorage.getItem("user") },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        setLoggedIn(true);
        setData(data.data);
      } catch (e) {
        setLoggedIn(false);
        console.log(e);
      }
    }
    fetch();
  }, []);

  return (
      <div>
        {loggedIn ? (
          <div className="d-flex justify-content-center my-3">
            <div className="w-75">
              <ListGroup variant="flush">
                {data?.map((e) =>
                  e.tickets.map((ticket, i) => (
                    <ListGroup.Item key={i}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <p>Heim: {e.home_team}</p>
                          <p>Auswärts: {e.away_team}</p>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <p>{e.date.split("T")[0]}</p>
                          <p>{e.stadium}</p>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <p>Block: {ticket.Block}</p>
                          <p>Reihe: {ticket.line}</p>
                          <p>Sitzplatz: {ticket.seat}</p>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </div>
          </div>
        ) : (
          <div>Bitte einloggen</div>
        )}
      </div>
  );
};

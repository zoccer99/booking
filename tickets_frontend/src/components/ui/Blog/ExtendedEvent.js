import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Jumbotron } from "react-bootstrap";
import bundesliga_logo from "../../../assets/pictures/bundesliga_logo.png";
import cl_logo from "../../../assets/pictures/cl_logo.jpg";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios"


const competitons = {
  "bundesliga" : bundesliga_logo,
  "champions_league": cl_logo
}


const bookTicket = (user, eventId) => {
  const url = ``
  axios.post()
}

export const ExtendedEvent = () => {
  const id = useParams()["id"];
  const {data, loading, error } = useFetch(`http://localhost:5000/events/${id}`);
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
            <h4>Tribüne {Math.round(Math.random() * 20)}</h4>
            <h4>Reihe {Math.round(Math.random() * 80)}</h4>
            <h4>Sitzplatz {Math.round(Math.random() * 100)}</h4>
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                onClick={() => {
                  console.log("booked");
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

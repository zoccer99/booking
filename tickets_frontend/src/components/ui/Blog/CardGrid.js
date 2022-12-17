import React, { useEffect } from "react";
import { EventCard } from "./EventCard";
import { useFetch } from "../../../hooks/useFetch";
import { useState } from "react";

export const CardGrid = () => {
  let { data, loading, error } = useFetch("http://localhost:5000/events");
  return (
    <div className="container w-75">
      <div className="row justify-content-between">
        {loading && <div>loading</div>}
        {data &&
          data.slice(0, 4).map(
            (
              e,
              i //erste 3
            ) => (
              <div
                className="col col-md-4 d-flex justify-content-center my-2"
                key={i}
              >
                <EventCard
                  id = {e._id} 
                  home_team={e.home_team}
                  away_team={e.away_team}
                  date={e.date}
                  stadium={e.stadium}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

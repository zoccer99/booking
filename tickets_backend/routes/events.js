import express from "express";

const events = [
  {
    _id: "YtDjXlb2V9",
    home_team: "FC Bayern",
    away_team: "Manchester City",
    date: "2022-12-14T10:30:00",
    stadium: "Allianz Arena",
    competition: "champions_league"
  },
  {
    _id: "kKHk5ZwJ72",
    home_team: "RB Leipzig",
    away_team: "Borussia Dortmund",
    date: "2023-01-30T14:30:00",
    stadium: "Red Bull Arena",
    competition: "bundesliga"
  },
  {
    _id: "W-0w4nJlvv",
    home_team: "SC Freiburg",
    away_team: "FSV Mainz 05",
    date: "2022-02-14T15:00:00",
    stadium: "Europa-Park-Stadion",
    competition: "bundesliga"
  },
  {
    _id: "AnhAtPLMPY",
    home_team: "SC Freiburg",
    away_team: "FSV Mainz 05",
    date: "2022-02-14T15:00:00",
    stadium: "Europa-Park-Stadion",
    competition: "bundesliga"
  },
];

const eventRoutes = express.Router();

eventRoutes.get("/events/", async (req, res) => {
  res.json(events)
});

eventRoutes.get("/events/:id", async (req, res) => {
  console.log("Anfrage")
  const id = req.params["id"];
  const event = events.find((e) => e["_id"] === id);
  res.json(event)
});

export default eventRoutes;

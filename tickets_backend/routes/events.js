import express from "express";
import authentification from "../Middleware/authentification.js";

let events = [
  {
    _id: "YtDjXlb2V9",
    home_team: "FC Bayern",
    away_team: "Manchester City",
    date: "2022-12-14T10:30:00",
    stadium: "Allianz Arena",
    competition: "champions_league",
    tickets: [
      {
        _id: "e3ff3392-7ee3-11ed-a1eb-0242ac120002",
        Block: "A",
        line: 12,
        seat: 34,
        holder: null
      },
      {
        _id: "e3ff36a8-7ee3-11ed-a1eb-0242ac120002",
        Block: "D",
        line: 6,
        seat: 8,
        holder: null
      },
      {
        _id: "e3ff37d4-7ee3-11ed-a1eb-0242ac120002",
        Block: "E",
        line: 6,
        seat: 22,
        holder: null
      },
    ],
  },
  {
    _id: "kKHk5ZwJ72",
    home_team: "RB Leipzig",
    away_team: "Borussia Dortmund",
    date: "2023-01-30T14:30:00",
    stadium: "Red Bull Arena",
    competition: "bundesliga",
    tickets: [
      {
        _id: "e3ff38d8-7ee3-11ed-a1eb-0242ac120002",
        Block: "F",
        line: 7,
        seat: 10,
        holder: null
      },
      {
        _id: "e3ff3e14-7ee3-11ed-a1eb-0242ac120002",
        Block: "D",
        line: 14,
        seat: 31,
        holder: null
      },
      {
        _id: "e3ff3ffe-7ee3-11ed-a1eb-0242ac120002",
        Block: "E",
        line: 20,
        seat: 4,
        holder: null
      },
    ],
  },
  {
    _id: "W-0w4nJlvv",
    home_team: "SC Freiburg",
    away_team: "FSV Mainz 05",
    date: "2022-02-14T15:00:00",
    stadium: "Europa-Park-Stadion",
    competition: "bundesliga",
    tickets: [
      {
        _id: "e3ff4134-7ee3-11ed-a1eb-0242ac120002",
        Block: "A",
        line: 12,
        seat: 34,
        holder: null
      },
      {
        _id: "e3ff4242-7ee3-11ed-a1eb-0242ac120002",
        Block: "D",
        line: 1,
        seat: 3,
        holder: null
      },
      {
        _id: "e3ff4346-7ee3-11ed-a1eb-0242ac120002",
        Block: "E",
        line: 2,
        seat: 4,
        holder: null
      },
    ],
  },
  {
    _id: "AnhAtPLMPY",
    home_team: "SC Freiburg",
    away_team: "SV Werder Bremen",
    date: "2022-02-21T15:00:00",
    stadium: "Europa-Park-Stadion",
    competition: "bundesliga",
    tickets: [
      {
        _id: "164dae96-7ee4-11ed-a1eb-0242ac120002",
        Block: "A",
        line: 12,
        seat: 34,
        holder: null
      },
      {
        _id: "164db2ce-7ee4-11ed-a1eb-0242ac120002",
        Block: "D",
        line: 1,
        seat: 3,
        holder: null
      },
      {
        _id: "164db436-7ee4-11ed-a1eb-0242ac120002",
        Block: "E",
        line: 19,
        seat: 5,
        holder: null
      },
    ],
  },
];

const eventRoutes = express.Router();

eventRoutes.get("/events/", async (req, res) => {
  res.json(events);
});

eventRoutes.get("/events/:id", async (req, res) => {
  const id = req.params["id"];
  let temp = removeTickets(events, null)
  let event = temp.find((e) => e["_id"] === id);
  res.json(event);
});

eventRoutes.post("/booking",authentification,async (req, res) => {
  const username= req.body["user"];
  const eventId= req.body["eventId"];
  const ticketId= req.body["ticketId"];
  const event = events.find((e) => e["_id"] === eventId)
  const ticket = event.tickets.find((e) => e["_id"] == ticketId)
  if(ticket["holder"] == null) {
    events.forEach((event) => {
      event.tickets.forEach(ticket => {
        if(ticket._id == ticketId) {
          ticket.holder = username
        }
      });
    });
    res.sendStatus(200);
  }
  else {
    res.sendStatus(403)
  }
});

const getEventsByHolder = (events, holder) => {
  return events.filter((event) => {
    return event.tickets.some((ticket) => ticket.holder === holder);
  });
};

let removeTickets = (events, username) => {
   let newEvents = events.map(event => {
       let newTickets = event.tickets.filter(ticket => ticket.holder === username)
       return {...event, tickets: newTickets}
    })
    return newEvents
}

eventRoutes.post("/myTickets", authentification, async (req, res) => {
  const username = req.body["user"];
  let result = getEventsByHolder(events, "leon");
  result = removeTickets(result, username)
  res.json(result)
  //console.log(JSON.stringify(result))
})

export default eventRoutes;

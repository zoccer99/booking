import express from "express";
import events from "./routes/events.js";
import users from "./routes/users.js";

const app = express();
app.use(express.json())
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(events);
app.use(users)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

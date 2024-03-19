import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

// Create an express app and set the port number along with the API URL.
const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/get-lyric", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL + `${req.body.artist}/${req.body.song}`
    );

    res.render("index.ejs", { lyric: result.data.lyrics });
  } catch (error) {
    res.render("index.ejs", { lyric: JSON.stringify(error.response.data) });
  }
});
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

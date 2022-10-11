const express = require('express');
const connectToMongo = require("./db");
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
app.use(cors());
const port =process.env.PORT || 5000;
dotenv.config();
connectToMongo();

app.use(express.json());

//Available Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/notes", require("./routes/notesRoutes"));

app.get('/', function(req, res){
    res.send('Server Started...!!!')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

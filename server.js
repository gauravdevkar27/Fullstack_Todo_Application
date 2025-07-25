<<<<<<< HEAD
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.DB_URL).then((result) => {
    console.log("DB Connected Successfully");
}).catch(err => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})
=======

>>>>>>> 4887e2d3dc1cfb159ebd255937db44b4885f47cb

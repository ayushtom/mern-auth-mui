require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000
const userRouter = require('./routes/user')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/", userRouter)


app.listen(PORT, () => {
    mongoose.connect(process.env.URI)
        .then(() => {
            console.log("Connected with mongodb")
        });
    console.log(`server is running on ${PORT}`)
})
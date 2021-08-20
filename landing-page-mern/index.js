import express from "express"
// or const express = require("express")
import cors from "cors"
import mongoose from "mongoose"
//npm i express cors mongoose

//used very often in nodejs
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//to connect to the database
mongoose.connect("mongodb://localhost:27017/myMernAppDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database connected")
})


//user's schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//After schema, create model - NOW GO TO THE FRONTEND AND INTEGRATE THE API
const User = new mongoose.model("User", userSchema)


//Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            //after checking the user, now we will check the password
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body

    //to check if the user already exists
    //first email is entered by the user
    //second one will be taken from the database to check
    //if matched, returns an error and if not, then returns an object
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registered" })
        } else {
            //now create a mongodb user using the above values using the model we created
            const user = new User({
                name,
                email,
                password
            })

            //.save function saves the data in the database
            //in case error occurs, a callback will be fired
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "successfully registered" })
                }
            })
        }
    })
})


app.listen(9002, () => {
    console.log("BE started at port 9002")
})
const express = require('express')
const { path } = require("express/lib/application");
const app = express()
const bodyParser = require('body-parser')
const User = require("./models/User");
require("dotenv").config({path:'./config/.env'});
const mongoose = require('mongoose')
app.use(bodyParser.json());

const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl,(err)=>{
    err ? console.log(err) : console.log('database is connected')
})


app.use(express.json());



/*GET :  RETURN ALL USERS */

app.get("/users", (req, res) => {
    User.find()
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  });
  
  /*POST :  ADD A NEW USER TO THE DATABASE */
  
  app.post("/users", (req, res) => {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      telephone : req.body.telephone,
      adresse : req.body.adresse
    });
    newUser
      .save()
      .then(() => {
        res.json("User added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  /*PUT : EDIT A USER BY ID */
  
  app.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, (err) => {
      err
        ? console.log(err)
        : User.findById(req.params.id)
            .then(() => res.json("update copleted!"))
            .catch((err) => console.log(err));
    });
  });
  
  /*DELETE : REMOVE A USER BY ID */
  
  app.delete("/users/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json("User deleted"))
      .catch((err) => console.log(err));
  });
  
  app.get('/', (req,res)=>{
      res.send("home page!");
  })

  //const port = process.env.PORT

  const port = process.env.port
app.listen( port, (err)=> {
    err ? console.log(err) : console.log('server is running on port')
})

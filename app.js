const express = require("express");
const { nextTick } = require("process");
const morgan = require('morgan')
const mongoose = require("mongoose")
const { result } = require("lodash");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes")
const blogController = require("./controllers/blogController");
const studentController = require("./controllers/studentController")

const app = express();

//connecting to database
const dbURI = "mongodb+srv://4160-admin:4160bucs@4160.bv15yz2.mongodb.net/4160-attendance?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
//app.set("views", "myviews")

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

//home page
app.get("/", (req, res) => {
    res.redirect('/students')
});

//about page
app.get("/about", (req, res) => {
    res.render('about', { title: 'About' });
});

//create page
app.get("/students/create", studentController.student_create_get);

//blog routing
app.use("/students", blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

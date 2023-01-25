const express = require("express");
const { nextTick } = require("process");
const morgan = require('morgan')
const mongoose = require("mongoose")
const Blog = require('./models/blog');
const { result } = require("lodash");

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
app.use(morgan("dev"));

//mongoose and mogo sanbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "new blog",
        snippet: "zzz",
        body: "zzzzzzzz"
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

//home page
app.get("/", (req, res) => {
    res.redirect('/blogs')
});

//about page
app.get("/about", (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: "All Blogs", blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

//create page
app.get("/blogs/create", (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

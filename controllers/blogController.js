const Blog = require('../models/blog');
const Student = require('../models/student');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: "All Blogs", blogs: result})
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details", { blog: result, title: "Blog Details"})
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: '404' })
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/blogs" })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: '404' })
        })
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(() => {
            res.redirect("/blogs")
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    res.render('signUp', { title: 'Sign Up' });
}

module.exports = {
    blog_index,
    blog_details,
    blog_delete,
    blog_create_post,
    blog_create_get
}
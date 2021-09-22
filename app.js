//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Load the lodash full build.
var _ = require("lodash");

// port
const port = 3000;

const homePageContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutPageContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactPageContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "add mongodb cluster url here",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const postsSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postsSchema);

// // array for adding posts.
// let posts = [];

// home page
app.get("/", function (req, res) {
  Post.find({}, function (error, posts) {
    if (error) {
      console.log(error);
    } else {
      res.render("home", {
        homeContent: homePageContent,
        posts: posts,
      });
    }
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutPageContent,
  });
});

// contact page
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactPageContent,
  });
});

// compose page
app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/compose", function (req, res) {
  const post = { title: req.body.postTitle, content: req.body.postBody };

  const new_post = new Post({
    title: post.title,
    content: post.content,
  });

  new_post.save();

  // posts.push(post);

  res.redirect("/");
});

// post directory.
app.get("/posts/:postId", function (req, res) {
  let requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (error, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.listen(port, function () {
  console.log(`Server started on : http://localhost:${port}`);
});

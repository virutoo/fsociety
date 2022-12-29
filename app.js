//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to the Comminity. To all my Followers 'I am not in danger. I am the Danger..'. Please Follow the Following Rules. 1)You do not Talk about this community 2)Do not talk about this comminity 3)Fuck the community" ;
const aboutContent = "We dont exist. You dont exist. Existence is meaningless";
const contactContent = "You do not contact us. We Contact U...";
const posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,resp){
  resp.render("home",{startingContent: homeStartingContent,posts: posts});
});

app.get("/about",function(req,resp){
  resp.render("about",{aboutContent: aboutContent});
});

app.get("/contact",function(req,resp){
  resp.render("contact",{contactContent: contactContent});
});

app.get("/compose",function(req,resp){
  resp.render("compose");
});

app.post("/compose",function(req,resp){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  resp.redirect("/");
});

app.get("/posts/:postName",function(req,resp){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const postTitle = _.lowerCase(post.title);
    if(requestedTitle === postTitle){
      resp.render("post",{title: post.title,content: post.content});
    }
  });
});

// app.get("/compose",function(req,resp){
//   resp.render("compose");
// })




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

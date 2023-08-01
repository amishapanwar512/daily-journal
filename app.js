//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
var _ = require('lodash');
// Load the core build.

const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://amishapanwar512:HEqQ1ppqzIF7Fnd7@cluster0.c72zcs8.mongodb.net/journalDB";
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected successfully");
})
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
const PORT=process.env.PORT|5000;
const homeStartingContent = "Welcome to your daily journal !a digital sanctuary for self-expression, reflection, and growth. Unleash the magic of words to weave your authentic narrative and embrace the power of vulnerability. This space is free from judgment, allowing you to discover the extraordinary within the ordinary. Happy writing!";
const aboutContent = "We believe that self-expression is a transformative journey, and Your Daily Journal is here to guide you along the way. Our platform was born from the desire to provide a safe and empowering space where you can explore the power of journaling.Every day, we invite you to embrace the magic of writing as you chronicle your experiences, emotions, and reflections. Through the art of journaling, you can celebrate your victories, embrace your challenges, and connect with your innermost self.Your Daily Journal is more than just a digital diary; it's a companion that accompanies you on your quest for self-discovery. No matter where you are on your journey, this platform offers a judgment-free zone where you can express your thoughts freely.As you delve into the depths of your thoughts, you'll uncover the beauty of your unique narrative and witness the incredible growth that unfolds with each entry. Our mission is to inspire and empower you to embrace vulnerability, authenticity, and growth through the written word.Join us on this enriching expedition as you create, reflect, and cherish the art of being human. Your Daily Journal is here to celebrate your journey and honor the power of your voice.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var posts = [];
const app = express();
const journalSchema=new mongoose.Schema({
  title:String,
  content:String
});
const journal=mongoose.model("journal",journalSchema);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {

  journal.find().then(function (p) {
  res.render("home", { para: homeStartingContent , posts: p});

  });
  });
app.get("/about", function (req, res) {
  res.render("about", { para2: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = new journal( { title: req.body.postTitle, content: req.body.postBody });
  journal.insertMany([post]).then(function(){
    console.log("inserted");
  });
  res.redirect("/")
});
app.get("/posts/:topic", function (req, res) {
 const  postName = (req.params.topic);
  console.log(postName);
  journal.find({title:postName}).then(function (post) {
    console.log(post);
    post.forEach(function(posts){
       var postTitle=posts.title;
       var postContent=posts.content;
       
       res.render("post", { postt:postTitle, postc: postContent })
     
  });
})
})
app.post("/delete",function(req,res){
  let postName=req.body.postTitle;
  console.log(postName)
  journal.deleteOne({title:postName}).then(function(){
    console.log("deleted")
  })
  res.redirect("/")
})












app.listen(PORT, function () {
  console.log("Server started on port ");
});

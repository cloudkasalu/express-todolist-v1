const express = require('express');
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const app = express();
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

var items = ["Do that thing", "Then that thing"];
var workItems = []
var url = "/"

app.get("/", function(req, res){
    let day = date.getDay()
    res.sendFile(__dirname + '/index.html')
    res.render('list', {listTitle: day, newListItems: items, directory: url})
})

app.get("/work", function(req, res){
    url = "/work";
    res.render('list', {listTitle: "Work List", newListItems: workItems, directory: url})
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item)
    res.redirect('/work')
})

app.post('/',function(req,res){
   items.push(req.body.newItem)
   
   res.redirect("/")
})

app.listen(3001, function(){
    console.log("Server started on port 3000")
})
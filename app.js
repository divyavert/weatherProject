const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html"); 
})
app.post("/",function(req,res){
    var city = req.body.inputcity;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=24cdf5bd044a5195223aefe1c45c9dab&units=metric";
    
  https.get(url,function(resp){
    resp.on("data",function(data){
    const wdata = JSON.parse(data);
    const temp = wdata.main.temp;
    const weather = wdata.weather[0].description;
    const wid = wdata.weather[0].icon;
    const icon = "http://openweathermap.org/img/wn/"+ wid + "@2x.png";
   res.write("<h1>the temperature is "+temp+ " degrees in " +city+ "</h1>");
   res.write("<h1>the weather is "+weather+" in " +city+ "</h1>");

   res.write("<img src="+icon+ ">");
   res.send();
})

})

})

// const url = "https://api.openweathermap.org/data/2.5/weather?q=surat&appid=24cdf5bd044a5195223aefe1c45c9dab&units=metric";
    // https.get(url,function(resp){
    //     resp.on("data",function(data){
    //     const wdata = JSON.parse(data);
    //     const temp = wdata.main.temp;
    //     const weather = wdata.weather[0].description;
    //     const wid = wdata.weather[0].icon;
    //     const icon = "http://openweathermap.org/img/wn/"+ wid + "@2x.png";
    //    res.write("<h1>the temperature is "+temp+ " degrees in surat</h1>");
    //    res.write("<h1>the weather is "+weather+" in surat</h1>");
    
    //    res.write("<img src="+icon+ ">");

    //    res.send();
    

    //     })
    // })
    
 
app.listen("3000",function(){
    console.log("server active");
})
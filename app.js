const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const https = require('https');
const { post } = require('request');



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res)
{
const firstName = req.body.firstName;
const lastName = req.body.lastName;
const email = req.body.email;

var data = {
    members:[
    {
        
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
    ]
}

const jsonData = JSON.stringify(data);

const url = "https://us1.api.mailchimp.com/3.0/lists/420bf6f8f1";

const options = {
    method:"POST",
    auth: "nitesh:982702010382868ce86f0ef509263072-us12"
}

const request = https.request(url,options,function(response)
{
    if(response.statusCode === 200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data)
    {
        console.log(JSON.parse(data));
    })


})

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res)
{
    res.redirect("/");
})



app.listen(process.env.PORT || 3000,function()
{
    console.log("server is running on port 3000");
})

//Mailchip API key
// 982702010382868ce86f0ef509263072-us12

//List ID
//420bf6f8f1
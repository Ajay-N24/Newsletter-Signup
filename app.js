const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")
const app=express();
let apiKey=process.env.APIKEY;
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.post("/",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                  },
            }
        ]
        
    }
    const jsonData=JSON.stringify(data)
    const url="https://us10.api.mailchimp.com/3.0/lists/abc3a32310";
    const options={
        method: "POST",
        auth: "Ajay:"+apiKey
    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
    if(express.response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
})
app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.listen(process.env.PORT||3000,function(req,res){
    console.log("server is running on port 3000")
})
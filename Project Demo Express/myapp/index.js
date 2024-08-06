const express = require("express");
const app = express();

app.get("/",(request,response) =>{

    response.send("Hello World");
});

// To print today's date when /date

app.get("/date",(request,response) =>{
    
    let date = new Date();
    response.send(`Today's date is ${date}`);
})

// To display html file when /page only html file will get displayed 

app.get("/page",(request,response) => {

    response.sendFile("./index.html",{root:__dirname});
})


app.listen(3000);
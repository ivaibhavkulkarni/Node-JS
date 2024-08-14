const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let db = null;
app.use(express.json());


const dbpath = path.join("D:", "Node Js", "Project Mern Test", "myapp", "dataBase.db");

const initializeDbandServer = async () =>{

    try{
    db = await open ({
        filename:dbpath,
        driver: sqlite3.Database
    })
    app.listen(3000,()=>{
        console.log("Server Running at http://localhost:3000");
    })
    }
    catch(error){
        console.log(error.message);
    }
}

initializeDbandServer();

// Create user
//API for posting a new user into t_login

app.post("/register/",async (request,response) => {

    const { username, password } = request.body
    const userExisitsInDB = `SELECT * FROM t_login WHERE f_userName = '${username}';`;
    const user = await db.get(userExisitsInDB);
    const hashedPassword = await bcrypt.hash(password,10);

    if(user === undefined){
        const postingNewUserIntoTable = `INSERT INTO t_login (f_userName,f_Pwd) VALUES ('${username}', '${hashedPassword}');`
        await db.run(postingNewUserIntoTable);
        response.send("User created successfully!")
    }
    else{
        response.status(400);
        response.send("User Already Exist.");   
    }
});

// API for login already existig user

app.post("/login/", async (request,response) => {

    const { username, password } = request.body;    
    const userPresntInTable =  `SELECT * FROM t_login WHERE f_userName = '${username}';`;
    const userPresent = await db.get(userPresntInTable);

    if(userPresent === undefined){
        response.status(400);
        response.send("User Sign Up")
    }
    else{
        
        const isPasswordValid = await bcrypt.compare(password,userPresent.f_Pwd);
        if(isPasswordValid){
            response.send("Login Successful")
        }
        else{
            response.status(400)
            response.sned("Incorrect Password")
        }

    }
});


//API employe Details table;


app.post("employeDetailes",async (request,response) =>{
    const { username } = request.body
    const { f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,f_Createdate} = request.body;
    
    const checkingForUser = `SELECT * from t_login WHERE f_userName = '${username}';`;
    const checkingForUserinDB = await db.get(checkingForUser);

    if (checkingForUserinDB === undefined){

        const postEmployee = `INSERT INTO t_Employee ( f_Id,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,f_Createdate ) VALUES ( ${f_Id}, '${f_Name}','${f_Email}',${f_Mobile},'${f_Designation}','${f_gender}','${f_Course}',${f_Createdate});`;
        const postdata = await db.run(postEmployee);
        response.send(postdata);
        response.send("Posted Successful!");
    } 
    else{
        response.send("Data Already Exists");
    }
})

// API for editing data list 

app.post("/editing/", async (request,response) =>{

    const { username } = request.body;
    const { f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,f_Createdate} = request.body;
    const updatingData = `SELECT * FROM t_login WHERE f_userName = '${username}';`;
    const dataPresent = await db.get(updatingData);

    if (dataPresent === undefined){
        response.send("No Data Found");
    }
    else{

        const editingData = `INSERT INTO t_Employee ( f_Id,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,f_Createdate ) VALUES ( ${f_Id}, '${f_Name}','${f_Email}',${f_Mobile},'${f_Designation}','${f_gender}','${f_Course}',${f_Createdate});`;
        await db.run(editingData);
        response("Updated");
    }

})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});


app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;


const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
var bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const jwtKey='status';


const app = express();
app.use(express.json());
app.use(cors());
const  mysql  = require('mysql');
const { application } = require("express");
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alldata',
  port: 3306,
  insecureAuth : true
});
db.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});



// app.get('/register' , (req,res)=>{
// const sqlInsert = "INSERT into allusers (uid,fName,lName,role,phone,email,password) VALUES ('123456','swati','singh','admin','84409876','a@gmail.com','abc')";
// db.query(sqlInsert,(error,result)=>{
//     console.log("error",error);
//     console.log("result",result);
//     res.send("hello server ");
// });
// });
//-----------------------------------------------------------------------------------------------------
// Get all data from db
app.get("/api/get", async (req,res)=>{
    const sqlGet =  "SELECT * FROM allusers";
      db.query(sqlGet,(error,result)=>{
       res.send(result);
        
     });
});


// Registration api 
app.post("/register", async (req, res) => {
  let { UID, fName, lName, role, phone, email, password } = req.body;
  password= await bcrypt.hashSync(password,10);
  res.send(password);
  const sqlInsert =
    "INSERT INTO allusers (UID,fName,lName,role,phone,email,password) VALUES (?,?,?,?,?,?,?)";
  db.query(sqlInsert, [UID,fName,lName,role,phone,email,password],(error,result)=>{
  if (error){
    console.log(error);
  }else {
    Jwt.sign({result},jwtKey,{expiresIn:"30d"},(err,token)=>{
      if(err){
        res.send({result:"Something went wrong ,Please try  after some time"})
      }
      res.send({result,auth:token})
    })
  }
  });
});

// deleteAPI  users
app.delete("/delete/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove ="DELETE FROM allusers WHERE id = ?";
    db.query(sqlRemove,id,(error,result)=>{
if (error){
    console.log(error)
}
res.send(result);
    });
});


///Update dB for prefildata 
app.get("/getUser/:id",  (req,res)=>{
    const {id}=req.params;
    const sqlGet =  "SELECT * FROM allusers WHERE id  = ?";
      db.query(sqlGet,id,(error,result)=>{
        if (error){
            console.log(error);
        }
            res.send(result);
            console.log(result);
        
      
     });
});

//Update user in Db
app.put("/updateUser/:id",(req,res)=>{
    const {id}=req.params;
    const { fName, lName, role, phone, email} = req.body;
    const sqlUpdate = "UPDATE allusers SET fName=?,lName=?,role=?,phone=?,email=? WHERE id = ?";
    db.query(sqlUpdate,[fName,lName,role,phone,email,id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


app.post("/Login", async (req,res)=>{
    const email = req.body.email;
    const role = req.body.role;
    const password= req.body.password;
    db.query("SELECT * FROM allusers WHERE email=? AND role=? ",[email,role],
      (err,result)=> {
        if(err){
          res.send({err:err});
        }

        if (result.length>0){
    let x = bcrypt.compareSync(req.body.password , result[0].password);
    console.log(x);
          res.send(result);
        }else{
          res.send({message:"Wrong credentials"})
        }
      }
    );
});



// app.post("/Login",(req,res)=>{
//   const email = req.body.email;
//   const role = req.body.role;
//   const password= req.body.password;
//   db.query(`SELECT * FROM allusers WHERE email=email AND role=role`,
//     (err,result)=> {
//       console.log(result);
//       if(err){
//         res.send({err:err});
//       }

//       if (result.length>0){
//         bcrypt.compareSync(req.body.password , result.password);
//         res.send(result);
//       }else{
//         res.send({message:"Wrong credentials"})
//       }
//     }
//   );
// });


 

//Search api 
// app.get("/search/:key",(req,res)=>{
  
// })

app.get("/search/:key",async(req,res)=>{
  let result = await User.find({
    "$or":[
      { fName:{$regex:req.params.key}},
      { lName:{$regex:req.params.key}},
      { role:{$regex:req.params.key}},
      { email:{$regex:req.params.key}}
    ]
  });
  res.send(result);
  });

app.listen(3100, () => {
  console.log(`server is runing on 3100`);
});

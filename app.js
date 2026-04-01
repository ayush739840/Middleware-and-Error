const express=require("express");
const app= express();
const ExpressError = require("./ExpressError");

const port=8080;
// app.use((req,res ,next)=>{
//     console.log("hi, I am 1st middleware");
//     next();
// })

// app.use((req,res,next)=>{
//     console.log(" hii , I am 2nd middleware");
//     next();
// })

// app.use((req, res,next)=>{
//     req.time = new Date(Date.now());
//     console.log(req.method , req.hostname ,req.path , req.time);
//     next();
// })

const checkToken =(req,res,next)=>{
    let { token} =req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED");
};

app.get("/api",checkToken,(req,res)=>{
    res.send("data");
})


app.get("/" , (req,res)=>{
    res.send("hello");
})

app.get("/random" , (req,res)=>{
    res.send(" this is a random page");
});

app.get("/admin" , (req,res)=>{
    throw new ExpressError(403,"Access to admin is Forbidden")
});
app.get("/err" ,(req,res)=>{
    abcd=abcd;
})

app.use((err,req,res,next)=>{
   let { status=500, message} = err;
   res.status(status).send(message);
})

// app.use((err,req,res,next)=>{
//     console.log(" ..... ERROR MIDDLEWARE ....");
//     res.send(err);
// })


app.listen( port ,()=>{
    console.log(`server is listening to port ${port}`);
});
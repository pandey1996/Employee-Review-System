const express=require('express');
const port=8080;

const app=express();

app.listen(port,function(err){
    if(err){
        console.log('Cannot run Server !!!');
    }
    console.log('Server Running on port - ',port);
});
let express = require('express');
let bodyParser = require('body-parser');
require('./config/db');
// let user = require('./model/user');
// let contact = require('./model/contact');

let app = express();
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hellow word');
})


//route
let userController = require('./controllers/userController');

// app.get('/addUser',userController.addUSer);
app.post('/addUser',userController.addUSer);
app.get('/getAllUsers',userController.getAllUsers);
app.get('/getUSerById/:id',userController.getUSerById);
app.post("/postUser",userController.postUser);
app.delete("/deleteUserById/:id",userController.deleteUserById);
app.patch("/updateUserById/:id",userController.updateUserByid);
app.get('/query',userController.queryUser);


// user.sync({ force: true });
// contact.sync({force:true});

app.listen(process.env.PORT,()=>{
console.log("express server is running on port 3000");
})
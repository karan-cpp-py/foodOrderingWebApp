const express = require('express')
const mongoose= require('mongoose')
const app = express()
const port = 8000
mongoose.connect("mongodb://127.0.0.1:27017/GoFood").then(async()=>{
    console.log("connected to mongoDB");
    const fetched_data = await mongoose.connection.db.collection("foodData");
    const food = await fetched_data.find({}).toArray()
    global.foodItems = food
    const food_category = await mongoose.connection.db.collection("foodCategory");
    const foodCat = await food_category.find({}).toArray()
    global.foodCategory = foodCat
    //console.log(data)
    })
    .catch((err)=>{
    console.log(err);
});

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use(express.json())

app.get('/',(req,res) => {
    res.send('food app')
    console.log("Hello")
})
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/GoFood';

const mongoDB = ()=> {
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connected")
        const fetched_data = mongoose.connection.db.collection("foodData");
        fetched_data.find().toArray((err,data)=>{
            if(err) console.log(err);
            else{
                global.foodItems = data;
                console.log(data);
            }
        })
    })
    .catch((err)=>{console.error()});
};

module.exports = mongoDB;
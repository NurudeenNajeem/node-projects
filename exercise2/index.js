const express = require('express');
const joi = require('joi');

const app = express();
const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/exercise')
    .then(() => console.log('Connected to database......'))
    .catch(err => console.error('Not Connected to database....',err));

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tag : [String],
    date : Date,
    isPublished : Boolean,
    price : Number

});
const Course = mongoose.model("Course",courseSchema);
async function getCourses(){
    return await Course
//Get all the published Courses that are $15 or more, or have the word 'by' in their title

        .find( {isPublished:true})
        .or([
            { price : {$gte : 15}},
            { name : /.*by.*/i}
        ])

        //Sort the price in Descending order
        .sort('-price')
        .select('name author price')
    console.log(courses);
}

async function run() {
    courses = await getCourses();
    console.log(courses) 
}
run()



// const port = process.env.PORT || 3000;
// app.listen(3000, () => console.log(`Listen to Port  ${port}`))
// return;
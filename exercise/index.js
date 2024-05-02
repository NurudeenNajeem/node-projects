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
        // .find({tags : "backend",isPublished:true})
        .find({tags : {$in :['frontend', 'backend']}, isPublished:true})
        // .sort({name : 1})
        // .sort('name')

        //Descending order
        .sort('-price')
        .select('name author price')
    console.log(courses);
}

async function run() {
    courses = await getCourses();
    console.log(courses) 
}
run()




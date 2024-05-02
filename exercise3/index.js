const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('Connected to database......'))
    .catch(err => console.error('Not Connected to database....',err));

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tag : [String],
    date : {type: Date, default: Date.now},
    isPublished : Boolean

});

const Course = mongoose.model("Course",courseSchema);

async function createCourse(){

    const course = new Course({
        name : "Django  Course",
        author : "Ade",
        tag : ['Python','frontend'],
        isPublished : true
    
    });
    
    const result = await course.save()
    // console.log(result);
}

createCourse();
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    courses = await Course.find()   
        .find({author : "Nur",isPublished:true})
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({name : 1})
        .count()
        // .select({name:1, tag:1})
    console.log(courses);
}
getCourses()

async function updateCourse(id){
//Updating documents- query first
    const course = await Course.findById(id)
    if (!course) return;

    course.isPublished = true;
    course.author = 'Nurudeen';

    const result = await course.save();
    console.log(result)
}
updateCourse('6600708c78bf2f085699b276')

async function updateCours(id) {
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author : "NAHEEM",
            isPublished: true
        }
    },);
    console.log(course)
    
}
updateCours('660070edc56191ce964aa3b2')


async function deleteCourse(id) {
    const course = await Course.deleteOne({ _id: id });
    console.log(course);
}
deleteCourse('660071130d304c54487cff23')

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

async function deleteCourse(id) {
    // to delete many course : deleteMany
    const course = await Course.deleteOne({ _id: id });
    // console.log(course);
    //To find the course that was deleted
    const result = await Course.findByIdAndDelete(id);
    console.log(result)

}
deleteCourse('66007c37da035fb0e75d6180')
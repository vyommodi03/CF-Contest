const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function convert(tmp){
    var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return {
        dt: tmp.getDate(),
        mnt:months_arr[tmp.getMonth()],
        year:tmp.getFullYear()
    }
}

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : true
    },
    
    date : {
        type: Object,
        required: true,
        default: convert(new Date()) 
    },
    
    type : {
        type : String,
        required : true
    },

    detail : {
        type : String,
        required : true
    },
},{timestamps : true});

const Blog = mongoose.model('Blogs',blogSchema);
module.exports = Blog;

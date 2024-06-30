const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  
  image: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
});

let BLOG = mongoose.model('blog', blogSchema)

module.exports = BLOG
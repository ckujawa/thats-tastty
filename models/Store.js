const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //uses built in ES6 Promise...
const slug = require('slugs')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please name the store you are trying to create.'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
})

//create slug prior to saving....
storeSchema.pre('Save', function(next) { //use proper function in order to use 'this'
  if (!this.isModified('name')){
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
  //TODO prevent duplicate slugs...
})

module.exports = mongoose.model('Store', storeSchema);
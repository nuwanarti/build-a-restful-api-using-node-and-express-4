// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema(
  {
    name: String
  }
);


// this.find = function(){
//   return "bear";
// }
// var Bear = mongoose.model('Bear', BearSchema);
// module.exports = Bear;
module.exports = mongoose.model('Bear', BearSchema);

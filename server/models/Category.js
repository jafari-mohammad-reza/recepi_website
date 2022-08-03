const {model , Schema} = require('mongoose');
const CategorySchema = new Schema({
      name : {
        type : String ,
        required : true ,
        unique : true
      },
    image : {
        type : String ,
        required : true
    }

})

module.exports = {
    CategoryModel : model("category" , CategorySchema)
}

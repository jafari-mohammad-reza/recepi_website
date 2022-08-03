const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
  name : {type : String , required : true},
  description : {type :  String , required:true},
  ingredients : {type : [String] , required:true, default : []},
  image : {type : String , required :true},
  category : {type : mongoose.Types.ObjectId , required:true, ref:"category"},
  is_approved : {type : Boolean , default : false},
});
RecipeSchema.index({name : "text"});

module.exports = {
  RecipeModel : mongoose.model("recipe" , RecipeSchema)
}

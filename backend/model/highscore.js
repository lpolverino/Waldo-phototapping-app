const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HighscoreSchema = new Schema({
    highscores:[{type:Object, properties:{
        name:{type:String, default:"Anonimous", maxlength:56},
        score:{type:Number, min:0, max:3600000 ,required:true}
    }}]

})

module.exports = mongoose.model("Highscore", HighscoreSchema)
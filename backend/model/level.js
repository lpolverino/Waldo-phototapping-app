const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    name:{ type:String, required:true, maxLength:56 },
    img:{type:String, required:true},
    characters:[{type:Object, required:true, properties:{
        _id:{type:String, required:true, minlength:1, maxlength:56},
        name:{ type:String, required:true, maxLength:56 },
        img:{type:String, required:true},
        img:{type:String, required:true},
        position:{type:Object, required:true, properties:{
            from:{type:Object, required:true, properties:{
                x:{type:Number, min:0},
                y:{type:Number, min:0},
            }},
            to:{type:Object, required:true, properties:{
                x:{type:Number, min:0},
                y:{type:Number, min:0},
            }}
        }}
    }}],
    highscore:{type:Schema.Types.ObjectId, ref:"Highscore", default:[]},
    imgWidth:{type:Number, required:true, min:1},
    imgHeight:{type:Number, required:true, min:1},
})

module.exports = mongoose.model("Level", LevelSchema)
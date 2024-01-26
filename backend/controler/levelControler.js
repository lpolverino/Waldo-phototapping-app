const Level = require("../model/level");
const Highscores = require("../model/highscore");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const assertValidPosition = (pos, start, end) => {

    return (pos.x >= start.x && pos.x <= end.x) && (pos.y >= start.y && pos.y <= end.y) 
}

const filterCharacterPositions = (level) =>{
    const charactersWIthoutPositions = level.characters.map(character => {
        return {
            id:character._id,
            name:character.name,
            img: character.img
        } 
    })
    return {
        _id:level._id,
        name:level.name,
        img:level.img,
        characters: charactersWIthoutPositions,
        highscore: level.highscore,
        imgHeight:level.imgHeight,
        imgWidth:level.imgWidth,
    }
} 


exports.level_list = asyncHandler(async (req, res, next) => {
    const alllevels = await Level.find({})
        .select("name img")
        .sort({name:1})
        .exec()
    res.send({levels:alllevels});
});

exports.level_detail = asyncHandler( async (req,res, next) =>{
    const levelId = req.params.levelId

    const level = await Level.findById(levelId).exec()

    console.log(level);
    if(level === null){
        res.status(400).send({message:"The level requested was not found"})
        next()
    }
    const levelFiltered =filterCharacterPositions(level)
    res.send({level:levelFiltered})
})

exports.process_target_position = [
    body("positionX", "Empty Position")
    .notEmpty()
    .escape()
    .isInt({min:1})
    .withMessage("not valid imput"),

    body("positionY", "Empty Position")
    .notEmpty()
    .escape()
    .isInt({min:1})
    .withMessage("not valid imput"),

    body("characterId")
    .trim()
    .notEmpty()
    .withMessage("empty character"),

    asyncHandler( async (req,res,next) =>{
    const levelId = req.params.levelId
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(403).send({errors:errors.array()})
      next()
    }
    const clickedPosition = {
        x:req.body.positionX,
        y:req.body.positionY,
    }

    const characterId = req.body.characterId
    console.log(`Clicked on (${clickedPosition.x} ; ${clickedPosition.y}) in the level ${levelId} searching for ${characterId}`);

    const levelCharacters = await Level.findById(levelId).select("characters").exec()

    if(levelCharacters === null){
        res.status(400).send({message:"The level requested was not found"})
        next()
    }

    const character = levelCharacters.characters.find(character => character._id === characterId)

    console.log(character);

    const succed = assertValidPosition(clickedPosition, character.position.from, character.position.to)

    res.send({message:`Clicked on (${req.body.positionX} ; ${req.body.positionY}) in the level ${levelId} searching for ${req.body.characterId}`, succed:succed})
    
})]

exports.get_highscores = asyncHandler( async (req, res, next) => {
    const level = await Level.findById(req.params.levelId).exec()

    if(level === null) {
        res.status(404).send({message:`resource ${req.params.levelId} not found`})
        return
    }

    const highscores = await Highscores.findById(level.highscore).limit(50).exec()

    if(highscores === null) {
        res.send({highscores: []})
        return
    }

    res.send({highscores})
})

exports.add_score =[
    body("name")
    .trim()
    .isLength({max:56})
    .withMessage("the user is too long"),

    body("score")
    .isInt({min:0, max:3600000})
    .withMessage("invalid score"),

    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).send({message:errors, name:req.body.name, score: req.body.score})
            return
        }

        const newScore = {name:req.body.name, score: req.body.score}

        const levelHighscoreId = await Level.findById(req.params.levelId).select("highscore").exec()

        console.log(levelHighscoreId);

        const highscore = await Highscores.findById(levelHighscoreId.highscore).exec()

        if(highscore === null){
            res.status(400).send({message:`resource ${req.params.levelId} not found`})
            return
        }

        console.log(highscore);

        const newHIghscores = {
            _id:highscore._id,
            level: highscore.level,
            highscores: highscore.highscores.concat([newScore])
        }

        try{
            const updatedHighscore = await Highscores.findByIdAndUpdate(highscore._id, newHIghscores, {})
            res.send(updatedHighscore._id)
            return
        }
        catch(e){
            res.status(500).send({message:`Something went wrong: ${e}`})
            return
        }
    })
]
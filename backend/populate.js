#! /usr/bin/env node

require("dotenv").config()

console.log(
	'this script add the level 1 for the waldo db'
);
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

	const Level = require("./model/level")
  const levels = []

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = process.env.MONGODB_URI;
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createLevel();
 
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function levelCreate() {
    const level = new Level({ 
			name:"level1",
    	img:"https://i.imgur.com/pUWzROV.jpg",
    characters:[{
				_id:"waldolevel1",
				name:"Waldo",
				img:"https://i.imgur.com/ltRSywa.png",
				position:{
					from:{
						x:1165,
						y:415,
					},
					to:{
						x:1215,
						y:485,
					}
				}
			},
			{
				_id:"wizardlevel1",
				name:"Wizard",
				img:"https://i.imgur.com/laAEZzP.png",
				position:{
					from:{
						x:500,
						y:380,
					},
					to:{
						x:545,
						y:445,
					}
				}
			},
			{
				_id:"evilwaldolevel1",
				name:"Evil Waldo",
				img:"https://i.imgur.com/5m8SLMS.png",
				position:{
					from:{
						x:195,
						y:390,
					},
					to:{
						x:220,
						y:450,
					}
				}
			},
    ]
		});
    await level.save();
    console.log(`Added level: ${"level1"}`);
  }
  
  async function createLevel() {
    console.log("Adding level");
    await levelCreate()
  }
  
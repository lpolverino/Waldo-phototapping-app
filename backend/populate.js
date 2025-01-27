#! /usr/bin/env node

require("dotenv").config()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

console.log(
	'this script add the level 1 for the waldo db'
);
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  const levels = []
  const highscores = []

  
	main()
		.then(async () => {
			await prisma.$disconnect()
		})
		.catch(async (err) => {
			console.log(err);
			await prisma.$disconnect()
			process.exit(1);
		})
  
  async function main() {
    console.log("Debug: About to connect");
    console.log("Debug: Should be connected?");
    await createLevel();
    console.log("Debug: Closing mongoose");
  }
  
  async function levelCreate(highscoreIndex) {
    
		const level = await prisma.level.create({
			data:{
				name:"level1",
				url: "https://i.imgur.com/pUWzROV.jpg",
			}
		})
		const waldo = await prisma.characterForLevel.create({
			data:{
				name:"Waldo",
				url:"https://i.imgur.com/ltRSywa.png",
				fromx:1165,
				fromy:415,
				tox: 1215,
				toy: 485,
				levelId: level.id,
			}
		});
		const wizard = await prisma.characterForLevel.create({
			data:{
				name:"Wizard",
				url:"https://i.imgur.com/laAEZzP.png",
				fromx:500,
				fromy:380,
				tox: 545,
				toy: 445,
				levelId: level.id,
			}
		});
		const evilWaldo = await prisma.characterForLevel.create({
			data:{
				name:"evilWaldo",
				url:"https://i.imgur.com/5m8SLMS.png",
				fromx:195,
				fromy:390,
				tox: 220,
				toy: 450,
				levelId: level.id,
			}
		});
		const highscore = await prisma.highscore.create({
			data:{
				name:"lpolverino",
				score: 4500,
				levelId: level.id,
			}
		})
	levels[0] = level
    console.log(`Added level: ${"level1"}`);
}

  async function createLevel() {
    console.log("Adding level");
    await levelCreate()
  }
  
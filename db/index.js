const Sequelize = require('sequelize')
const {STRING, INTEGER} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movie_db')
const faker = require('faker')
console.log(process.env.DATABASE_URL)
// let movieData = new Array(3).fill('').map(_ => faker.company.catchPhrase())

const Movie = conn.define('movie', {
  name: {
    type: STRING
  },
  rating: {
    type: INTEGER,
    validate: {
      max: 5,
      min: 1
    },
    defaultValue: 3,
  }
})

Movie.createRandom = function () {
  return Movie.create({ name: faker.company.catchPhrase()});
};

const syncAndSeed = async()=>{
  await conn.sync({force: true})
  // await Promise.all(
  //   movieData.map((name)=> Movie.create({name: name })))
  //   console.log(`
  //     Seeding successful!
  //   `);
}

module.exports ={
  models: {
    Movie
  },
  conn,
  syncAndSeed,
}
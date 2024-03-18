let express = require("express");
const MongoClient = require("mongodb").MongoClient;

let app = express();
app.listen(8080);

app.use('/', express.static(__dirname+"/htdocs"));
const url = 'mongodb://127.0.0.1:27017';
const mongoClient = new MongoClient(url); 

app.get('/movies',function(request,response){
    readMovies().then(function(moviesArray){
        response.setHeader('Content-Type','application/json');
        response.status(200).send(moviesArray);
    });
 
   
});


async function readMovies()
{
      await mongoClient.connect();
      const moviesDataBase = mongoClient.db("movies");
      const imdbCollection = moviesDataBase.collection("imdb");
      let moviesArray = await imdbCollection.find().toArray();
      console.log(moviesArray);
      return moviesArray;

 
}
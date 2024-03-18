let express = require("express");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

let app = express();
app.listen(8080);

app.use('/', express.static(__dirname+"/htdocs"));
app.use(express.urlencoded({extended:false}));
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


app.get('/movies/:id',function(request,response){
    readMovie(request.params.id).then(function(movie){
        response.setHeader('Content-Type','application/json');
        response.status(200).send(movie);
    });
 
   
});
async function readMovie(id)
{
      await mongoClient.connect();
      const moviesDataBase = mongoClient.db("movies");
      const imdbCollection = moviesDataBase.collection("imdb");
      const query = {
        _id:new ObjectId(id)
      };

      const options = {
        projection:{
           // _id:0,
         
        }
      }
      let movie = await imdbCollection.findOne(query,options);
      console.log(movie);
      return movie;

 
}



app.delete('/movies/:id',function(request,response){
    deleteMovie(request.params.id).then(function(movie){
        response.setHeader('Content-Type','application/json');
        response.status(200).send(movie);
    });
 
   
});
async function deleteMovie(id)
{
      await mongoClient.connect();
      const moviesDataBase = mongoClient.db("movies");
      const imdbCollection = moviesDataBase.collection("imdb");
      const query = {
        _id:new ObjectId(id)
      };

   
    
      let movie = await imdbCollection.deleteOne(query);
      return movie;

 
}



app.post('/movies',function(request,response){

    newMovie = {
        
          "Poster_Link": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg",
          "Series_Title": request.body.title,
          "Released_Year": 1994,
          "Runtime": "142 min",
          "Genre": "Drama",
          "Overview": request.body.description,
          "Director": request.body.realisateur
    }
    createMovie(newMovie).then(function(moviesArray){
        response.setHeader('Content-Type','application/json');
        response.status(200).send("created");
    }); 
});


async function createMovie(newMovie)
{
      await mongoClient.connect();
      const moviesDataBase = mongoClient.db("movies");
      const imdbCollection = moviesDataBase.collection("imdb");
      let moviesArray = await imdbCollection.insertOne(newMovie);
  
     // window.location.href = 'http://127.0.0.1:8080/list.html';

 
}
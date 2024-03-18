fetch('http://127.0.0.1:8080/movies')
    .then(function (response) {
        return response.json();

    })
    .then(function (data) {
        let id ;
        data.forEach(movie => {
            const liName = document.createElement('li');
            liName.innerText = movie.Series_Title;
            liName.onclick =
                function (event) {
                    dispalyMovieDetails(movie._id);
                };
            const ul_list_movies = document.querySelector('.moviesList');
            ul_list_movies.appendChild(liName);
            id=movie._id;
           
        });
        dispalyMovieDetails(id);


    })
    .catch(function (err) {
        console.log("Something went wrong!", err)
    });

function dispalyMovieDetails(id) {
    fetch('http://127.0.0.1:8080/movies/' + id)
        .then(function (response) {
            return response.json();

        })
        .then(function (movie) {

            const title = document.querySelector('.title');
            title.innerText = movie.Series_Title;

            const imgsrc = document.querySelector('.imgFilm');
            imgsrc.src = movie.Poster_Link;

            const Overview = document.querySelector('.Overview');
            Overview.innerText = movie.Overview;

            const Director = document.querySelector('.Director');
            Director.innerText = movie.Director;

            const Released_Year = document.querySelector('.Released_Year');
            Released_Year.innerText = movie.Released_Year;

            const Runtime = document.querySelector('.Runtime');
            Runtime.innerText = movie.Runtime;

            const deleteButton = document.querySelector('.Delete');
            deleteButton.onclick =
                function (event) {
                    deleteMovie(movie._id);
                };
        })
        .catch(function (err) {
            console.log("Something went wrong!", err)
        });

}

function deleteMovie(id) {
    fetch('http://127.0.0.1:8080/movies/' + id, { method: 'DELETE' })
        .then(function (response) {
            location.reload();
        })
        .catch(function (err) {
            console.log("Something went wrong!", err)
        });

}
const addButton = document.querySelector('.addButton');
addButton.onclick =
    function (event) {
        console.log("je suis ici");
        document.querySelector('.formCreate').classList.toggle('hidden');
    };

// server request for the movie selected
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
            apikey:"a7d4986a",
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left'){
        leftMovie = response.data;
    }else {
        rightMovie= response.data;
    }

    if (leftMovie && rightMovie){
        runComparaison();
    }
}

const runComparaison = () => {
    // find the first article element for each movie
    // run a comparaison of box office
    // apply some styling to the "article" element

    // find the first article element for each movie
    // run a comparaison of # of awards
    // apply some styling to the "article" element
}

const autoCompleteConfig ={
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? "" : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `;
    },
    
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
            params:{
                apikey:"a7d4986a",
                s: searchTerm
            }
        });
        if (response.data.Error){
            return [];
        }
        return response.data.Search;
    }
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
    },
})
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
    },
})


const movieTemplate = movieDetail => {

    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
    const metascore = parseInt(movieDetail.Metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))

    console.log(metascore, imdbRating, imdbVotes );

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}">
            <p>
        </figure>
            <div class="media-content"> 
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
    </article>
    
    <article class="notification is-primary">
        <p class="title"> ${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title"> ${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title"> ${movieDetail.Metascore}</p>
        <p class="subtitle">Meta-score</p>
    </article>
    <article class="notification is-primary">
        <p class="title"> ${movieDetail.imdbRating}</p>
        <p class="subtitle">Imdb Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title"> ${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB votes</p>
    </article>
    `;
}
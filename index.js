// server-request
const fetchData = async (searchTerm) =>{
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
            apikey:"a7d4986a",
            s: searchTerm
        }
    });
    console.log(response.data.Search);
}

const input = document.querySelector("input")

const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    }
}

let timeoutId;
const onInput = event => {
        fetchData(event.target.value)
};

input.addEventListener('input' , debounce(onInput,500))
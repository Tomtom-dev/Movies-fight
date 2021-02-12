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

let timeoutId;
const onInput = event => {
    if(timeoutId){
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value)
    }, 1000);
};

input.addEventListener('input' , onInput)
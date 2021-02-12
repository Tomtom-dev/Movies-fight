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
        fetchData(event.target.value)
};

input.addEventListener('input' , debounce(onInput,500))
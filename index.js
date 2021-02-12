const fetchData = async () =>{
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
            apikey:"a7d4986a",
            s:'avengers'
        }
    });
    console.log(response.data);
}

fetchData()
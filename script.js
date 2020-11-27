var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   changeCountry();
  }
});


fetch(`https://corona.lmao.ninja/v2/countries/Philippines`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    document.getElementById("country").innerHTML = data.country;
    document.getElementById("flag").src = data.countryInfo.flag;
    document.getElementById("active").innerHTML = data.active.toLocaleString();
    document.getElementById("critical").innerHTML = data.critical.toLocaleString();
    document.getElementById("recovered").innerHTML = data.recovered.toLocaleString();
    document.getElementById("cases").innerHTML = data.cases.toLocaleString();
    document.getElementById("deaths").innerHTML = data.deaths.toLocaleString();
    document.getElementById("tests").innerHTML = data.tests.toLocaleString();
})

const changeCountry = () =>{
    var country = document.getElementById("search").value;
    fetch(`https://corona.lmao.ninja/v2/countries/${country}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        document.getElementById("country").innerHTML = data.country.toLocaleString();
        document.getElementById("flag").src = data.countryInfo.flag;
        document.getElementById("active").innerHTML = data.active.toLocaleString();
        document.getElementById("critical").innerHTML = data.critical.toLocaleString();
        document.getElementById("cases").innerHTML = data.cases.toLocaleString();
        document.getElementById("deaths").innerHTML = data.deaths.toLocaleString();
        document.getElementById("tests").innerHTML = data.tests.toLocaleString();
    })

}

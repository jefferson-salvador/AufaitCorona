$(document).ready(function(){
    $('.toast').toast(window.outerWidth >= 960 ? 'show' : 'hide');
});

var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        changeData();
    }
});

var myData = ["active", "critical", "recovered", "cases", "deaths", "tests"];

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

var changeData = () =>{
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
        document.getElementById("recovered").innerHTML = data.recovered.toLocaleString();
        document.getElementById("cases").innerHTML = data.cases.toLocaleString();
        document.getElementById("deaths").innerHTML = data.deaths.toLocaleString();
        document.getElementById("tests").innerHTML = data.tests.toLocaleString();
        
    });
}

var worldData = () =>{
    fetch(`https://corona.lmao.ninja/v2/all`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{        
        document.getElementById("country").innerHTML = "Wordwide";
        document.getElementById("flag").src = '../images/globe.png';
        document.getElementById("active").innerHTML = data.active.toLocaleString();
        document.getElementById("critical").innerHTML = data.critical.toLocaleString();
        document.getElementById("recovered").innerHTML = data.recovered.toLocaleString();
        document.getElementById("cases").innerHTML = data.cases.toLocaleString();
        document.getElementById("deaths").innerHTML = data.deaths.toLocaleString();
        document.getElementById("tests").innerHTML = data.tests.toLocaleString();
    });
}

var event = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("date").innerHTML = event.toLocaleDateString(undefined, options);



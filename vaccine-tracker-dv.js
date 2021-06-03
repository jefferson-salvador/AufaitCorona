var x = "hello";

var myTimelineChart;
var myVaccineChart;
var population = 0;
var lastDose = 0;
var countries = [
    "Anguilla",
    "Antigua and Barbuda",
    "Aruba",
    "Bahamas",
    "Barbados",
    "Belize",
    "Bermuda",
    "British Virgin Islands",
    "Canada",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Costa Rica",
    "Cuba",
    "Curaçao",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Martinique",
    "Mexico",
    "Montserrat",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre Miquelon",
    "Saint Vincent and the Grenadines",
    "Sint Maarten",
    "St. Barth",
    "Trinidad and Tobago",
    "Turks and Caicos Islands",
    "USA",
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Cyprus",
    "Georgia",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Lebanon",
    "Macao",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "S. Korea",
    "Saudi Arabia",
    "Singapore",
    "Sri Lanka",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkey",
    "UAE",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Falkland Islands (Malvinas)",
    "French Guiana",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia",
    "Bulgaria",
    "Channel Islands",
    "Croatia",
    "Czechia",
    "Denmark",
    "Estonia",
    "Faroe Islands",
    "Finland",
    "France",
    "Germany",
    "Gibraltar",
    "Greece",
    "Holy See (Vatican City State)",
    "Hungary",
    "Iceland",
    "Ireland",
    "Isle of Man",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "UK",
    "Ukraine",
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Côte d'Ivoire",
    "DRC",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Réunion",
    "Saint Helena",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Swaziland",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Western Sahara",
    "Zambia",
    "Zimbabwe",
    "Australia",
    "Fiji",
    "French Polynesia",
    "Marshall Islands",
    "Micronesia",
    "New Caledonia",
    "New Zealand",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Vanuatu",
    "Wallis and Futuna"
];

var mergedCountries = [];
var sortedCountry = [];
var currentCountry = "Philippines";

sortedCountry = countries.sort();

var select = document.getElementById("selectCountry"); 
for(var i = 0; i < sortedCountry.length; i++) {
    var opt = sortedCountry[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}
select.selectedIndex = "155";

function val(){
    currentCountry = document.getElementById("selectCountry").value;
    document.getElementById("total-population").innerHTML = document.getElementById("selectCountry").value; 
    changeVaccineLine();
    changeVaccinePie();
}


// LINE GRAPH
fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/Philippines`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    var timeArray = Object.keys(data.timeline);
    var dosesArray = Object.values(data.timeline);
    document.getElementById("vaccineTimelineTitle").innerHTML = `${data.country} Vaccination Timeline`;
    document.getElementById("total-doses").innerHTML = dosesArray[dosesArray.length-1].toLocaleString();
    lastDose = dosesArray[dosesArray.length-1];

    var ctx = document.getElementById('vaccineTimeline');
    myVaccineTimeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeArray,
            datasets: [{
                label: 'Vaccination Progress',
                data: dosesArray,
                backgroundColor: 'blue',
            }
            ]
            
        },
        options: {
            scales: {
                x: {
                   grid: {
                      display: false
                   }
                },
                y: {
                    grid: {
                        display: true
                    },
                    ticks:{
                        callback: function(value, index, values) {
                            return value / 1e6 + 'M';
                        }
                    }
                }
           },
            elements: {
                point: {
                    pointRadius: 1,
                    hitRadius: 5,
                    hoverRadius: 5,
                },
                
            }
        }
    });
})

function changeVaccineLine(){
    lastDose = 0;
    population = 0;
    fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/`+currentCountry)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById("vaccineTimelineTitle").innerHTML = `${data.country} Vaccination Timeline`;
        var timeArray = Object.keys(data.timeline);
        var dosesArray = Object.values(data.timeline);

        document.getElementById("total-doses").innerHTML = dosesArray[dosesArray.length-1].toLocaleString();
        lastDose = 0;
        lastDose = dosesArray[dosesArray.length-1];

        var ctx = document.getElementById('vaccineTimeline');
        myVaccineTimeline.destroy();
        myVaccineTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeArray,
                datasets: [{
                    label: 'Vaccination Progress',
                    data: dosesArray,
                    backgroundColor: 'blue',
                }
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: true
                        }
                    }
                },
                elements: {
                    point: {
                        pointRadius: 1,
                    }
                }
            }
        });
    });

}

// PIE GRAPH
fetch(`https://disease.sh/v3/covid-19/countries/Philippines`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    population = data.population;
    document.getElementById("vaccineGraphTitle").innerHTML = `${data.country} Graph Population x Doses`;
    document.getElementById("total-population").innerHTML = population.toLocaleString();
    document.getElementById("vacc")

    var ctx2 = document.getElementById('vaccineChart');
    myVaccineChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Population', 'Doses'],
            datasets: [{
                label: 'Vaccine Doses per Day',
                data: [(population-lastDose), lastDose],
                    backgroundColor: [
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 159, 64, 1)",
                        "rgba(54, 162, 235, 1)",
                    ],
                borderWidth: 1
            }
            ]
            
        },
        options: {
        }
    });
})

function changeVaccinePie() {
    lastDose = 0;
    population = 0;
    myVaccineChart.destroy();
    fetch(`https://disease.sh/v3/covid-19/countries/`+currentCountry)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        document.getElementById("vaccineGraphTitle").innerHTML = `${data.country} Population and Doses`;
        population= 0;
        population = data.population;
        document.getElementById("total-population").innerHTML = population.toLocaleString();

        var ctx2 = document.getElementById('vaccineChart');
        myVaccineChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Population', 'Doses'],
                datasets: [{
                    label: 'Vaccine Doses per Day',
                    data: [(population-lastDose), lastDose],
                    backgroundColor: [
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 159, 64, 1)",
                        "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1
                }
                ]
                
            },
            options: {
            }
        });
    })
}


// WORLD TIME LINE 

function worldVaccineLine(){
    fetch(`https://disease.sh/v3/covid-19/vaccine/coverage`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById("vaccineTimelineTitle").innerHTML = `World Vaccination Timeline`
        var timeArray = Object.keys(data);
        var dosesArray = Object.values(data);

        document.getElementById("total-doses").innerHTML = dosesArray[dosesArray.length-1].toLocaleString();
        lastDose = 0;
        lastDose = dosesArray[dosesArray.length-1];

        var ctx = document.getElementById('vaccineTimeline');
        myVaccineTimeline.destroy();
        myVaccineTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeArray,
                datasets: [{
                    label: 'Vaccination Progress',
                    data: dosesArray,
                    backgroundColor: 'blue',
                }
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: true
                        },
                    }
                },
                elements: {
                    point: {
                        pointRadius: 1,
                    }
                }
            }
        });
    });
}

function worldVaccinePie(){
    lastDose = 0;
    population = 0;
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        document.getElementById("vaccineGraphTitle").innerHTML = `World Population and Doses`;
        population = 0;
        population = data.population;
        document.getElementById("total-population").innerHTML = population.toLocaleString();
        var ctx2 = document.getElementById('vaccineChart');
        myVaccineChart.destroy();
        myVaccineChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Population', 'Doses'],
                datasets: [{
                    label: 'Vaccine Doses per Day',
                    data: [(population-lastDose), lastDose],
                    backgroundColor: [
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 159, 64, 1)",
                        "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1
                }
                ]
                
            },
            options: {
            }
        });
    })
}
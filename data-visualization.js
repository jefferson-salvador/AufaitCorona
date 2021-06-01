var myCountryChart;
var myTimelineChart;

var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        changeCountry();
        changeTimeline();
    }
});


// PIE GRAPH

var myBgColor = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

var myBorderColor = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

var myLabels = ['Active', 'Critical', 'Recovered', 'Cases', 'Deaths', 'Tests'];

fetch(`https://corona.lmao.ninja/v2/countries/Philippines`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    graphTitle = data.country;
    document.getElementById("graphTitle").innerHTML = `COVID Cases Graph in ${data.country}`;
    var delayed;
    var ctx = document.getElementById('trackerChart').getContext('2d');
    myCountryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [...myLabels],
            datasets: [{
                label: 'Covid-19 Tracker',
                data: [data.active, data.critical, data.recovered, data.cases, data.deaths, data.tests],
                backgroundColor: [...myBgColor ],
                borderColor: [...myBorderColor],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false,
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            }
        }
    });
})

var changeCountry = () =>{
    myCountryChart.destroy();
    var delayed;
    var country = document.getElementById("search").value;
    fetch(`https://corona.lmao.ninja/v2/countries/`+ String(`${country}`))
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        
    graphTitle = data.country;
        document.getElementById("graphTitle").innerHTML = `COVID Cases Graph in ${data.country}`;
        var ctx = document.getElementById('trackerChart').getContext('2d');
        myCountryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [...myLabels],
                datasets: [{
                    label: 'Covid-19 Tracker',
                    data: [data.active, data.critical, data.recovered, data.cases, data.deaths, data.tests],
                    backgroundColor: [...myBgColor ],
                    borderColor: [...myBorderColor],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 100 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
            }
        });
    })
}

var changeToWorld = () =>{
    myCountryChart.destroy();
    fetch(`https://corona.lmao.ninja/v2/all`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        
    graphTitle = data.country;
        document.getElementById("graphTitle").innerHTML = `COVID Cases Graph Worldwide`;
        var ctx = document.getElementById('trackerChart').getContext('2d');
        myCountryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [...myLabels],
                datasets: [{
                    label: 'Covid-19 Tracker',
                    data: [data.active, data.critical, data.recovered, data.cases, data.deaths, data.tests],
                    backgroundColor: [...myBgColor ],
                    borderColor: [...myBorderColor],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false,
                },
            }
        });
    })
}

// LINE GRAPH
fetch(`https://corona.lmao.ninja/v2/historical/Philippines?lastdays=all`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    var timeArray = Object.keys(data.timeline.cases);
    var casesArray = Object.values(data.timeline.cases);
    var deathsArray = Object.values(data.timeline.deaths);
    var recoveredArray = Object.values(data.timeline.recovered);
    var ctx = document.getElementById('trackerTimeline');
    myTimelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...timeArray],
            datasets: [{
                label: '# of Cases',
                data: [...casesArray],
                backgroundColor: 'blue',
                borderWidth: 1,

            }, {
                label: '# of Deaths',
                data: [...deathsArray],
                backgroundColor: 'red',
                borderWidth: 1,
            }, {
                label: '# of Recovered',
                data: [...recoveredArray],
                backgroundColor: 'green',
                borderWidth: 1,
            }
            ]
            
        },
        options: {
            elements: {
                point:{
                    radius: 1,
                }
            }
        }
    });
})

var changeTimeline = () =>{
    myTimelineChart.destroy();
    var country = document.getElementById("search").value;
    fetch(`https://corona.lmao.ninja/v2/historical/`+ String(`${country}`) + `?lastdays=all`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        document.getElementById("timelineTitle").innerHTML = `${data.country} Timeline`;
        var timeArray = Object.keys(data.timeline.cases);
        var casesArray = Object.values(data.timeline.cases);
        var deathsArray = Object.values(data.timeline.deaths);
        var recoveredArray = Object.values(data.timeline.recovered);
        var ctx = document.getElementById('trackerTimeline');
        myTimelineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...timeArray],
                datasets: [{
                    label: '# of Cases',
                    data: [...casesArray],
                    backgroundColor: 'blue',
                    borderWidth: 1,

                }, {
                    label: '# of Deaths',
                    data: [...deathsArray],
                    backgroundColor: 'red',
                    borderWidth: 1,
                }, {
                    label: '# of Recovered',
                    data: [...recoveredArray],
                    backgroundColor: 'green',
                    borderWidth: 1,
                }
                ]
                
            },
            options: {
                elements: {
                    point:{
                        radius: 1,
                    }
                }
            }
        });
    })
}

var worldTimeline = () =>{
    myTimelineChart.destroy();
    fetch(`https://corona.lmao.ninja/v2/historical/all?lastdays=all`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        document.getElementById("timelineTitle").innerHTML = `World Timeline`;
        var timeArray = Object.keys(data.cases);
        var casesArray = Object.values(data.cases);
        var deathsArray = Object.values(data.deaths);
        var recoveredArray = Object.values(data.recovered);
        var ctx = document.getElementById('trackerTimeline');
        myTimelineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...timeArray],
                datasets: [{
                    label: '# of Cases',
                    data: [...casesArray],
                    backgroundColor: 'blue',
                    borderWidth: 1,
    
                }, {
                    label: '# of Deaths',
                    data: [...deathsArray],
                    backgroundColor: 'red',
                    borderWidth: 1,
                }, {
                    label: '# of Recovered',
                    data: [...recoveredArray],
                    backgroundColor: 'green',
                    borderWidth: 1,
                }
                ]
                
            },
            options: {
                elements: {
                    point:{
                        radius: 1,
                    }
                }
            }
        });
    })
}
var myChart;
var graphTitle;
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        
        myChart.destroy();
        changeData();
    }
});

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
    myChart = new Chart(ctx, {
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

const changeData = () =>{
    var country = document.getElementById("search").value;
    var delayed;
    fetch(`https://corona.lmao.ninja/v2/countries/`+ String(`${country}`))
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        
    graphTitle = data.country;
        document.getElementById("graphTitle").innerHTML = `COVID Cases Graph in ${data.country}`;
        var ctx = document.getElementById('trackerChart').getContext('2d');
        myChart = new Chart(ctx, {
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
                },
            }
        });
    })
}
var country = document.getElementById("search").value;

fetch(`https://corona.lmao.ninja/v2/countries/Philippines`)
.then((response)=>{
    return response.json();
})
.then((data)=>{

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Critical', 'Recovered', 'Cases', 'Deaths', 'Tests'],
            datasets: [{
                label: 'Covid-19 Tracker',
                data: [data.active, data.critical, data.recovered, data.cases, data.deaths, data.tests],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
})
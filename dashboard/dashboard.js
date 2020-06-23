var ctx = document.getElementById('myChart');



var ctx = document.getElementById("myChart").getContext('2d');


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"],
        datasets: [{
            label: '# of Votes',
            data: [12000, 10000, 8000, 5000, 2000, 3000],
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
            fill: false,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3',
            borderWidth: 3 // S


        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});
let logOut1 = () => {
    window.location.href = "../Authentication/index.html"
    console.log("op")
}
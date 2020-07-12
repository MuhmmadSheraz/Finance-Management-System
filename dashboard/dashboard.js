//Logout
let logOut = () => {
    auth.signOut().then(() => {
        window.location.href = "../index.html"
    })
    console.log("logged Out")
    localStorage.clear()
}

//Chart Functionality
let localData = JSON.parse(localStorage.getItem("FinaceUser"))
let userId = localData.userId
let expenseArr = [];
let incomeArray = [];
var myChart;

db.collection('userTransaction').where("userId", "==", userId).get().then(e => {
    e.forEach(x => {
        console.log(x.data().date.toDate().getFullYear())
        if (x.data().expense == true) {
            if (expenseArr[x.data().date.toDate().getMonth()]) {
                expenseArr[x.data().date.toDate().getMonth()] += Number(x.data().amount);
            } else {
                expenseArr[x.data().date.toDate().getMonth()] = Number(x.data().amount);
            }
        } else {
            if (incomeArray[x.data().date.toDate().getMonth()]) {
                incomeArray[x.data().date.toDate().getMonth()] += Number(x.data().amount);
            } else {
                incomeArray[x.data().date.toDate().getMonth()] = Number(x.data().amount);
            }
        }
    })
}).then(() => {
    var ctx = document.getElementById('myChart');
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                    label: 'Incomes',
                    axisX: {
                        valueFormatString: "MMM",
                        labelAngle: -50
                    },
                    data: incomeArray,
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
                },
                {
                    label: 'Expense',
                    data: expenseArr,
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
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 3 // S
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });
});

filterByYear = (data) => {
    let localData = JSON.parse(localStorage.getItem("FinaceUser"));
    let userId = localData.userId
    let expenseArr = [];
    let incomeArray = [];
    let dataset = [{
            label: 'Incomes',
            axisX: {
                valueFormatString: "MMM",
                labelAngle: -50
            },
            data: incomeArray,
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
        },
        {
            label: 'Expense',
            data: expenseArr,
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
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 3 // S
        }
    ];
    myChart.destroy()
    db.collection('userTransaction').where("userId", "==", userId).get().then(e => {
        e.forEach(x => {
            if (data.value == x.data().date.toDate().getFullYear()) {
                if (x.data().expense == true) {
                    if (expenseArr[x.data().date.toDate().getMonth()]) {
                        expenseArr[x.data().date.toDate().getMonth()] += Number(x.data().amount);
                    } else {
                        expenseArr[x.data().date.toDate().getMonth()] = Number(x.data().amount);
                    }
                } else {
                    if (incomeArray[x.data().date.toDate().getMonth()]) {
                        incomeArray[x.data().date.toDate().getMonth()] += Number(x.data().amount);
                    } else {
                        incomeArray[x.data().date.toDate().getMonth()] = Number(x.data().amount);
                    }
                }
            }
        })
    }).then(() => {
        if (!expenseArr.length && !incomeArray.length) {
            dataset = []
        }
        var ctx = document.getElementById('myChart');
        var ctx = document.getElementById("myChart").getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: dataset
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    });

    Chart.plugins.register({
        afterDraw: function(chart) {
            if (chart.data.datasets.length === 0) {
                var ctx = chart.chart.ctx;
                var width = chart.chart.width;
                var height = chart.chart.height
                chart.clear();

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "20px 'Helvetica'";
                ctx.fillText('No data to display', width / 2, height / 2);
                ctx.restore();
            }
        }
    });
}


//Recent POst 

recentPost = () => {
    let localData = JSON.parse(localStorage.getItem("FinaceUser"))
    let userId = localData.userId
    let allTransactionArr = [];
    let incomeArr = [];
    let expenseArr = [];
    let i = 0;
    let j = 0;
    db.collection('userTransaction').where("userId", "==", userId).where("expense", "==", true).orderBy('currentDate', "desc").limit(5).get().then(e => {

        if (e.docs.length) {
            e.forEach(x => {
                i++

                let tableBody = document.getElementById('expenseTableBody')

                //creating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Addnig Values
                tdSr.innerHTML = i;
                tdDescription.innerHTML = x.data().description
                tdDate.innerHTML = x.data().date.toDate().toDateString();
                tdCategory.innerHTML = x.data().category;
                tdAmount.innerHTML = x.data().amount

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdDescription)
                tr.append(tdCategory)
                tr.append(tdAmount)
                tableBody.append(tr)
            })
        } else {
            document.getElementById('mainExpense').innerHTML = `<h1 class="my-5">No Recent Expenses</h1>`
        }

    })

    db.collection('userTransaction').where("userId", "==", userId).where("income", "==", true).orderBy('currentDate', "desc").limit(5).get().then(e => {
        if (e.docs.length) {
            e.forEach(x => {
                j++

                let tableBody = document.getElementById('incomeTableBody')

                //creating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Addnig Values
                tdSr.innerHTML = j;
                tdDescription.innerHTML = x.data().description
                tdDate.innerHTML = x.data().date.toDate().toDateString();
                // console.log(x.data().date.toDate())
                tdCategory.innerHTML = x.data().category;
                tdAmount.innerHTML = x.data().amount

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdDescription)
                tr.append(tdCategory)
                tr.append(tdAmount)

                tableBody.append(tr)
            })
        } else {
            document.getElementById('mainIncome').innerHTML = `<h1 class="my-5">No Recent Incomes</h1>`
        }
    })
}




(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            recentPost()
            render()
            let localData = JSON.parse(localStorage.getItem("FinaceUser"))
            let userName = document.getElementById('userName').innerText = localData.userName

        } else {

            location.href = "../index.html"
        }
    })
}())



//Render Income And Expense
render = () => {

    let income = 0
    let expense = 0
    let localData = JSON.parse(localStorage.getItem("FinaceUser"))
    let userId = localData.userId
    db.collection("userTransaction").where("userId", "==", userId).get().then(e => {
        e.forEach(x => {
            if (x.data().expense) {
                expense += parseInt(x.data().amount);
            } else {
                income += parseInt(x.data().amount)
            }
        })
    }).then(() => {
        setTimeout(() => {
            document.getElementById('loader').hidden = true
            document.getElementById('mainDash').hidden = false
        }, 500)
        document.getElementById('totalExpense').innerHTML = ` PKR ${expense} <i class=" red amountIcon fas fa-arrow-down"></i>   `
        document.getElementById('totalIncome').innerHTML = `PKR ${income} <i class=" green  amountIcon fas fa-arrow-up"></i>    `
        document.getElementById('loader').hidden = true;
        document.getElementById('mainDash').hidden = false;
    })
}
let more = () => {
    location.href = "../transaction/transaction.html"
}
var ctx = document.getElementById('myChart');
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ],
        datasets: [{
            label: '# of Votes',
            data: [12000, 10000, 8000, 5000, 2000, 3000, 10000],
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
        auth.signOut()
        localStorage.clear();
        window.location.href = "../Authentication/index.html";
        console.log("logged Out");
    }
    //Recent POst 

recentPost = () => {
    let localData = JSON.parse(localStorage.getItem("FinaceUser"))
    let userId = localData.userId
    let allTransactionArr = [];
    let incomeArr = [];
    let expenseArr = [];
    db.collection('userTransaction').where("userId", "==", userId).where("expense", "==", true).orderBy('currentDate', "asc").get().then(e => {
        e.forEach(x => {
            console.log(x.data())
        })

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
            location.href = "../Authentication/index.html"
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
                expense += parseInt(x.data().amount)
            } else {
                income += parseInt(x.data().amount)
            }
        })
    }).then(() => {
        document.getElementById('totalExpense').innerHTML = ` PKR ${expense} <i class=" red amountIcon fas fa-arrow-down"></i>   `
        document.getElementById('totalIncome').innerHTML = `PKR ${income} <i class=" green  amountIcon fas fa-arrow-up"></i>    `
        console.log("expense =======>", expense)
    })
}

//Recent Post
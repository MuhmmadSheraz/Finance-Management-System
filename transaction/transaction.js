let hello = () => {
    let uid = JSON.parse(localStorage.getItem('uid'))
    let allUsers = JSON.parse(localStorage.getItem('userinfo'))
    allUsers.filter(x => {
        if (x.id == uid) {

            document.getElementById('userNameTransaction').innerText = x.name;
        }
    })

}
window.onload = hello()
getMonthAndYear()


// LogOut User
let logOut = () => {
    window.location.href = "../Authentication/index.html"
}

// Get MOnth And Year
function getMonthAndYear() {
    const date = new Date()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()
    const monthElement = document.getElementById('monthSelectFilter')
    const YearElement = document.getElementById('yearSelectFilter')
    monthElement.value = currentMonth
    YearElement.value = currentYear
}
let addIncomeData = () => {
    let incomeDate = document.getElementById('incomeDate').value
    let incomeDescription = document.getElementById('incomedescription').value
    let incomeCategory = document.getElementById('incomeCategory').value
    let incomeAmount = document.getElementById('incomeAmount').value
    if (incomeAmount == "" || incomeDate == "" || incomeDescription == "" || incomeCategory == "") {
        return alert("Please Fill All The Fields")
    }
    console.log("hello")
}
let addexpenseData = () => {
    let expenseDate = document.getElementById('expenseDate').value
    let expenseDescription = document.getElementById('expensedescription').value
    let expenseCategory = document.getElementById('expenseCategory').value
    let expenseAmount = document.getElementById('expenseAmount').value
    if (expenseAmount == "" || expenseDate == "" || expenseDescription == "" || expenseCategory == "") {
        return alert("Please Fill All The Fields")
    }
    console.log("hello")
}
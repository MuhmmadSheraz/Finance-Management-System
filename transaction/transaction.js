// LogOut User
let logOut = () => {
    auth.signOut()
    window.location.href = "../Authentication/index.html"
    console.log("logged Out")
    localStorage.clear()
}
renderTransactions = (data = null) => {

        let localData = JSON.parse(localStorage.getItem('FinaceUser'));
        let currentUserId = localData.userId;
        let transactionTableBody = document.getElementById('transactionTableBody');
        transactionTableBody.innerText = '';
        let arr = [];
        let i = 0;
        if (!data) {
            db.collection('userTransaction').where("userId", "==", currentUserId).get().then(e => {

                e.forEach(x => {
                    i++;
                    arr.push(x.data());

                    let tableData;
                    if (x.data().expense) {

                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        transactionTableBody.append(tr)



                        // transactionTableBody.innerHTML += tableData
                    } else {

                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        transactionTableBody.append(tr)


                    }

                })
                localStorage.setItem("userTransactionLocal", JSON.stringify(arr))

            });
        } else {
            //CReating Elements
            let tr = document.createElement('tr')
            let tdSr = document.createElement('td')
            let tdDate = document.createElement('td')
            let tdCategory = document.createElement('td')
            let tdDescription = document.createElement('td')
            let tdAmount = document.createElement('td')

            //Add values
            tdSr.innerHTML = i
            tdDate.innerHTML = x.data().date
            tdCategory.innerHTML = x.data().category
            tdDescription.innerHTML = x.data().description
            tdAmount.innerHTML = `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `

            //Appending Values
            tr.append(tdSr)
            tr.append(tdDate)
            tr.append(tdCategory)
            tr.append(tdDescription)
            tr.append(tdAmount)
            transactionTableBody.append(tr)


        }

    }
    (function() {
        let localData = JSON.parse(localStorage.getItem('FinaceUser'))
        let currentUserId = localData.userId
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(" User Signed I ")
                let localData = JSON.parse(localStorage.getItem("FinaceUser"))
                let userName = document.getElementById('userNameTransaction').innerText = localData.userName

                //getting all cayegories from DB
                db.collection('userCategories').onSnapshot(e => {
                    e.forEach(x => {

                        let allCategories = document.getElementById('incomeCategory');
                        allCategories.options[allCategories.options.length] = new Option(x.data().categoryName, x.data().categoryName);

                        let allCategoriesExpense = document.getElementById('expenseCategory');
                        allCategoriesExpense.options[allCategoriesExpense.options.length] = new Option(x.data().categoryName, x.data().categoryName);

                        let allCategoriesFilter = document.getElementById('categorySelectFilter');
                        allCategoriesFilter.options[allCategoriesFilter.options.length] = new Option(x.data().categoryName, x.data().categoryName);
                    })
                })
                renderTransactions()
            }
            //Show User Expenses and Incomes
            else {
                location.href = "../Authentication/index.html"
            }
        })
    }())




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

//add Income
let addIncomeData = () => {
    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let uid = localData.userId
    let date = document.getElementById('incomeDate').value
    let description = document.getElementById('incomedescription').value
    let category = document.getElementById('incomeCategory').value
    let amount = document.getElementById('incomeAmount').value
    let Cdate = new Date();


    if (!amount || !date || !description || !category) return alert("Please Fill All The Fields")

    db.collection("userTransaction").add({
        currentDate: Cdate,
        income: true,
        expense: false,
        userId: uid,
        amount,
        category,
        description,
        date
    }).then(() => {

        renderTransactions();
        Snackbar.show({ pos: 'top-center', textColor: "#218838", text: 'Income Added', backgroundColor: "#E3E4E7" })
    });
    document.getElementById('incomeDate').value = ""
    document.getElementById('incomedescription').value = ""
    document.getElementById('incomeCategory').value = ""
    document.getElementById('incomeAmount').value = ""



}
let addexpenseData = () => {
    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let uid = localData.userId
    let date = document.getElementById('expenseDate').value
    let description = document.getElementById('expensedescription').value
    let category = document.getElementById('expenseCategory').value
    let amount = document.getElementById('expenseAmount').value
    let Cdate = new Date()

    if (!amount || !date || !description || !category) return alert("Please Fill All The Fields")
    db.collection("userTransaction").add({
        currentDate: Cdate,
        income: false,
        expense: true,
        userId: uid,
        amount,
        category,
        description,
        date
    }).then(() => {
        Snackbar.show({ pos: 'top-center', textColor: "red", text: 'Expnese Added', backgroundColor: "#E3E4E7" })
        renderTransactions();
        date.innerHTML = "";
        description.innerHTML = "";
        category.innerHTML = "";
        amount.innerHTML = "";
    });
    document.getElementById('incomeDate').value = ""
    document.getElementById('incomedescription').value = ""
    document.getElementById('incomeCategory').value = ""
    document.getElementById('incomeAmount').value = ""

}

let addCategoryName = () => {
    let allCategories = document.getElementById('incomeCategory').innerHTML = ''
    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let categoryName = document.getElementById('categoryName1').value;
    db.collection('userCategories').add({
        userId: localData.userId,
        categoryName: categoryName
    })
    Snackbar.show({ pos: 'top-center', textColor: "green", text: 'Category Added', backgroundColor: "#E3E4E7" })
}





renderFilteredTransactions = (data) => {
    let filteredData = data

    let transactionTableBody = document.getElementById('transactionTableBody');
    transactionTableBody.innerText = '';

    let i = 0;
    if (data) {
        filteredData.forEach(x => {
            i++;


            let tableData;
            if (x.expense) {

                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = x.date
                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = `${x.amount} <i class=" red fas fa-arrow-down"></i> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                transactionTableBody.append(tr)



                // transactionTableBody.innerHTML += tableData
            } else if (x.income) {

                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = x.date
                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = `${x.amount} <i class=" green fas fa-arrow-up"></i> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                transactionTableBody.append(tr)


            }
        })


    }

}
onFilter = () => {
        let transactions = JSON.parse(localStorage.getItem('userTransactionLocal'));
        let year_filter = document.getElementById('yearSelectFilter').value;
        let month_filter = document.getElementById('monthSelectFilter').value;
        let category_filter = document.getElementById('categorySelectFilter').value;
        let amount_filter = document.getElementById('amountfilter').value;
        let filtered_data = [];


        if (year_filter && !month_filter && !category_filter && !amount_filter) {
            filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter);
            renderFilteredTransactions(filtered_data);
        }

        if (!year_filter && month_filter && !category_filter && !amount_filter) {
            filtered_data = transactions.filter(data => data.date.slice(5, 7) == month_filter);
            renderFilteredTransactions(filtered_data);
        }

        if (!year_filter && !month_filter && category_filter && !amount_filter) {
            filtered_data = transactions.filter(data => data.category == category_filter);
            renderFilteredTransactions(filtered_data);
        }

        if (!year_filter && !month_filter && !category_filter && amount_filter) {
            filtered_data = transactions.filter(data => data.amount == amount_filter);
            renderFilteredTransactions(filtered_data);
        }

        if (year_filter && month_filter && category_filter && amount_filter) {
            filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.date.slice(5, 7) == month_filter && data.category == category_filter && data.amount == amount_filter);
            renderFilteredTransactions(filtered_data);
        }

        if (year_filter) {

            if (year_filter && month_filter) {

                if (year_filter && month_filter && category_filter) {

                    if (year_filter && month_filter && category_filter && amount_filter) {
                        filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.date.slice(5, 7) == month_filter && data.category == category_filter && data.amount == amount_filter);
                        renderFilteredTransactions(filtered_data);
                    } else {
                        filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.date.slice(5, 7) == month_filter && data.category == category_filter);
                        renderFilteredTransactions(filtered_data);
                    }

                } else if (year_filter && month_filter && amount_filter) {
                    filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.date.slice(5, 7) == month_filter && data.amount == amount_filter);
                    renderFilteredTransactions(filtered_data);
                } else {
                    filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.date.slice(5, 7) == month_filter);
                    renderFilteredTransactions(filtered_data);
                }

            } else if (year_filter && amount_filter) {

                if (year_filter && amount_filter && category_filter) {
                    filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.amount == amount_filter && data.category == category_filter);
                    renderFilteredTransactions(filtered_data);
                } else {
                    filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.amount == amount_filter);
                    renderFilteredTransactions(filtered_data);
                }

            } else if (year_filter && category_filter) {
                filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter && data.category == category_filter);
                renderFilteredTransactions(filtered_data);
            }
            // filtered_data = transactions.filter(data => data.date.slice(0, 4) == year_filter);
            // renderFilteredTransactions(filtered_data);
        } else if (month_filter) {

            if (month_filter && category_filter) {

                if (month_filter && category_filter && amount_filter) {
                    filtered_data = transactions.filter(data => data.date.slice(5, 7) == month_filter && data.category == category_filter && data.amount == amount_filter);
                    renderFilteredTransactions(filtered_data);
                } else {
                    filtered_data = transactions.filter(data => data.date.slice(5, 7) == month_filter && data.category == category_filter);
                    renderFilteredTransactions(filtered_data);
                }

            } else if (month_filter && amount_filter) {
                filtered_data = transactions.filter(data => data.date.slice(5, 7) == month_filter && data.amount == amount_filter);
                renderFilteredTransactions(filtered_data);
            }

        } else if (category_filter) {

            if (category_filter && amount_filter) {
                filtered_data = transactions.filter(data => data.category == category_filter && data.amount == amount_filter);
                renderFilteredTransactions(filtered_data);
            }

        }

        if (!year_filter && !month_filter && !category_filter && !amount_filter) {
            renderFilteredTransactions()
        }
    }
    //Sort By 
sortBy = (type) => {
    let transactionTableBody = document.getElementById('transactionTableBody');
    transactionTableBody.innerText = '';

    console.log("hello")
    let sortedData = JSON.parse(localStorage.getItem('userTransactionLocal'))
    let i = 0;
    sortedData.forEach(x => {
        i++;
        if (type == "expense") {
            if (x.expense == true) {

                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = x.date
                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = `${x.amount} <i class=" red fas fa-arrow-down"></i> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                transactionTableBody.append(tr)
            }
        } else if (type == "income") {
            if (x.income == true) {

                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = x.date
                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = `${x.amount} <i class=" green fas fa-arrow-up"></i> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                transactionTableBody.append(tr)


            }
        }
    })
}

//close modal ON sAve
//Add slip If Mention
//end date Filter
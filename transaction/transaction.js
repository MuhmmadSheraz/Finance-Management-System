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
            db.collection('userTransaction').where("userId", "==", currentUserId).orderBy('date', 'desc').get().then(e => {

                e.forEach(x => {
                    // debugger 

                    i++;
                    let b = x.data()
                    b["transactionId"] = x.id

                    arr.push(b);



                    if (x.data().expense) {


                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')
                            //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = x.data().transImg ?
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="showImg('${x.data().transImg}')">Receipt</span> ` :
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `;
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                            //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
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
                        let removeBtn = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
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
            let removeBtn = document.createElement('td')

            //Add values
            tdSr.innerHTML = i
            tdDate.innerHTML = x.data().date.toDate().toDateString()
            tdCategory.innerHTML = x.data().category
            tdDescription.innerHTML = x.data().description
            tdAmount.innerHTML = `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `
            removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                //Appending Values
            tr.append(tdSr)
            tr.append(tdDate)
            tr.append(tdCategory)
            tr.append(tdDescription)
            tr.append(tdAmount)
            tr.append(removeBtn)
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
                db.collection('userCategories').where("userId", "==", currentUserId).onSnapshot(e => {
                    e.forEach(x => {
                        console.log(x.data())
                        let allCategories = document.getElementById('incomeCategory');
                        allCategories.options[allCategories.options.length] = new Option(x.data().categoryName, x.data().categoryName);

                        let allCategoriesExpense = document.getElementById('expenseCategory');
                        allCategoriesExpense.options[allCategoriesExpense.options.length] = new Option(x.data().categoryName, x.data().categoryName);

                        let allCategoriesFilter = document.getElementById('categorySelectFilter');
                        allCategoriesFilter.options[allCategoriesFilter.options.length] = new Option(x.data().categoryName, x.data().categoryName);
                    })
                })
                renderTransactions()
                setTimeout(() => {
                    document.getElementById('loader').hidden = true
                    document.getElementById('mainTrans').hidden = false
                }, 500)
            }
            //Show User Expenses and Incomes
            else {
                location.href = "../Authentication/index.html"
            }
        })
    }())

//add Income
let addIncomeData = () => {
    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let uid = localData.userId
    let date = document.getElementById('incomeDate').valueAsDate
    let description = document.getElementById('incomedescription').value
    let category = document.getElementById('incomeCategory').value
    let amount = document.getElementById('incomeAmount').value
    let Cdate = new Date();


    if (!date) document.getElementById('incomeDate').style.border = "2px solid red";
    if (!description) document.getElementById('incomedescription').style.border = "2px solid red";
    if (!category) document.getElementById('incomeCategory').style.border = "2px solid red";;
    if (!amount) return document.getElementById('incomeAmount').style.border = "2px solid red";

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
        $('#exampleModalCenter').modal('hide')
        Snackbar.show({ pos: 'top-center', textColor: "#218838", text: 'Income Added', backgroundColor: "#E3E4E7" })
    });
    document.getElementById('incomeDate').value = ""
    document.getElementById('incomedescription').value = ""
    document.getElementById('incomeCategory').value = ""
    document.getElementById('incomeAmount').value = ""
}

// Add Expense 
let addexpenseData = () => {


    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let uid = localData.userId
    let fileUpload = document.getElementById("abc")

    let date = document.getElementById('expenseDate').valueAsDate
    let description = document.getElementById('expensedescription').value
    let category = document.getElementById('expenseCategory').value
    let amount = document.getElementById('expenseAmount').value
    let Cdate = new Date()

    // if (!amount || !date || !description || !category) return alert("Please Fill All The Fields");
    if (!date) document.getElementById('expenseDate').style.border = "2px solid red";
    if (!description) document.getElementById('expensedescription').style.border = "2px solid red";
    if (!category) document.getElementById('expenseCategory').style.border = "2px solid red";;
    if (!amount) return document.getElementById('expenseAmount').style.border = "2px solid red";

    if (fileUpload.value == "") {
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
            document.getElementById('expenseDate').value = "";
            document.getElementById('expensedescription').value = "";
            document.getElementById('expenseCategory').value = "";
            document.getElementById('expenseAmount').value = "";
            document.getElementById('abc').value = "";
            $('#expenseModalBox').modal('hide')
        });
    } else if (fileUpload.value != "") {

        let storageRef = firebase.storage().ref(`photos/${Cdate}`);
        let firstFile = fileUpload.files[0];
        let uploadTask = storageRef.put(firstFile);

        uploadTask
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log("File available at", url)

                // after getting  uploaded image url set data to database
                let newDocRef = db.collection('userTransaction').doc();
                newDocRef.set({
                    currentDate: Cdate,
                    income: false,
                    expense: true,
                    userId: uid,
                    amount,
                    category,
                    description,
                    date,
                    transImg: url
                }).then(() => {
                    Snackbar.show({ pos: 'top-center', textColor: "red", text: 'Expnese Added', backgroundColor: "#E3E4E7" })
                    renderTransactions();
                    document.getElementById('expenseDate').value = "";
                    document.getElementById('expensedescription').value = "";
                    document.getElementById('expenseCategory').value = "";
                    document.getElementById('expenseAmount').value = "";
                    document.getElementById('abc').value = "";
                    $('#expenseModalBox').modal('hide')
                });

            })
    }






}

let addCategoryName = () => {
    let allCategoriesFilter = document.getElementById('categorySelectFilter').innerHTML = "";
    let allCategories = document.getElementById('incomeCategory').innerHTML = ''
    let allCategoriesExpense = document.getElementById('expenseCategory').innerHTML = ''
    let localData = JSON.parse(localStorage.getItem('FinaceUser'))
    let categoryName = document.getElementById('categoryName1').value;
    // let userId = localData.userId;
    db.collection('userCategories').add({
        categoryName: categoryName,
        userId: localData.userId
    }).then(() => {})
    $('#categoryModal').modal('hide')
    Snackbar.show({ pos: 'top-center', textColor: "green", text: 'Category Added', backgroundColor: "#E3E4E7" })
    document.getElementById('categoryName1').innerHTML = "";
}

//renderFilteredTransaction
renderFilteredTransactions = (data) => {
    let filteredData = data

    let transactionTableBody = document.getElementById('transactionTableBody');
    transactionTableBody.innerText = '';

    let i = 0;
    if (data) {
        filteredData.forEach((x, i) => {
            // i++;
            let tableData;
            if (x.expense) {
                let a = x.date.valueOf().seconds;
                let date = new Date(a * 1000);
                // if (x.transImg) {
                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')
                let removeBtn = document.createElement('td')
                    //Add values
                tdSr.innerHTML = i + 1;
                tdDate.innerHTML = date.toDateString();
                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = x.transImg ?
                    `${x.amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="showImg('${x.transImg}')">Receipt</span> ` :
                    `${x.amount} <i class=" red fas fa-arrow-down"></i> `;
                removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.transactionId}')">Remove <i class="far fa-trash-alt"></i></button> `
                    //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                tr.append(removeBtn)
                transactionTableBody.append(tr)


            } else if (x.income) {
                let a = x.date.valueOf().seconds;
                let date = new Date(a * 1000);
                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')
                let removeBtn = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = date.toDateString()

                tdCategory.innerHTML = x.category
                tdDescription.innerHTML = x.description
                tdAmount.innerHTML = `${x.amount} <i class=" green fas fa-arrow-up"></i> `
                removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.transactionId}')">Remove <i class="far fa-trash-alt"></i></button> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                tr.append(removeBtn)
                transactionTableBody.append(tr)
            }
        })


    }

}
onFilter = () => {

        let transactions = JSON.parse(localStorage.getItem('userTransactionLocal'));
        // console.log(transactions)
        let category_filter = document.getElementById('categorySelectFilter').value;
        let amount_filter = document.getElementById('amountfilter').value;
        let filtered_data = [];

        if (category_filter) {
            if (amount_filter) {
                filtered_data = transactions.filter(data => data.category == category_filter && data.amount == amount_filter);
                renderFilteredTransactions(filtered_data);
            } else {
                filtered_data = transactions.filter(data => data.category == category_filter);
                renderFilteredTransactions(filtered_data);
            }
        }

        if (amount_filter) {
            if (category_filter) {
                filtered_data = transactions.filter(data => data.amount == amount_filter && data.category == category_filter);
                renderFilteredTransactions(filtered_data);
            } else {
                filtered_data = transactions.filter(data => data.amount == amount_filter);
                renderFilteredTransactions(filtered_data);
            }
        }



    }
    //Sort By 
sortBy = (type) => {
    let localData = JSON.parse(localStorage.getItem('FinaceUser'));
    let currentUserId = localData.userId;
    let transactionTableBody = document.getElementById('transactionTableBody');
    transactionTableBody.innerText = '';
    db.collection('userTransaction').where("userId", "==", currentUserId).orderBy("date", "desc").get().then(e => {

        let i = 0;
        e.forEach(x => {
            //ghjkl
            i++;
            if (type == "expense") {

                if (x.data().expense) {
                    //CReating Elements
                    let tr = document.createElement('tr')
                    let tdSr = document.createElement('td')
                    let tdDate = document.createElement('td')
                    let tdCategory = document.createElement('td')
                    let tdDescription = document.createElement('td')
                    let tdAmount = document.createElement('td')
                    let removeBtn = document.createElement('td')
                        //Add values
                    tdSr.innerHTML = i
                    tdDate.innerHTML = x.data().date.toDate().toDateString()
                    tdCategory.innerHTML = x.data().category
                    tdDescription.innerHTML = x.data().description
                    tdAmount.innerHTML = x.data().transImg ?
                        `${x.data().amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="showImg('${x.data().transImg}')">Receipt</span> ` :
                        `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `;
                    removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                        //Appending Values
                    tr.append(tdSr)
                    tr.append(tdDate)
                    tr.append(tdCategory)
                    tr.append(tdDescription)
                    tr.append(tdAmount)
                    tr.append(removeBtn)
                    transactionTableBody.append(tr)

                }

            } else if (type == "income") {


                //CReating Elements
                let tr = document.createElement('tr')
                let tdSr = document.createElement('td')
                let tdDate = document.createElement('td')
                let tdCategory = document.createElement('td')
                let tdDescription = document.createElement('td')
                let tdAmount = document.createElement('td')
                let removeBtn = document.createElement('td')

                //Add values
                tdSr.innerHTML = i
                tdDate.innerHTML = x.data().date.toDate().toDateString()
                tdCategory.innerHTML = x.data().category
                tdDescription.innerHTML = x.data().description
                tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `
                removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `

                //Appending Values
                tr.append(tdSr)
                tr.append(tdDate)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                tr.append(removeBtn)
                transactionTableBody.append(tr)



            }
        })
    })
}

let byDate = () => {
    // debugger

    let localData = JSON.parse(localStorage.getItem('FinaceUser'));
    let currentUserId = localData.userId;
    let dateFrom = document.getElementById('dateFrom').valueAsDate
    let dateTo = document.getElementById('dateTo').valueAsDate

    if (dateTo && dateFrom) {
        let transactionTableBody = document.getElementById('transactionTableBody');
        transactionTableBody.innerText = '';
        let i = 0;
        db.collection('userTransaction')
            .where('userId', "==", currentUserId)
            .where("date", ">=", dateFrom)
            .where("date", "<=", dateTo)
            .get().then(e => {
                e.forEach(x => {
                    i++;
                    if (x.data().expense == true) {
                        // if (x.data().transImg) {
                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')
                            //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = x.data().transImg ?
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="
                            ('${x.id}')">Receipt</span>` :
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `;
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                            //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)

                    } else {

                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)


                    }
                })
            })
    }

    //Single Querry
    if (dateFrom) {
        let transactionTableBody = document.getElementById('transactionTableBody');
        transactionTableBody.innerText = '';

        let i = 0;
        db.collection('userTransaction')
            .where('userId', "==", currentUserId)
            .where("date", ">=", dateFrom)
            .get().then(e => {
                e.forEach(x => {
                    i++;
                    if (x.data().expense == true) {
                        // if (x.data().transImg) {
                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')
                            //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = x.data().transImg ?
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="showImg('${x.data().transImg}')">Receipt</span>` :
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `;
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                            //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)

                    } else {

                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)


                    }
                })
            })
    }

    //Single Querry
    if (dateTo) {
        let transactionTableBody = document.getElementById('transactionTableBody');
        transactionTableBody.innerText = '';

        let i = 0;
        db.collection('userTransaction')
            .where('userId', "==", currentUserId)
            .where("date", "<=", dateTo)
            .get().then(e => {
                e.forEach(x => {
                    i++;
                    if (x.data().expense == true) {
                        // if (x.data().transImg) {
                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')
                            //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = x.data().transImg ?
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> <span class="badge badge-pill badge-light" onclick="showImg('${x.data().transImg}')">Receipt</span>` :
                            `${x.data().amount} <i class=" red fas fa-arrow-down"></i> `;
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `
                            //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)

                    } else {

                        //CReating Elements
                        let tr = document.createElement('tr')
                        let tdSr = document.createElement('td')
                        let tdDate = document.createElement('td')
                        let tdCategory = document.createElement('td')
                        let tdDescription = document.createElement('td')
                        let tdAmount = document.createElement('td')
                        let removeBtn = document.createElement('td')

                        //Add values
                        tdSr.innerHTML = i
                        tdDate.innerHTML = x.data().date.toDate().toDateString()
                        tdCategory.innerHTML = x.data().category
                        tdDescription.innerHTML = x.data().description
                        tdAmount.innerHTML = `${x.data().amount} <i class=" green fas fa-arrow-up"></i> `
                        removeBtn.innerHTML = `<button class="btn btn-danger" onclick="removeTransaction('${x.id}')">Remove <i class="far fa-trash-alt"></i></button> `

                        //Appending Values
                        tr.append(tdSr)
                        tr.append(tdDate)
                        tr.append(tdCategory)
                        tr.append(tdDescription)
                        tr.append(tdAmount)
                        tr.append(removeBtn)
                        transactionTableBody.append(tr)


                    }
                })
            })
    }
}

//Add slip If Mention
removeTransaction = (id) => {

    db.collection('userTransaction').doc(id).delete();
    setTimeout(() => {
        renderTransactions()
    }, 500)

}
showImg = (id) => {
    console.log(id)
    window.open(id)
}

change = (a) => {
    if (a.value || a.valueAsDate) {
        a.style.border = "1px solid #ced4da";
    } else {
        a.style.border = "2px solid red";
    }
}
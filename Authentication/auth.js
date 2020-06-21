function signUp() {
    document.getElementById('singUp').hidden = false
    document.getElementById('signIn').hidden = true
}
function signIn() {
    document.getElementById('singUp').hidden = true
    document.getElementById('signIn').hidden = false
}


// globlal Varibales
let updateduserName = '';
let updateEmail = '';
let updatePassword = '';
let updateConfirmPassword = '';
let updatedgender = '';
let id = Math.floor(Math.random() * 100);

// IF USER SIGNED UP
function signUpUser() {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    let userName = document.getElementById('userName').value
    let email = document.getElementById("userEmail").value
    let password = document.getElementById("password").value
    let confirmpassword = document.getElementById("confirmpassword").value
    // Condition For Validation

    if (userName == "" || email == "" || password == "" || confirmpassword == "") {

        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill All Field ',

        })

    }
    // UserName

    if (userName.length < 3) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'UserName Is Not Correct',

        })
    }
    else {
        updateduserName = userName
        console.log(updateduserName)

    }

    // // Email

    if (userName.length < email.indexOf('@' <= 0) || email.charAt(email.length - 4) != '.' || email.charAt(1) == '@' || email.charAt(2) == '@' || email.charAt(3) == '@') {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Use Correct Form Of  Email',

        })
    } else {
        updateEmail = email
        console.log(updateEmail)


    }

    // PASSWORD

    if (!password.match(passw) || password == "") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'password Should contain UpperCAse LowerCase And Symbols With Number',

        })
    } else {
        updatePassword = password
        console.log(updatePassword)

    }
    // CONFIRM PASSW0RD
    if (!confirmpassword == password) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'password Are Not Same',

        })
    }
    else {
        updateConfirmPassword = confirmpassword

    }


    // lOCAL sTORAGWE wOEDK

    let myArr = []

    let SignUparr = JSON.parse(localStorage.getItem('userinfo'))

    if (SignUparr == null) {
        let obj = {
            name: updateduserName,
            id,
            email: updateEmail,
            password1: updatePassword,
        }
        myArr.push(obj)
        let SignUparr = localStorage.setItem('userinfo', JSON.stringify(myArr))
        localStorage.setItem('uid', JSON.stringify(id))

    }
    else {
        for (let i = 0; i < SignUparr.length; i++) {
            if (updateEmail == SignUparr[i].email) {
                return Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'Email Already Exist',
                })
            }
        }
        let obj2 = {
            name: updateduserName,
            id,
            email: updateEmail,
            password1: updatePassword,
        }
        SignUparr.push(obj2)
        localStorage.setItem('userinfo', JSON.stringify(SignUparr))
        localStorage.setItem('uid', JSON.stringify(id))
        Swal.fire({
            icon: 'success',
            title: 'SignedIn Successfully',

        })
        setTimeout(() => {
            window.location.href = "../transaction/transaction.html"
        }, 500)

    }
}



// IF USER SIGNED IN
let signInUser = () => {

    let signEmail = document.getElementById('iNuserEmail').value
    let signPassword = document.getElementById('iNpassword').value
    let gettingLocalStorage = JSON.parse(localStorage.getItem('userinfo'))

    if (signPassword == "" || signEmail == "") {
        return (Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill All The Fields!',
            footer: '<a href>Why do I have this issue?</a>'
        }))
    }
    else if (signPassword && signEmail) {
        if (signEmail.charAt(signEmail.length - 4) != '.' || signEmail.charAt(1) == '@' || signEmail.charAt(2) == '@' || signEmail.charAt(3) == '@') {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Use Correct Form Of  Email',

            })
        } else {
            let a = gettingLocalStorage.filter(x => {
                if (signEmail == x.email && signPassword == x.password1) {
                    let uid = x.id
                    localStorage.setItem('uid', JSON.stringify(uid))
                    setTimeout(() => {
                        window.location.href = "../transaction/transaction.html"
                    }, 1000)
                }
            })
            // for (let i = 0; i < gettingLocalStorage.length; i++) {

            //     if (signEmail == gettingLocalStorage[i].email && signPassword == gettingLocalStorage[i].password1) {
            //         let uid = gettingLocalStorage[i].id
            //         localStorage.setItem('uid', JSON.stringify(uid))
            //         setTimeout(() => {
            //             window.location.href = "../transaction/transaction.html"
            //         }, 1000)
            //     }


            // }



        }

    }

}


function signUp() {
    document.getElementById('singUp').hidden = false
    document.getElementById('signIn').hidden = true
}

function signIn() {
    document.getElementById('singUp').hidden = true
    document.getElementById('signIn').hidden = false
}
// Helkoooooooooooooooooooooooooooooooooooooooooooooooooo

(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html"
            }, 1500)

            document.getElementById('loader').hidden = false
            document.getElementById('main').hidden = true

        } else {
            document.getElementById('loader').hidden = true
            document.getElementById('main').hidden = false

            console.log("NO user")


        }
    });

}())

// When User Signed Up
let signUpUser = () => {

    let userName = document.getElementById('userName').value
    let email = document.getElementById('userEmail').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmpassword').value
    let userID;
    if (email, password && password == confirmPassword) {
        auth.createUserWithEmailAndPassword(email, password).then(e => {
            userID = e.user.uid;
            db.collection('user').doc(userID).set({
                userId: userID,
                userEmail: email,
                userName: userName,
            }).then(() => {
                let obj = {
                    userId: userID,
                    userEmail: email,
                    userName: userName,
                }
                localStorage.setItem("FinaceUser", JSON.stringify(obj))
                console.log(obj)
                console.log("Signed Up Successfully")
            })
        }).catch(err => {
            if (err.message == "The email address is already in use by another account.") {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Already Used',

                })
            }
        })
    } else if (userEmail == "" || userName == "" || password == "" || confirmPassword == "") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',

            text: 'Please Fill All The Fields',

        })
    } else if (email.length < email.indexOf('@' <= 0) || email.charAt(email.length - 4) != '.' || email.charAt(1) == '@' || email.charAt(2) == '@' || email.charAt(3) == '@') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Use Correct Form Of  Email',

        })
    } else if (!password.match(confirmPassword) || password == "") {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'password Should contain UpperCAse LowerCase And Symbols With Number',

        })
    }
    // CONFIRM PASSW0RD
    else if (confirmPassword !== password) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'password Are Not Same',

        })
    }
}

// When User Logged In
let signInUser = () => {

    let email = document.getElementById('iNuserEmail').value
    let password = document.getElementById('iNpassword').value
    let userId;
    auth.signInWithEmailAndPassword(email, password).then((e) => {
            userId = e.user.uid
            console.log(email, password)
            db.collection('user').doc(userId).get().then(e => {
                let currentUser = e.data()
                let obj = {
                    userId: currentUser.userId,
                    userEmail: currentUser.userEmail,
                    userName: currentUser.userName,
                }
                localStorage.setItem("FinaceUser", JSON.stringify(obj))
            })

            document.getElementById('loader').hidden = true
        })
        .catch(e => {
            if (e.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No User Found On This Credits',

                })
            }


        })

}
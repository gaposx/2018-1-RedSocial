const addUserBtnClicked = () => {
    const usersRef = dbRef.child('users');
    const addUserInputsUI = document.getElementsByClassName("user-input");
    // this object will hold the new user information
    let newUser = {};
    // loop through View to get the data for the model 
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
    }
    usersRef.push(newUser, function () {
        console.log("data has been inserted");
    })
}

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked);


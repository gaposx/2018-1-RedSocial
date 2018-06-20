let dbRef;

const fetchJSON = (url, callback) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((err) => console.log(err));
};

fetchJSON('js/firebase.json', (firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
    dbRef = firebase.database().ref();

    const usersRef = dbRef.child('users');
    const userListUI = document.getElementById("userList");

    usersRef.on("child_added", snap => {
        let user = snap.val();
        let li = document.createElement("li");
        li.innerHTML = user.name;
        li.setAttribute("child-key", snap.key);
        li.addEventListener("click", userClicked)
        userListUI.append(li);
    });
});

const userClicked = e => {
    var userID = e.target.getAttribute("child-key");

    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""

    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val()
        userDetailUI.append($p);
    });

}



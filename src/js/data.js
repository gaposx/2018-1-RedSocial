posts = {
    addPost: () => {

    },
    removePost: () => {

    },
    updatePost: () => {

    },
    deletePost: () => {

    },

}


let dbRef;

const fetchJSON = (url, callback) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((err) => console.log(err));
};

//http://softauthor.com/learn-to-build-firebase-crud-app-with-javascript-part01-reading-data/
fetchJSON('/data/firebase.json', (firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
    dbRef = firebase.database().ref();

    const postsRef = dbRef.child('posts');
    const postsListUI = document.getElementById("postsList");

    postsRef.on("child_added", snap => {
        for (let property in snap.val()) {
            let li = document.createElement("li");
            li.innerHTML = snap.val()[property].text + '(likes: ' +  snap.val()[property].likes + ')';
            li.setAttribute("child-key", property);
            // li.addEventListener("click", postClicked)
            postsListUI.append(li);
        }
        
    });
});

//http://softauthor.com/firebase-crud-javascript-web-tutorial-part-2-create-update-delete/
const postClicked = e => {
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



window.user = null;

window.onload = function () {
    var config = {
        apiKey: "AIzaSyCjxtAm1i4s6v38hXEzB1zOGGVd_MLY9BI",
        authDomain: "redsocial-798a2.firebaseapp.com",
        databaseURL: "https://redsocial-798a2.firebaseio.com",
        projectId: "redsocial-798a2",
        storageBucket: "",
        messagingSenderId: "822762995380"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;

            window.user = user;
            console.log("User from github/firebase > " + JSON.stringify(user));

            createUser(user);

            changeUIToOnlineMode();
        } else {
            console.log("User not signed in...");
            changeUIToOfflineMode();
        }
    });

    $('a[data-toggle="pill"]').on('shown.bs.tab', e => {
        if (e.target.id === 'v-pills-logout-tab') {
            logout();
        } else if (e.target.id === 'v-pills-members-tab') {

            console.log('members');
            const membersSpace = document.getElementById('membersSpace');
            // TODO: usar sólo nuevos de Firebase
            membersSpace.innerHTML = "";
            
            getUsers((members) => { //Callback for new messages
                const membersNodes = document.createElement("div");
                membersNodes.className = 'row';
                membersNodes.innerHTML = `
                    <div class="col-1"><img class="img-fluid img-rounded" src=${members.val().avatar}/></div>
                    <div class="col-2"><p>${members.val().name}</p></div>
                    <div class="col-2"><input type="button" id="${members.val().id}" value="Seguir"></div>`;

                membersSpace.appendChild(membersNodes);
            });
            
        }
    });

    //Setup data listeners

    startListeningNewMessages((newMessage) => { //Callback for new messages
        const availableHeight = messageSpace.offsetHeight - 200;
        const availableWidth = messageSpace.offsetWidth - 200;

        console.log("New message > " + newMessage.message);
        const newMessageNode = document.createElement("div");
        newMessageNode.id = `message_${newMessage.creationTime}`;
        newMessageNode.className = `message`;
        newMessageNode.innerHTML = `
    <div class="card border-info mb-3" style="max-width: 18rem;">
      <div class="card-header">
        ${newMessage.creatorName}
      </div>
      <div class="row">
        <div class="col-3 avatar">
          <img class="img-fluid img-rounded" src=${newMessage.creatorAvatar}/>
        </div>
        <div class="card-body text-info col-9">
          <p class="card-text">${newMessage.message}</p>
        </div>
      </div>
    </div>
    `;

        newMessageNode.style.top = availableHeight * Math.random();
        newMessageNode.style.left = availableWidth * Math.random();

        messageSpace.appendChild(newMessageNode);
    });

    startAnimationLoop();
};

const logout = () => {
    // TODO: Log-out
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });

}

function login() {
    const provider = new firebase.auth.GithubAuthProvider();
    //$('#myTab a[href="#profile"]').tab('show')
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        changeUIToOnlineMode();
    }).catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;

        console.error("Login error > " + errorMessage);
        //TODO: implementar login error en interfaz
    });
}

function changeUIToOfflineMode() {
    $("#v-pills-home-tab").hide();
    $("#v-pills-members-tab").hide();
    $("#v-pills-friends-tab").hide();
    $("#v-pills-logout-tab").hide();
    $("#v-pills-logout-tab").hide();
    $("#v-pills-login-tab").tab('show');
}

function changeUIToOnlineMode() {
    $("#v-pills-home-tab").show();
    $("#v-pills-members-tab").show();
    $("#v-pills-friends-tab").show();
    $("#v-pills-logout-tab").show();
    $("#v-pills-login-tab").hide();
    $("#v-pills-home-tab").tab('show');
}

//Setup animation loop
function startAnimationLoop() {
    setInterval(() => {
        const messages = Object.values(document.getElementsByClassName('message'));

        messages.forEach(message => {
            if (!message.style.opacity) {
                message.style.opacity = 1;
            }
            const newOpacity = message.style.opacity - 0.001;
            message.style.opacity = newOpacity > 0 ? newOpacity : 0;

            if (message.scale) {
                message.scale = message.scale - 0.001;
                if (message.scale < 0) {
                    message.scale = 0;
                }
                message.style.transform = `scale(${message.scale},${message.scale})`;
            } else {
                message.scale = 1;
            }
        });
    }, 20);
}
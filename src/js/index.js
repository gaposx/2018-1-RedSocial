window.user = null;

window.onload = function() {
  var config = {
    apiKey: "AIzaSyCjxtAm1i4s6v38hXEzB1zOGGVd_MLY9BI",
    authDomain: "redsocial-798a2.firebaseapp.com",
    databaseURL: "https://redsocial-798a2.firebaseio.com",
    projectId: "redsocial-798a2",
    storageBucket: "",
    messagingSenderId: "822762995380"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
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

      changeUIToOnlineMode();
    } else {
      console.log("User not signed in...");
      changeUIToOfflineMode();
    }
  });

    

      /*TODO: Log-out
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      */
}

function login(){
  const provider = new firebase.auth.GithubAuthProvider();
    //$('#myTab a[href="#profile"]').tab('show')
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user; 
      changeUIToOnlineMode();
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      console.error("Login error > "+errorMessage);
      //TODO: implementar login error en interfaz
    });
}

function changeUIToOfflineMode(){
  $("#v-pills-home-tab").hide();
  $("#v-pills-friends-tab").hide();
  $("#v-pills-logout-tab").hide();
  $("#v-pills-logout-tab").show();
  $("#v-pills-login-tab").tab('show');
}

function changeUIToOnlineMode(){
  $("#v-pills-home-tab").show();
  $("#v-pills-friends-tab").show();
  $("#v-pills-logout-tab").show();
  $("#v-pills-login-tab").hide();
  $("#v-pills-home-tab").tab('show');
}
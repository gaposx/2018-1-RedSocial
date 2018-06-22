
function sendMessage(event) {
    if (!event) {
        event = window.event;
    }
    event.preventDefault(); // sometimes useful

    // Enter is pressed
    if (event.keyCode == 13) {
        const database = firebase.database();

        const newMessage = {
            creationTime: firebase.database.ServerValue.TIMESTAMP,
            creator: window.user.uid,
            message: messageTextArea.value,
            creatorAvatar: window.user.photoURL,
            creatorName: user.displayName
        };
        const newMessageKey = database.ref().child('messages').push().key;
        database.ref(`/messages/${newMessageKey}`).update(newMessage);

        //Clear message box
        messageTextArea.value = "";
    }
}

function startListeningNewMessages(callback) {
    firebase.database().ref('/.info/serverTimeOffset')
        .once('value')
        .then((data) => {
            const nowTimestamp = data.val() + Date.now(); //Time limit to ignore old messages
            var starCountRef = firebase.database().ref('messages/');
            starCountRef.on('child_added', function (newMessage) {
                if (newMessage.val().creationTime > nowTimestamp)
                    callback(newMessage.val());
            });
        }, (err) => {
            console.error("Error while setting up message listener > " + err);
        });
}

const createUser = (user) => {
    const database = firebase.database();

    const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.emailVerified,
        avatar: user.photoURL,
    };

    const newUserKey = user.uid;
    database.ref(`/users/${newUserKey}`).update(newUser);
}

const createFriendship = (friendId) => {
    const database = firebase.database();

    const newFriendship = {
        friends: [friendId]
    };

    const newFriendshipKey = user.uid;
    database.ref(`/friendship/${newFriendshipKey}`).update(newFriendship);
}

const getUsers = (callback) => {
    const userRef = firebase.database().ref().child('users/');
    userRef.on("child_added", snap => {
        callback(snap);
      });
}

const getMembers = (callback) => {
    const friendshipRef = firebase.database().ref().child(`friendship/${userId}`);
    friendshipRef.on("child_added", snap => {
        callback(snap);
    });
}

const getFriendship = (userId, callback) => {
    const friendshipRef = firebase.database().ref().child(`friendship/${userId}`);
    friendshipRef.on("value", snap => {
        callback(snap);
    });
}
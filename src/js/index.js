const addPostBtnUI = document.getElementById("add-post-btn");

const addPostBtnClicked = () => {
    const postsRef = dbRef.child('posts/gaposx');
    const addPostInputsUI = document.getElementsByClassName("post-input");
    // this object will hold the new user information
    
    let newPost = {likes:0, edited:0};
    // loop through View to get the data for the model 
    for (let element of addPostInputsUI) {
        let key = element.getAttribute('data-key');
        let value = element.value;
        newPost[key] = value;
    }
    postsRef.push(newPost, function () {
        console.log("data has been inserted");
    })
}

addPostBtnUI.addEventListener("click", addPostBtnClicked);


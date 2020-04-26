const input = document.getElementById("share-input");
const button = document.getElementById("share-submit");
const shares = document.getElementById("shares");

//WHEN THE PAGE FIRST LOADS

//WHEN THE USER SUBMITS  A NEW SUBMISSION

window.addEventListener("DOMContentLoaded", getAllShares);

button.addEventListener("click", handleSubmit);

function handleSubmit() {
    // get the text from the input
    const shareText = input.value;
    // clear the user input after getting the text
    input.value = "";
    // send it to the ser using axios
    axios.post("/share-submit", { shareText: shareText }).then(getAllShares);
}

function getAllShares() {
    
    //request all data from server
    axios.get("/all-submissions").then(res => {
        const shareList = res.data;
        shares.innerHTML = "";
        
        for(let i = 0; i < shareList.length; i++){

            const share = '<p class="share">' + shareList[i].entry + '<br>' + '<br>'+ "—————————————–—————————————————————————————--"+ '</p>'  ;
            shares.innerHTML += share;
            //create a new html element for each item on the list
            //give it a class
            // add it to the div where we keep all submissions
        }
    })
}


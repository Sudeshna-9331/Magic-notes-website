console.log("welcome to notes app");
showNotes()
//If user adds a note add it to the local storage


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //Updating notes

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);   //Array of objects.

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    //console.log(notesObj);
    showNotes()

})


//Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = ""
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-4 card" style="width: 18rem;">

            <div class="card-body">
                <h6>Note ${index + 1}</h6>
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`

    });

    let NotesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        NotesElem.innerHTML = html;
    }
    else {
        NotesElem.innerHTML = `Nothing to show....Please add a note`;

    }

}


//Function to delete node

function deleteNote(index) {
    //console.log("I am deleting", index);


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()


}



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    console.log("Input event fired!")
    let inputval = search.value.toLowerCase();
    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        //console.log(cardTxt)

        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
const addForm = document.querySelector(".add-input");
const list = document.querySelector(".list-group");
const search = document.querySelector(".custom-input");
const noItemsMessage = document.querySelector(".no-items-message");

const generateTemplate = todo => {
    const listItem = document.createElement("li");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <span>${todo}</span>
        <i class="far fa-trash-alt delet"></i>
    `;
    list.insertBefore(listItem, list.firstChild); 
};

addForm.addEventListener("submit", e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (todo.length) {
        generateTemplate(todo);
        addForm.reset();
        saveData();
        updateNoItemsMessage();
    }
});


list.addEventListener("click", e => {
    if (e.target.classList.contains("delet")) {
        e.target.parentElement.remove();
        updateNoItemsMessage(); // Call the function after removing an item
    } else if (e.target.tagName ==="SPAN") {
        e.target.classList.toggle("completed");

        const completedItems = list.querySelectorAll(".completed");
        const notCompletedItems = list.querySelectorAll(":not(.completed)");
            
        completedItems.forEach(item => list.appendChild(item.parentNode));
        notCompletedItems.forEach(item => list.appendChild(item.parentNode));
    }
    saveData();
});

const updateNoItemsMessage = () => {
const listItems = list.querySelectorAll(".list-item");
    
    if (listItems.length === 0) {
        noItemsMessage.style.display = "block";
        search.style.display = "none";
    } else {
        noItemsMessage.style.display = "none";
        search.style.display = "block";
    }
};

const filterTodos = term => {
    const listItems = Array.from(list.children);
    
    listItems.forEach(item => {
        const todoText = item.querySelector("span").textContent.toLowerCase();
        if (todoText.includes(term)) {
            item.classList.remove("hidden"); 
        } else {
            item.classList.add("hidden"); 
        }
    });

     
};

search.addEventListener("keyup", e => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);

    if (term === "") {
        Array.from(list.children).forEach(item => {
            item.classList.remove("hidden");
        });
    }
});

function updateClock() {
    let today = new Date();
    let time = today.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: false });
    let hours = today.getHours();
    let dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = dayOfWeek + ", <br>" + day + " " + months[month] + " " + year;
    document.getElementById("greeting").innerHTML = displayGreeting(hours);

    requestAnimationFrame(updateClock); 
}

function displayGreeting(hours) {
  if (hours < 11) {
    return "Good morning";
  } else if (hours > 17) {
    return "Good evening";
  } else {
    return "Good afternoon";
  }
}

const body = document.body;
const currentTime = new Date().getHours();

function init_auto(){
    if ((currentTime > 23) || (currentTime < 4)){
        body.classList.add("midnight");
    }
    else if(currentTime < 6){
        body.classList.add("dawn");
    }
    else if(currentTime < 9){
        body.classList.add("morning");
    }
    else if(currentTime < 17){
        body.classList.add("noon");
    }
    else if(currentTime < 18){
        body.classList.add("afternoon");
    }
    else if(currentTime < 19){
        body.classList.add("sunset");
    }
    else if(currentTime < 23){
        body.classList.add("evening");
    }
    else{
        body.classList.add("midnight");
    }
}
init_auto();
updateClock();

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showTask() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        list.innerHTML = storedData; 
        updateNoItemsMessage();
    }
}
showTask();

let alerted = localStorage.getItem('alerted') || '';
if (alerted != 'yes') {
 alert("Better in fullscreen");
 localStorage.setItem('alerted','yes');
}

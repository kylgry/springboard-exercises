
function addTask(){
    taskText = document.getElementById("inputTask").value;
    taskIndex.push(taskText);
    localStorage.setItem("tasks",JSON.stringify(taskIndex));
    document.getElementById("inputTask").value = "";
    displayTask(taskText);
}

function displayTask(taskText){
    newTask = document.createElement("p");
    newTask.innerHTML = taskText;
   
    // add checkbox
    check = document.createElement("input");
    check.type = "checkbox";
    check.addEventListener("change", completeTask);
    newTask.prepend(check);

    // add delete button
    btnDel = document.createElement("button");
    btnDel.innerText = "x";
    btnDel.addEventListener("click",removeTask);
    btnDel.className = "x";
    newTask.append(btnDel);

    // add full element
    document.querySelector("#tasks").append(newTask);
}

function completeTask(item) {
    task = item.target;
    if (task.checked) {
        console.log("complete");
        task.parentElement.className = "complete";
    }
    else {
        console.log("not complete");
        task.parentElement.className = "";
    }
}

function removeTask(item) {
    task = item.target;
    taskIndex.splice(task.id,1);
    task.parentElement.remove();
    localStorage.setItem("tasks",JSON.stringify(taskIndex));
}

function loadTasks() {
    taskIndex = JSON.parse(localStorage.getItem("tasks"));
    if (taskIndex == null) {
        taskIndex = [];
    }
    for (task of taskIndex){
        displayTask(task);
    }
    for (let i = 0; i < taskIndex.length; i++){
        document.querySelectorAll("#tasks p")[i].id = i;
    }
}

loadTasks();
document.getElementById("addTask").addEventListener("click", addTask);
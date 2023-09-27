let addTaskBtn = document.querySelector(".add-task-btn");
let form = document.querySelector(".form");
let okBtn = document.querySelector(".ok-btn");

let sortBtn = document.querySelector(".sort-btn");
let sortMenu = document.querySelector(".sort-menu");
let sortCompleted = document.querySelector("#sort-completed");
let sortPriority = document.querySelector("#sort-priority");

let datePar = document.querySelector("h3");
let list = document.querySelector(".list");

let arrayTasks = [];

addTaskBtn.addEventListener("click", () => {form.style.display = "block"});

okBtn.addEventListener("click", preparationForCreate);
document.addEventListener("keydown", (e) => {if (e.key === "Enter") {preparationForCreate()}});
sortCompleted.addEventListener("click", sort);
sortPriority.addEventListener("click", sort);
sortBtn.addEventListener("click", showSortMenu);

let arrayParams;

(function getDate () {
    let day = new Date();
    let dayWeek;
    let month;
    let today;

    switch (day.getDay()) {
        case 1 :
            dayWeek = "Понеділок";
            break;
        case 2 :
            dayWeek = "Вівторок";
            break;
        case 3 :
            dayWeek = "Середа";
            break;
        case 4 :
            dayWeek = "Четвер";
            break;
        case 5 :
            dayWeek = "П'ятниця";
            break;
        case 6 :
            dayWeek = "Субота";
            break;
        case 7 :
            dayWeek = "Неділя";
            break;
    }

    switch (day.getMonth()) {
        case 1 :
            month = "січня";
            break;
        case 2 :
            month = "лютого";
            break;
        case 3 :
            month = "березня";
            break;
        case 4 :
            month = "квітня";
            break;
        case 5 :
            month = "травня";
            break;
        case 6 :
            month = "червня";
            break;
        case 7 :
            month = "липня";
            break;
        case 8 :
            month = "серпня";
            break;
        case 9 :
            month = "вересня";
            break;
        case 10 :
            month = "жовтня";
            break;
        case 11 :
            month = "листопада";
            break;
        case 12 :
            month = "грудня";
            break;
    }

    today = `${dayWeek}, ${day.getDate()} ${month} ${day.getHours()}:${day.getMinutes()}` ;
    datePar.innerHTML = today;
}());

function preparationForCreate () {
    let text = form.querySelector(".task-name").value;

    let date = form.querySelector(".date").value;
    let time = form.querySelector(".time").value;
    let category = form.querySelector(".category").value;
    let priority = form.querySelector(".priority").value;

    arrayParams = [text, date, time, category, priority];

    if (text) {
        let task = new Task(arrayParams);
        task.createIn(list);
        arrayTasks.push(task);

        form.querySelector(".task-name").value = "";
        form.querySelector(".date").value = "";
        form.querySelector(".time").value = "";
        form.querySelector(".category").value = "";
        form.querySelector(".priority").value = "";

        form.style.display = "none";
    }
}

class Task {

    constructor(arrayParams) {
        this.text = arrayParams[0];
        this.date = arrayParams[1];
        this.time = arrayParams[2];
        this.category = arrayParams[3];
        this.priority = arrayParams[4];

        this.isDone = false;
        this.div = null;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let input = document.createElement("input");
        input.addEventListener("click", () => this.changeState(this.div));
        input.type = "checkbox";
        input.classList.add("checkbox");

        let textTask = document.createElement("p");
        textTask.innerHTML = this.text;
        textTask.classList.add("text");

        let dateField = document.createElement("p");
        dateField.innerHTML = this.date;
        dateField.classList.add("date");

        let timeField = document.createElement("p");
        timeField.innerHTML = this.time;
        timeField.classList.add("time");

        let priority = document.createElement("p");
        priority.innerHTML = this.priority;
        priority.classList.add("priority");

        let category = document.createElement("div");
        category.innerHTML = this.category;
        category.classList.add("category");

        let removeBtn = document.createElement("div");
        removeBtn.addEventListener("click", () => this.deleteTask());
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "видалити";

        switch (this.priority) {
            case "":
                break;
            case "Висока":
                priority.classList.add("high-priority");
                break;
            case "Середня":
                priority.classList.add("medium-priority");
                break;
            case "Низька":
                priority.classList.add("low-priority");
                break;
        }

        this.div.append(input);
        this.div.append(textTask);
        this.div.append(dateField);
        this.div.append(timeField);
        this.div.append(priority);
        this.div.append(category);
        this.div.append(removeBtn);

        if (this.isDone) {
            this.div.classList.add("completed");
            input.checked = true;
        }

        element.append(this.div);
    }

    changeState(element) {
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
    }

    deleteTask() {
        this.div.remove();
    }

}

function showSortMenu () {
    sortMenu.style.display = "block";
}

function sort (e) {
    console.log(e.target.id);
    switch (e.target.id) {
        case "sort-completed":
            doSortCompleted();
            break;
        case "sort-priority":
            doSortPriority();
            break;
    }

    function doSortCompleted () {
        list.innerHTML = "";
        (function showNoCompleted() {
            arrayTasks
                .filter(task => task.isDone === false)
                .forEach(task => {
                    task.createIn(list);
                });
        }());
        (function showCompleted() {
            arrayTasks
                .filter(task => task.isDone === true)
                .forEach(task => {
                    task.createIn(list);
                });
        }());
    }

    function doSortPriority () {
        list.innerHTML = "";

        (function showHigh () {
            arrayTasks
                .filter(task => task.priority === "Висока")
                .forEach(task => {
                    task.createIn(list);
                });
        }());
        (function showMedium () {
            arrayTasks
                .filter(task => task.priority === "Середня")
                .forEach(task => {
                    task.createIn(list);
                });
        }());
        (function showLow () {
            arrayTasks
                .filter(task => task.priority === "Низька")
                .forEach(task => {
                    task.createIn(list);
                });
        }());
        (function showDoesntPriority () {
            arrayTasks
                .filter(task => task.priority === "")
                .forEach(task => {
                    task.createIn(list);
                });
        }());
    }
}
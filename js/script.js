// Variables
let main = document.getElementsByTagName("main")[0],

    input = document.getElementById("input"),

    inputVal,

    ul = document.getElementById("ul"),

    myTasksLS = localStorage.getItem("Task") ? JSON.parse(localStorage.getItem("Task")) : [],

    clear = document.getElementById("clear");

// Events
clear.addEventListener("click", getConfirmation);

/**************************************************************************************************/

// trigger more than one event
['click', 'keyup'].forEach((element) =>

    main.addEventListener(element, function (event) {

        // if the pressed is "Enter" or button clicked is "add"
        if (event.keyCode == 13 || event.target.classList.contains("add")) onAction()

    })
);

/**************************************************************************************************/

// function to append user tasks to dom
function drawTasks(array) {

    ul.innerHTML = "";

    array.forEach(item => {

        ul.innerHTML += `<li data-class="${item}">${item} <i class="fa fa-times" data-class="${item}"></i></li>`

        getClassToRemove()

    })

}

/**************************************************************************************************/

// if there is tasks saved in localStorage
if (myTasksLS.length != 0) {

    let arr = JSON.parse(localStorage.getItem("Task"));

    // draw it in dom
    drawTasks(arr)

}

/**************************************************************************************************/

// function to trigger action on inputs
function onAction(event) {

    inputVal = input.value.trim();

    // if input value is empty don't do anything
    if (inputVal == "") return false

    // if not empty
    else {

        // add input value to previous data saved in localStorage
        myTasksLS = [...myTasksLS, inputVal]

        // update dom
        drawTasks(myTasksLS)

        // update localStorage
        setList(myTasksLS)

        // clear input box
        input.value = "";

    }

}

/**************************************************************************************************/

// function to update tasks in localStorage
function setList(value) {

    localStorage.setItem("Task", JSON.stringify(value))

}

/**************************************************************************************************/

// function to get all closing icons
function getClassToRemove() {

    let allItemInList = [...document.getElementsByTagName("li")]

    allItemInList.forEach(text => {

        text.addEventListener("click", function (event) {

            // it the element clicked contains "x"
            if (event.target.classList.contains("fa-times")) {

                // get all data classes
                let myClass = event.target.dataset.class;

                // remove by class data
                removeItem(myClass)

            }

        })

    })

}

/**************************************************************************************************/

// function to confirm that user want to reset the counter
function getConfirmation() {

    let question = confirm("Are you sure? you'll lose your tasks")

    // remove all tasks with one click
    if (question == true) {

        myTasksLS.map(item => removeItem(item))

        return true
    }

    // don't do anything
    else return false

}

/**************************************************************************************************/

// function to remove item by data-class
function removeItem(name) {

    // get all items but not the one clicked
    myTasksLS = myTasksLS.filter(item => item !== name)

    // update dom
    drawTasks(myTasksLS)

    // update localStorage
    setList(myTasksLS)

}

/**************************************************************************************************/
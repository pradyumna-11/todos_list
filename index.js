let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let completedTasksContainerEl = document.getElementById(
  "todoItemsCompletedContainer"
);

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

addTodoButton.onclick = function () {
  onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
    let completedTaskItem = document.getElementById(
      "todo" + todoObject.uniqueNo
    );
    todoItemsContainer.appendChild(completedTaskItem);
  } else {
    let completedTaskItem = document.getElementById(
      "todo" + todoObject.uniqueNo
    );
    completedTasksContainerEl.appendChild(completedTaskItem);
    todoObject.isChecked = true;
  }
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  //todoItemsContainer.removeChild(todoElement);

  let todoObjectIndex = todoList.findIndex((eachTodo) => {
    let id = "todo" + eachTodo.uniqueNo;
    if (id === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];
  if (todoObject.isChecked === true) {
    completedTasksContainerEl.removeChild(todoElement);
  } else {
    todoItemsContainer.removeChild(todoElement);
  }

  let deleteElementIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteElementIndex, 1);
}

let editTodoItem = (labelId, editInputElId) => {
  //let labelContainerEl = document.getElementById(labelContainerId);
  let labelEl = document.getElementById(labelId);
  let editInputEl = document.getElementById(editInputElId);
  if (labelEl.textContent !== "") {
    /*let editButtonEl = document.getElementById("button" + uniqueNo);
    let deleteIconContainerEl = document.getElementById(
      "deleteIconContainer" + uniqueNo
    );*/
    //labelEl.textContent = "";
    //labelEl.style.width = "3%";
    labelEl.style.display = "none";
    editInputEl.style.display = "inline";
    /*let editInputEl = document.createElement("input");
    editInputEl.type = "text";
    editInputEl.classList.add("edit-input-style");
    labelContainerEl.removeChild(editButtonEl);
    labelContainerEl.removeChild(deleteIconContainerEl);
    labelContainerEl.appendChild(editInputEl);
    labelContainerEl.appendChild(editButtonEl);
    labelContainerEl.appendChild(deleteIconContainerEl);
    editInputEl.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        labelEl.textContent = event.target.value;
        labelContainerEl.removeChild(editInputEl);
        labelEl.style.width = "82%";
      }
    });*/
  }
};

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let editButtonId = "button" + todo.uniqueNo;
  let editInputElId = "editInput" + todo.uniqueNo;
  //let labelContainerId = "labelContainer" + todo.uniqueNo;
  //let deleteIconContainerId = "deleteIconContainer" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  if (todo.isChecked === false) {
    todoItemsContainer.appendChild(todoElement);
  } else {
    completedTasksContainerEl.appendChild(todoElement);
  }

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;

  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };

  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  //labelContainer.id = labelContainerId;
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let editInputEl = document.createElement("input");
  editInputEl.type = "text";
  editInputEl.classList.add("edit-input-style");
  editInputEl.id = editInputElId;
  editInputEl.addEventListener("keydown", function (event) {
    console.log(event.target.value);
    if (event.key === "Enter" && event.target.value !== "") {
      labelElement.textContent = event.target.value;
      editInputEl.style.display = "none";
      labelElement.style.width = "82%";
      labelElement.style.display = "inline";
    }
    if (event.key === "Enter" && event.target.value === "") {
      editInputEl.style.display = "none";
      labelElement.style.width = "82%";
      labelElement.style.display = "inline";
    }
  });
  labelContainer.appendChild(editInputEl);

  let editButtonEl = document.createElement("button");
  editButtonEl.classList.add("edit-button");
  editButtonEl.textContent = "Edit";
  editButtonEl.id = editButtonId;
  editButtonEl.onclick = function () {
    editTodoItem(labelId, editInputElId);
  };
  labelContainer.appendChild(editButtonEl);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  //deleteIconContainer.id = deleteIconContainerId;
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

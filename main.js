let ul = document.querySelector("ul");
let all_btn = document.querySelector("#all_btn");
let activ_btn = document.querySelector("#activ_btn");
let completed_btn = document.querySelector("#completed_btn");
let input = document.querySelector(".todo-item");
let footer = document.querySelector(".footer");

const reducer = (state = [], action) => {
  switch (action.type) {
    case "Add_item": {
      const newTodo = {
        id: Date.now(),
        text: action.text,
        isCompleted: false,
      };
      return [...state, newTodo];
    }
    case "Delete_item": {
      return [...state.filter((todo) => !(todo.id == action.id))];
    }

    case "All_items": {
      return state;
    }
    case "Active_items": {
      return state.filter((t) => !t.isCompleted);
    }
    case "Completed_item": {
      return state.filter((t) => t.isCompleted);
    }
  }
};

function displayTodo() {
  ul.innerHTML = "";
  const todos = store.getState();
  todos.forEach((todo) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let deleteButton = document.createElement("span");
    let checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.checked = todo.isCompleted;
    p.classList.add("para");
    li.classList.add("li_css");
    deleteButton.innerHTML = "❌";
    deleteButton.addEventListener("click", () => {
      store.dispatch({
        type: "Delete_item",
        id: todo.id,
      });
    });
    checkInput.addEventListener("click", () => {
      if (todo.isCompleted) p.style.textDecoration = "line-through";
      store.dispatch({
        id: todo.id,
        isCompleted: todo.isCompleted,
      });
    });
    p.innerHTML = todo.text;
    li.append(checkInput, p, deleteButton);
    ul.append(li);
  });
  if (todos.length >= 1) {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }
}

let store = Redux.createStore(reducer);
store.subscribe(displayTodo);

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && event.target.value.trim() !== "") {
    const text = event.target.value;
    store.dispatch({
      type: "Add_item",
      text,
    });
    event.target.value = "";
  }
});

all_btn.addEventListener("click", () => {
  store.dispatch({
    type: "All_items",
  });
});
completed_btn.addEventListener("click", () => {
  store.dispatch({
    type: "Completed_item",
  });
});
activ_btn.addEventListener("click", () => {
  store.dispatch({
    type: "Active_items",
  });
});

//Theme Toggle
const themeButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
themeButton.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) {
        localStorage.setItem("theme","dark");
        
    }else{
        localStorage.setItem("theme","light");
        
    }
    updateIcon();

});

//Update Icon
const updateIcon = () => {
    if(document.body.classList.contains("dark")) {
        themeIcon.className="fa-solid fa-sun";
    }else{
        themeIcon.className="fa-solid fa-moon";
    }
}

const loadTheme = () => {
    let savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark");
    }else{
          document.body.classList.remove("dark");
    }
    updateIcon();
}
loadTheme();

//Fetch API
const apiTodoList = document.getElementById("apiTodoList");

const renderApiTodos = (todos) => {
    apiTodoList.textContent=""

    todos.forEach((todo)=>{

        const apiTodo = document.createElement("div");
        apiTodo.classList.add("api-todo");
        apiTodo.textContent=(todo.title);

        
        apiTodoList.appendChild(apiTodo)
    })
}



const fetchTodos = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos")
    let data = await response.json();

    renderApiTodos(data);
}
fetchTodos();



//TASK Section


const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const button = document.getElementById("addTask");
const searchInput = document.getElementById("search-input")
let tasks = [];


const renderTasks = (items) => {
    
    
    taskList.textContent=""; //empty array list
    items.forEach((item,index)=> {
        //CREATE TASK
        const task= document.createElement("div");
        task.classList.add("task");
        task.textContent=item;

        //DELETE BUTTON
        const deleteButton=document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent="Delete Task";
        
        //DELETE TASK
        deleteButton.addEventListener("click",()=>{
            tasks.splice(index,1);

            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks(tasks);
        });
        task.appendChild(deleteButton);
        taskList.appendChild(task);
    });
}
//SEARCH TASK,GOAL,NOTES
searchInput.addEventListener("input",()=> {
     const filteredTasks = tasks.filter((item) => {
            return item.toLowerCase().includes(searchInput.value.toLowerCase());
        })
    console.log(searchInput.value);
    console.log(filteredTasks);
    
    renderTasks(filteredTasks);

    const filteredGoals = goals.filter((goalItem) => {
        return goalItem.toLowerCase().includes(searchInput.value.toLowerCase());
    })

    renderGoals(filteredGoals);

    const filteredNotes = notes.filter((noteItem) => {
        return noteItem.toLowerCase().includes(searchInput.value.toLowerCase());
    })

    renderNotes(filteredNotes);
})


//ADD TASK
button.addEventListener("click",()=>{
    if(input.value.trim() === ""){
        return alert("Enter Task");
    } //provides validation to not return empty task
   
    tasks.push(input.value);
    localStorage.setItem("tasks",JSON.stringify(tasks)); // json.stringfy is used to convert an array to array of strings/object
    renderTasks(tasks);
    input.value=""
});

//DATA REMAINS SAVED AFTER REFRESH 
const loadTasks = () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")); // convert array of strings to array
    if(savedTasks !== null) //validation: what if user opens the website first time
     {
        tasks = savedTasks; 
    }
   renderTasks(tasks);
}
loadTasks();
// localStorage.clear(tasks);

//GOAL Section

const goalinput = document.getElementById("goalInput")
const goalList = document.getElementById("goal-list")
const goalButton = document.getElementById("addGoal")

let goals = []

const renderGoals = (goals) => {
    goalList.textContent=""

    goals.forEach((goalItem,index)=> {
        //CREATE GOALS
        const goal = document.createElement("div");
        goal.classList.add("goal");
        goal.textContent= goalItem;
        

        //DELETE GOALS
        const deleteGoal = document.createElement("button");
        deleteGoal.classList.add("delete-btn");
        deleteGoal.textContent="Delete Goal";

        //DELETE BUTTON
        deleteGoal.addEventListener("click", ()=> {
            goals.splice(index,1);

            localStorage.setItem("goals",JSON.stringify(goals));
            renderGoals(goals);
        })

        goal.appendChild(deleteGoal);
        goalList.appendChild(goal);
    })
}



goalButton.addEventListener("click",()=> {
            if(goalinput.value.trim() === "") {
               return alert("Enter goal");
            }
            // const goal = document.createElement("div");
            // goal.classList.add("goal");
            // goal.textContent = goalinput.value
            // goalList.appendChild(goal);
            

            goals.push(goalinput.value);
            localStorage.setItem("goals",JSON.stringify(goals))
             renderGoals(goals);
            goalinput.value =""

        
});

const loadGoals = () => {
    let savedGoals = JSON.parse(localStorage.getItem("goals"));
    if(savedGoals !== null) {
        goals = savedGoals;
    }
    
       renderGoals(goals);
 
    
}

loadGoals();
// localStorage.clear(goals);

//NOTES Section

const noteinput = document.getElementById("noteInput");
const noteList = document.getElementById("note-list");
const noteButton = document.getElementById("addNote");

let notes = [];

const renderNotes = (notes) => {
    noteList.textContent = ""
    notes.forEach((noteItem,index) => {
        const note = document.createElement("div");
        note.classList.add("note");
        note.textContent=noteItem;

        //Delete Note

        const deleteNote = document.createElement("button");
        deleteNote.classList.add("delete-btn");
        deleteNote.textContent="Delete Note";

        //Delete Button

        deleteNote.addEventListener("click",() => {
        
            notes.splice(index,1);

            localStorage.setItem("notes",JSON.stringify(notes));
            renderNotes(notes);

        })

        note.appendChild(deleteNote);
        noteList.appendChild(note);
    })
}

//ADD Note

noteButton.addEventListener("click", () => {

    if(noteinput.value.trim() === "") {
        return alert("Enter Note");
    }
    // const note = document.createElement("div");
    // note.classList.add("note");
    // note.textContent=noteinput.value;

    // noteList.appendChild(note)

    notes.push(noteinput.value);
    localStorage.setItem("notes",JSON.stringify(notes));
    renderNotes(notes);
    noteinput.value = ""
})

const loadNotes = () => {
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    if(savedNotes !== null) {
        notes = savedNotes;
    }
    
    // const note = document.createElement("div");
    // note.classList.add("note");
    // note.textContent=noteText;
    // noteList.appendChild(note)
    renderNotes(notes);
    
   
    

}
loadNotes();


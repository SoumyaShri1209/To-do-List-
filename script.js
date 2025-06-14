

document.addEventListener("DOMContentLoaded",()=>{
let todo_input=document.getElementById("todo-input");
let add_button=document.getElementById("button1");
let unordered_list=document.getElementById("tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task=>rendertask(task))

add_button.addEventListener("click",function(){
    let inputText= todo_input.value.trim();
    if(inputText ==="")  return;
    let newTask={
        id: Date.now(),
        text: inputText,
        iscompleted:false
    }

    tasks.push(newTask);
    savestask();
    todo_input.value="";
    console.log(newTask);
    rendertask(newTask);
})

function rendertask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.iscompleted) li.classList.add("completed")
    li.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>`;


    li.addEventListener("click",(e)=>{
       if(e.target.tagName==="BUTTON") return ;
       task.iscompleted=!task.iscompleted;
       li.classList.toggle("completed");
       savestask();
    });



    li.querySelector("button").addEventListener("click",(e)=>{
           e.stopPropagation();
           tasks = tasks.filter(t => t.id !== task.id);
           li.remove();
           savestask();
    })



    unordered_list.appendChild(li);
}


function savestask() {
localStorage.setItem("tasks",JSON.stringify(tasks));
}
})

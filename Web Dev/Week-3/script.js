let list = document.getElementsByTagName('ul')[0];

let todos = [];

function clear(){
    list.innerHTML = "";
}

function render(todos){
    let i = 0;
    todos.forEach(todo => {
        let ele = document.createElement(`li`);
        ele.innerHTML = `<li id = "todo${i}">${todo.title}<button onclick = "deletetodo(${i})">Delete</button></li>`;
        list.appendChild(ele);
        i++;
    });
}

function addtodo(){
    let todo = document.getElementsByTagName('input')[0].value;
    document.getElementsByTagName('input')[0].value = "";
    todos.push({'title':todo});
    console.log(todos);
    
    clear();
    render(todos);
}



function deletetodo(index){
    todos.splice(index,1);
    clear();
    render(todos);
}


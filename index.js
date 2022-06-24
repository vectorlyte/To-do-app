const textEl = document.getElementById("text-el")
const addBtn = document.getElementById("add-btn")
const UlEl = document.getElementById("ul")
const clearBtn = document.getElementById("clear-btn")
const style = getComputedStyle(document.body)

let list = ""
let todos = []
let counter = 0

if(todos.length <= 0){
    if(localStorage.getItem("list") != null)
    list = `${JSON.parse(localStorage.getItem("list"))}`
    counter = JSON.parse(localStorage.getItem("counter"))
    renderList()
}

addBtn.addEventListener("click", function(){
    if(textEl.value != ""){
    todos.push(textEl.value)}
    document.getElementById("container").appendChild(UlEl)
    renderList()
    clearTextField()
    save()
})

clearBtn.addEventListener("click", function(){
    localStorage.clear()
    list = ""
    UlEl.innerHTML = list
})

function renderList(){
    for(let i = 0; i < todos.length; i++){
        if(UlEl.children.length === 0){
            todos.pop(i)
        }
        if(textEl.value === "") {
            list = ""
        } else {
        counter++
        list = `<li id="${counter - 1}">
                    ${textEl.value} 
                        <button class="delete"          onclick="deleteEl(${counter - 1})">&#10006
                        </button>
                        <button id="checkerBtn${counter - 1}" class="check" onclick="check(${counter - 1})">&#10003
                    </button>
                </li>`}}
    UlEl.innerHTML += list
    list = ""
}

function clearTextField(){
    textEl.value = ""
}

function deleteEl(number) {
    for(let i = 0; i < counter; i++){
        if(i === number){
            document.getElementById("ul").removeChild(document.getElementById(i))
            save()
}}}

function check(number) {
    for(let i = 0; i < counter; i++){
        if(i === number){
            const item = document.getElementById(i)
            item.style.textDecoration = 'line-through'
            item.removeChild(document.getElementById("checkerBtn"+number))
}}
save()}

function save(){
    if(UlEl.children.length === 0){
        counter = 0
    }
    localStorage.setItem("list", JSON.stringify(UlEl.innerHTML))
    localStorage.setItem("counter", JSON.stringify(counter))
}
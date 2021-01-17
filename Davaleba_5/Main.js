const ADD_TODO_INPUT_TITLE = document.getElementById("ADD_TODO_INPUT_TITLE");
const ADD_TODO_INPUT_DEADLINE = document.getElementById("ADD_TODO_INPUT_DEADLINE");
const ADD_TODO_BUTTON = document.getElementById("ADD_TODO_BUTTON");
const DONE = document.getElementById("DONE");
const TODO = document.getElementById("TODO");
const CLEAR = document.getElementById("CLEAR_TODO_BUTTON");
let KEY = "TODO"

const JsonParse = (String) => {
    return JSON.parse(String)
}

const JsonStringify = (Json) => {
    return JSON.stringify(Json)
}

const GetLocalStorage = () => {

    let Todo = []
    let Storage = localStorage.getItem(KEY)

    if (Storage) {
        return JsonParse(Storage)
    }

    return Todo
}

const UpdateLocalStorage = (Storage) => {
    localStorage.setItem(KEY, Storage)
}

const RemoveData = (ID) => {
    let Storage = GetLocalStorage(KEY)

    let NewStorage = []

    for (let Index = 0; Index < Storage.length; Index++) {
        const Element = Storage[Index];
        
        if (Element.ID != ID) {
            NewStorage.push(Element)
        }
    }

    UpdateLocalStorage(JsonStringify(NewStorage))
}

const Completed = (ID) => {
    let Storage = GetLocalStorage(KEY)

    let NewStorage = []

    for (let Index = 0; Index < Storage.length; Index++) {
        const Element = Storage[Index];
        
        if (Element.ID == ID) {
            Element.Completed = true
        }

        NewStorage.push(Element)
    }

    UpdateLocalStorage(JsonStringify(NewStorage))
}

const GenerateID = () => {
    let ID = Math.floor(Math.random() * 1000)

    let Storage = GetLocalStorage()

    for (let Index = 0; Index < Storage.length; Index++) {
        const Element = Storage[Index];
        
        if (Element.ID == ID) {
            return GenerateID()
        }
    }

    return ID
}

const LoadTodo = (Title, DeadLine, ID) => {
    let Task = document.createElement("div")
    Task.classList.add("task")
    Task.dataset.id = ID

    let TitleHolder = document.createElement("p")
    TitleHolder.innerText = Title

    let DeadLineHolder = document.createElement("p")
    DeadLineHolder.innerText = DeadLine

    let Delete = document.createElement("button")
    Delete.innerText = "X"
    Delete.classList.add("delete_button")

    let Done = document.createElement("button")
    Done.innerText = "D"
    Done.classList.add("done_button")

    TODO.appendChild(Task)
    Task.appendChild(TitleHolder)
    Task.appendChild(DeadLineHolder)
    Task.appendChild(Done)
    Task.appendChild(Delete)

    Delete.addEventListener("click", () => {
        RemoveData(Task.dataset.id)
        Task.remove()
    })

    Done.addEventListener("click", () => {
        Completed(Task.dataset.id)
        LoadDone(TitleHolder.innerText, DeadLineHolder.innerText, Task.dataset.id)
        Task.remove()
    })
}

const LoadDone = (Title, DeadLine, ID) => {
    let Task = document.createElement("div")
    Task.classList.add("task")
    Task.dataset.id = ID

    let TitleHolder = document.createElement("p")
    TitleHolder.innerText = Title

    let DeadLineHolder = document.createElement("p")
    DeadLineHolder.innerText = DeadLine

    let Delete = document.createElement("button")
    Delete.innerText = "X"
    Delete.classList.add("delete_button")

    DONE.appendChild(Task)
    Task.appendChild(TitleHolder)
    Task.appendChild(DeadLineHolder)
    Task.appendChild(Delete)

    Delete.addEventListener("click", () => {
        RemoveData(Task.dataset.id)
        Task.remove()
    })
}

ADD_TODO_BUTTON.addEventListener("click", () => {
    var Title = ADD_TODO_INPUT_TITLE.value
    var DeadLine = ADD_TODO_INPUT_DEADLINE.value

    if (!Title) {
        return
    }

    if (!DeadLine) {
        return
    }

    let ID = GenerateID()

    let Storage = GetLocalStorage()

    Storage.push({
        Title: Title,
        DeadLine: DeadLine,
        ID: ID,
        Completed: false,
    })

    UpdateLocalStorage(JsonStringify(Storage))

    LoadTodo(Title, DeadLine, ID)
})

let Storage = GetLocalStorage()

const Update = () => {

    TODO.innerHTML = ""
    DONE.innerHTML = ""

    for (let Index = 0; Index < Storage.length; Index++) {
        const Element = Storage[Index];
        
        if (Element.Completed) {
            LoadDone(Element.Title, Element.DeadLine, Element.ID)
        } else {
            LoadTodo(Element.Title, Element.DeadLine, Element.ID)
        }
    }
}

CLEAR.addEventListener("click", () => {
    UpdateLocalStorage(JsonStringify([]))
    Update()
})

Update()
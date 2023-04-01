import crossIcon from "../images/icon-cross.svg";
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";
import checkIcon from "../images/icon-check.svg";
import bgLight from "../images/bg-desktop-light.jpg";
import bgDark from "../images/bg-desktop-dark.jpg";
import { useState } from "react";
import { useViewport } from "react-viewport-hooks";


function Header({ isToggleTheme, onToggleTheme }) {

    return (
        <header>
            <h1>Todo</h1>
            <button
                onClick={() => {
                    onToggleTheme();
                }}
            >
                {isToggleTheme ?
                    <img src={moonIcon}
                        alt="Moon icon"
                    />
                    :
                    <img src={sunIcon}
                        alt="Sun icon"
                    />
                }
            </button>
        </header>
    )
}

function AddNewTask({ onAddNewTodo, isToggleTheme }) {
    const [title, setTitle] = useState("");

    return (
        <section id="newtask-container">
            <input
                type="button"
                id="btn-addnewtask"
                onClick={() => {
                    setTitle("");
                    onAddNewTodo(title);

                }}
            />
            <input
                style={isToggleTheme ?
                    { backgroundColor: "#ffffff" }
                    :
                    {
                        backgroundColor: "hsl(235, 24%, 19%)",
                        color: "hsl(234, 39%, 85%)"
                    }
                }

                id="btn-newtodo"
                type="text"
                placeholder="Create a new todo..."
                value={title}
                onChange={e => setTitle(e.target.value)
                } />
        </section>
    );
}

function Task({ todo, onDeleteTask, vw }) {
    const [isTaskDone, setIsTaskDone] = useState(false);
    const [iscloseBtn, setIsCloseBtn] = useState(false);


    return (

        <div onMouseOver={() => setIsCloseBtn(true)}
            onMouseOut={() => setIsCloseBtn(false)}
            id="taskwrapper">
            {isTaskDone &&
                <img src={checkIcon} className="btn-taskcomplete" alt="task completed button"
                />
            }
            <label
                className="item-container">
                < input
                    type="button"
                    className="btn-task-done"
                    id="btn-task-done1"
                    style={isTaskDone ?
                        { background: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))" }
                        : { background: "none" }
                    }
                    onClick={() => {
                        setIsTaskDone(!isTaskDone);
                        /* onTaskComplete(t => t ?
                            { ...todo, done: true } :
                            { ...todo, done: false }); */
                    }} />
            </label>
            {isTaskDone ?
                <p

                    style={{ color: "hsl(233, 11%, 84%)" }}>
                    <del>{todo.title}</del>
                </p> :
                <p>
                    {todo.title}
                </p>}

            {(iscloseBtn && vw > 375) &&
                <button onClick={() => onDeleteTask(todo.id)}>
                    <img src={crossIcon} id="img-delete" alt="Task delete button" />
                </button>
            }

            {(vw <= 375) &&
                <button onClick={() => onDeleteTask(todo.id)}>
                    <img src={crossIcon} id="img-delete" alt="Task delete button" />
                </button>
            }

        </div>
    )
}

function TaskList({ todos, onDelete, onComplete, isToggleTheme, vw }) {

    return (
        <section id="tasks-container"
            style={isToggleTheme ?
                {
                    backgroundColor: "#ffffff",
                    color: "hsl(235, 19%, 35%)",
                    boxShadow: "1px 1px 30px hsl(236, 9%, 61%)"
                }
                :
                {
                    backgroundColor: "hsl(235, 24%, 19%)",
                    color: "hsl(234, 39%, 85%)",
                    boxShadow: "1px 1px 30px hsl(235, 21%, 11%)"

                }
            }>

            <ul id="tasks">
                {todos.map(todo => (
                    <li key={todo.id}
                        style={isToggleTheme ?
                            {
                                borderBottom: "1px solid hsl(236, 33%, 92%)"
                            }
                            :
                            {
                                borderBottom: "1px solid hsl(237, 14%, 26%)"
                            }
                        }
                        
                        >
                        <Task
                            todo={todo}
                            onDeleteTask={onDelete}
                            onTaskComplete={onComplete}
                            vw={vw}
                            />
                    </li>

                ))}
                <li>
                    <div id="info">
                        <span>{todos.length} items left</span>
                        <div id="inner-info"
                                style={isToggleTheme ?
                                    {
                                        backgroundColor: "#ffffff",
                                        color: "hsl(235, 19%, 35%)",
                                        boxShadow: "1px 1px 30px hsl(236, 9%, 61%)"
                                    }
                                    :
                                    {
                                        backgroundColor: "hsl(235, 24%, 19%)",
                                        color: "hsl(234, 39%, 85%)",
                                        boxShadow: "1px 1px 30px hsl(235, 21%, 11%)"
                    
                                    }
                            }>
                            <span id="all">All</span>
                            <span id="active">Active</span>
                            <span id="completed">Completed</span>
                        </div>
                        <span>Clear completed</span>
                    </div>
                </li>
            </ul>

        </section>

    );
}

function DragDrop() {
    return (
        <div id="drag-and-drop">
            <p>Drag and drop to reorder list</p>
        </div>
    )
}
function Todo() {
    const [todos, setTodos] = useState(initialTodos);
    const [isToggleTheme, setToggleTheme] = useState(true);
    const { vw } = useViewport();

    function handleAddNewTask(title) {
        setTodos([
            ...todos,
            {
                id: nextId++,
                title: title,
                done: false,
            }
        ]);
    }

    function handleDelete(todoId) {
        setTodos(todos.filter(todo => todo.id !== todoId));
    }

    function handleToggleTheme() {
        setToggleTheme(!isToggleTheme);
    }


    return (
        <main
            style={
                isToggleTheme ?
                    { backgroundImage: `url(${bgLight})` }
                    :
                    {
                        backgroundImage: `url(${bgDark})`,
                        backgroundColor: "hsl(235, 21%, 11%)"

                    }

            }
        >
            <section

                id="todo-container">
                <Header
                    isToggleTheme={isToggleTheme}
                    onToggleTheme={handleToggleTheme}
                />
                <AddNewTask
                    onAddNewTodo={handleAddNewTask}
                    isToggleTheme={isToggleTheme}
                />
                <TaskList
                    todos={todos}
                    onDelete={handleDelete}
                    isToggleTheme={isToggleTheme}
                    vw={vw}
                />
                <DragDrop />
            </section>
        </main>
    )
}

let nextId = 5;
const initialTodos = [
    { id: 1, title: "Read", done: true },
    { id: 2, title: "Practice on Codewars", done: false },
    { id: 3, title: "Work current project", done: false },
    { id: 4, title: "Get groceries", done: false },
    { id: 5, title: "Build Backend App", done: false },
];
export default Todo;
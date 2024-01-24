import React, { useEffect, useState } from 'react';

export default function TodoList() {
    function getStoredData() {
        let data = localStorage.getItem("todos");
        try {
            // Try to parse the data as JSON
            return JSON.parse(data) || [];
        } catch (error) {
            // Handle the case where data is not a valid JSON string
            console.error("Error parsing JSON data:", error);
            return [];
        }
    }

    const [todos, setTodos] = useState(getStoredData());

    useEffect(() => {
        // Store todos as a JSON string
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;
        if (!task) {
            alert("Please provide a valid task");
            return;
        }
        event.target.reset();
        setTodos([...todos, { task: task, completed: false }]);
    }

    function changeTaskStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <>
            <div className="container my-5 ">
                <div className='mx-auto rounded border p-4' style={{ maxWidth: "600px", width: "100%", backgroundColor: "#020011" }}>
                    <h2 className='text-white text-center mb-5'>My Todo List</h2>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="form-control me-2" placeholder="New Task" name="task" />
                        <button className="btn btn-outline-light" type="submit">Add</button>
                    </form>
                    {
                        todos.map((todo, index) => {
                            return (
                                <div key={index} className='rounded mt-4 p-2 d-flex ' 
                                    style={{ backgroundColor: todo.completed ? "#5FD33E" : "lightblue" }}>

                                    <div className='me-auto'>
                                        {todo.task}
                                    </div>
                                    
                                    {/* code for checking completed task */}
                                    <div >  
                                        <i className={ "h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square")}
                                            style={{ cursor: "pointer" }} onClick={() => changeTaskStatus(index)}></i>
                                        <i className="bi bi-trash text-danger h5 " style={{ cursor: "pointer" }}
                                            onClick={() => deleteTask(index)}></i>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './Components/TodoForm';
import { TodoProvider } from './Context';
import TodoItem from './Components/TodoItem';
import {toast} from 'react-hot-toast';

function App() {

  const [todos, setTodos] = useState([]) ;

  const addTodo = (todo) => {  // add todo of messages
    setTodos( (prev) => [{id:Date.now(), ...todo}, ...prev] ) ;
    toast.success('Added ToDo!',{position:"top-right"});
  }

  const updateTodo = (id, todo) => {
    setTodos( (prev) => prev.map( (prevTodo) => (prevTodo.id === id ? todo : prevTodo ) ) ) ;
    toast.success('Updated ToDo!',{position:"top-right"});
  }

  const deleteTodo = (id) => {
    setTodos( (prev) => prev.filter( (prevTodo) => prevTodo.id !== id ) ) ;
    toast.error('ToDo Deleted !',{position:"top-right"});
  }

  const toggleComplete = (id) => {
    setTodos( (prev) => prev.map( (prevTodo) => prevTodo.id === id ? {...prevTodo, completed:(!prevTodo.completed)} : prevTodo ) ) ;
    toast('Good Job!', {icon: '👏',position:"top-right"});
  }

  useEffect( () => {
    const todos = JSON.parse(localStorage.getItem("todos")) ;

    if(todos && todos.length > 0){
      setTodos(todos) ;
    }
  } , [] ) ;

  useEffect( () => {
    localStorage.setItem("todos", JSON.stringify(todos)) ;
  }, [todos] ) ;

  return (
   
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>

      <div className="bg-[#0e274c] min-h-screen py-8" >
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                { todos.map( (todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                ) ) }
              </div>
        </div>
      </div>

    </TodoProvider>

  );
}

export default App;




// LOCALSTORAGE 
// The localStorage object allows you to save key/value pairs in the browser.

// The localStorage object stores data with no expiration date.

// The data is not deleted when the browser is closed, and are available for future sessions.

//--> Save Data to Local Storage
// localStorage.setItem(key, value);

//--> Read Data from Local Storage
// let lastname = localStorage.getItem(key);

//--> Remove Data from Local Storage
// localStorage.removeItem(key);

// ---> noted to : value are string formates
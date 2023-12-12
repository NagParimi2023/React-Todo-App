import { useState } from 'react'
import './CSS/Todo.css'
import { useRef } from 'react'
import { useEffect } from 'react';
import TodoItems from './TodoItems';


let count=0;
const Todo = () => {

   const [todos,setTodos]=useState([]);
   const inputref=useRef(null);

   const add =()=>{
    setTodos([...todos,{no:count++,text:inputref.current.value,display:""}]);
    inputref.current.value="";
    localStorage.setItem("todoscount",count);
   }

   useEffect(()=>{
     setTimeout(()=>{
       console.log(todos);
       localStorage.setItem("todos",JSON.stringify(todos))
     },100)
   },[todos])

   useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count=localStorage.getItem("todoscount");
   },[])

  return (
    <div className='todo'>
        <div className='todo-header'>TODO LIST</div>
        <div className='todo-add'>
            <input ref={inputref} type='text' placeholder='Add the task' className='todo-input'/>
            <div onClick={()=>{add()}}  className='todo-add-btn'>ADD</div>
        </div>
        <div className='todo-list'>
            {todos.map((items,index)=>{
                return <TodoItems key={index} setTodos={setTodos} no={items.no} text={items.text} display={items.display}/>
            })}
        </div>
    </div>
  )
}

export default Todo

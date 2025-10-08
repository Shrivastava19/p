import React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const STORAGE_KEY = 'smart-issues-v1'
const statuses = ['Todo','In Progress','Done']

function uid(){return Math.random().toString(36).slice(2,9)}

export default function IssueTracker(){
  const [data, setData] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {tasks:[]}
    }catch(e){ return {tasks:[]}}
  })
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) },[data])

  function addTask(){
    if(!title.trim()) return
    const task = {id:uid(), title, description:desc, status:'Todo'}
    setData(d => ({...d, tasks:[...d.tasks, task]}))
    setTitle(''); setDesc('')
  }

  function onDragEnd(result){
    const {destination, source, draggableId} = result
    if(!destination) return
    const srcStatus = source.droppableId
    const destStatus = destination.droppableId
    if(srcStatus === destStatus) return
    setData(prev=>{
      const tasks = prev.tasks.map(t => t.id===draggableId ? {...t, status: destStatus} : t)
      return {...prev, tasks}
    })
  }

  function updateStatus(id, status){
    setData(prev=>({...prev, tasks: prev.tasks.map(t=> t.id===id?{...t,status}:t)}))
  }

  function deleteTask(id){
    setData(prev=>({...prev, tasks: prev.tasks.filter(t=>t.id!==id)}))
  }

  return (
    <div>
      <h2>Issue Tracker</h2>
      <div style={{marginBottom:12}} className="form-row">
        <input placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Short description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button className="btn" onClick={addTask}>Add</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          {statuses.map(status=>(
            <Droppable droppableId={status} key={status}>
              {(provided)=>(
                <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h3>{status} ({data.tasks.filter(t=>t.status===status).length})</h3>
                  {data.tasks.filter(t=>t.status===status).map((task, index)=>(
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(prov)=>(
                        <div className="task" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                          <strong>{task.title}</strong>
                          <div style={{fontSize:13,color:'#555'}}>{task.description}</div>
                          <div style={{marginTop:8}}>
                            <select value={task.status} onChange={e=>updateStatus(task.id, e.target.value)}>
                              {statuses.map(s=><option key={s} value={s}>{s}</option>)}
                            </select>
                            <button className="small-btn" onClick={()=>deleteTask(task.id)} style={{marginLeft:8}}>Delete</button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

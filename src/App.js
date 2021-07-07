import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5001/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5001/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/tasks/${id}`, { method: 'DELETE' })
    console.log('delete', id)
    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    console.log(taskToToggle)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5001/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
    const data = await res.json()
    console.log('toggle', data)
    setTasks(tasks.map(task => task.id === id ?
      { ...task, reminder: data.reminder } :
      task))
  }

  //add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5001/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    console.log(data.id)

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className='container'>
        <Header showAddTaskForm={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask} />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {
              tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> :
                'No Task To Show...'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
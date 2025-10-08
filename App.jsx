import React, { useState } from 'react'
import IssueTracker from './components/IssueTracker'
import QuizBuilder from './components/QuizBuilder'

export default function App(){
  const [view, setView] = useState('issues')
  return (
    <div className="app">
      <header>
        <h1>Smart Issue Tracker & Quiz Builder</h1>
        <nav>
          <button onClick={()=>setView('issues')} className={view==='issues'? 'active':''}>Issue Tracker</button>
          <button onClick={()=>setView('quizzes')} className={view==='quizzes'? 'active':''}>Quiz Builder</button>
        </nav>
      </header>
      <main>
        {view==='issues' ? <IssueTracker /> : <QuizBuilder />}
      </main>
      <footer>
        <small>Made with ❤️ — localStorage persistence</small>
      </footer>
    </div>
  )
}

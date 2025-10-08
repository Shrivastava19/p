import React, {useEffect, useState} from 'react'

const STORAGE_Q = 'smart-quizzes-v1'

function uid(){return Math.random().toString(36).slice(2,9)}

export default function QuizBuilder(){
  const [state, setState] = useState(()=> {
    try{
      const raw = localStorage.getItem(STORAGE_Q)
      return raw ? JSON.parse(raw) : {quizzes:[]}
    }catch(e){ return {quizzes:[]}}
  })
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  const [qText, setQText] = useState('')
  const [opts, setOpts] = useState(['','','',''])
  const [correct, setCorrect] = useState(0)
  const [editingId, setEditingId] = useState(null)
  const [playingQuiz, setPlayingQuiz] = useState(null)

  useEffect(()=>{ localStorage.setItem(STORAGE_Q, JSON.stringify(state)) },[state])

  function addQuestion(){
    if(!qText.trim()) return
    const q = {id: uid(), text: qText, options: [...opts], answer: parseInt(correct)}
    setQuestions(s=>[...s,q])
    setQText(''); setOpts(['','','','']); setCorrect(0)
  }

  function createQuiz(){
    if(!title.trim() || questions.length===0) return alert('Provide title and at least one question')
    const q = {id: uid(), title, questions}
    setState(s=>({...s, quizzes: [...s.quizzes, q]}))
    setTitle(''); setQuestions([])
  }

  function deleteQuiz(id){
    if(!confirm('Delete quiz?')) return
    setState(s=>({...s, quizzes: s.quizzes.filter(x=>x.id!==id)}))
  }

  function startQuiz(quiz){
    setPlayingQuiz({...quiz, current:0, score:0, answers:[]})
  }

  function answerCurrent(choice){
    setPlayingQuiz(p=>{
      const q = p.questions[p.current]
      const isCorrect = (choice === q.answer)
      const score = p.score + (isCorrect?1:0)
      const answers = [...p.answers, {qid:q.id, selected:choice, correct:q.answer}]
      if(p.current+1 >= p.questions.length){
        return {...p, current: p.current+1, score, answers, finished: true}
      }else{
        return {...p, current: p.current+1, score, answers}
      }
    })
  }

  function resetPlay(){ setPlayingQuiz(null) }

  return (
    <div>
      <h2>Quiz Builder</h2>
      {!playingQuiz && (
      <div style={{display:'flex',gap:12}}>
        <div style={{flex:1}}>
          <h3>Create Quiz</h3>
          <input placeholder="Quiz title" value={title} onChange={e=>setTitle(e.target.value)} />
          <hr />
          <h4>Add Question</h4>
          <textarea placeholder="Question text" value={qText} onChange={e=>setQText(e.target.value)} />
          {opts.map((o,i)=>(
            <div key={i} className="form-row">
              <input placeholder={'Option '+(i+1)} value={o} onChange={e=>{ const copy=[...opts]; copy[i]=e.target.value; setOpts(copy)}} />
              <label style={{alignSelf:'center'}}><input type="radio" name="correct" checked={correct===i} onChange={()=>setCorrect(i)} /> Correct</label>
            </div>
          ))}
          <button className="small-btn" onClick={addQuestion}>Add Question</button>
          <div>
            <h4>Preview Questions ({questions.length})</h4>
            {questions.map(q=>(
              <div key={q.id} className="quiz-card">
                <strong>{q.text}</strong>
                <ol>{q.options.map((o,idx)=><li key={idx}>{o} {q.answer===idx?'<- correct':''}</li>)}</ol>
              </div>
            ))}
          </div>
          <button className="btn" onClick={createQuiz}>Create Quiz</button>
        </div>

        <div style={{flex:1}}>
          <h3>Your Quizzes</h3>
          {state.quizzes.length===0 && <div>No quizzes yet (you can use dummy data)</div>}
          {state.quizzes.map(q=>(
            <div key={q.id} className="quiz-card">
              <strong>{q.title}</strong>
              <div style={{marginTop:8}}>
                <button className="small-btn" onClick={()=>startQuiz(q)}>Play</button>
                <button className="small-btn" onClick={()=>deleteQuiz(q.id)} style={{marginLeft:8}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {playingQuiz && (
        <div>
          <h3>Playing: {playingQuiz.title}</h3>
          {!playingQuiz.finished ? (
            <div>
              <div style={{marginBottom:8}}>Question {Math.min(playingQuiz.current+1, playingQuiz.questions.length)} / {playingQuiz.questions.length}</div>
              <div className="progress" style={{marginBottom:8}}>
                <i style={{width: ((playingQuiz.current)/playingQuiz.questions.length*100) + '%'}}></i>
              </div>
              <div className="quiz-card">
                <strong>{playingQuiz.questions[playingQuiz.current].text}</strong>
                <ol type='A'>
                  {playingQuiz.questions[playingQuiz.current].options.map((opt, idx)=>(
                    <li key={idx} style={{marginTop:6}}>
                      <button className="small-btn" onClick={()=>answerCurrent(idx)}>{opt}</button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div>
              <h4>Finished — Score: {playingQuiz.score} / {playingQuiz.questions.length}</h4>
              <h5>Review</h5>
              {playingQuiz.answers.map((a, i)=>{
                const q = playingQuiz.questions[i]
                return (
                  <div key={a.qid} className="quiz-card">
                    <strong>{q.text}</strong>
                    <div>Your answer: {q.options[a.selected] ?? '—'}</div>
                    <div>Correct answer: {q.options[a.correct]}</div>
                  </div>
                )
              })}
              <button className="btn" onClick={resetPlay}>Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

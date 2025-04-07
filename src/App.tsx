import { useEffect, useState } from 'react'
import './App.css'
import { Member } from './member'
import { Card } from './components/Card'

function App() {
  const [members, setMembers] = useState<[]>([])
  const [name, setName] = useState<string>('')
  const [gender, setGender] = useState<string | undefined>(undefined)
  const [birth_date, setBirthDate] = useState<string>('')

  useEffect(() => {

    loadMembers()
  }, [])

  async function loadMembers() {
    const response = await fetch('http://localhost:3000/api/members')
    const data = await response.json()
    setMembers(data)
  }

  const handleAddMember = async () => {
    const response = await fetch('http://localhost:3000/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, gender: gender, birth_date: birth_date })
    })
    if (!response.ok) {
      let data = await response.json()
      alert(data.message)
    }
    else {
      alert('Sikeres hozzaadas!')
      loadMembers()
    }
  }

  return (
    <>
      <nav>
        <p><a href='#form'>Új tag felvétele</a></p>
        <p><a href='https://petrik.hu/' target='_blank'>Petrik honlap</a></p>
      </nav>
      <main>
        <h1>Petrik Könyvklub</h1>
        <div id='content'>
          <div id='cards'>
            {members.map((member: Member) => (
              <Card id={member.id} name={member.name} gender={member.gender} birth_date={member.birth_date} created_at={member.created_at} />
            ))}
          </div>
          <div id='form'>
            <h2>Tagfelvétel</h2>
            <div id='form-container'>
              <label>Név: </label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              <label>Nem: </label>
              <input value={gender} onChange={(e) => setGender(e.target.value)} />
              <label>Születési dátum: </label>
              <input value={birth_date} placeholder='2001-01-01' onChange={(e) => setBirthDate(e.target.value)} />
              <button onClick={handleAddMember}>Tagfelvétel</button>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>Készítette: Vágó Katalin Viktória</p>
      </footer>
    </>
  )
}

export default App

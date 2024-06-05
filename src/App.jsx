import { useState } from 'react'
import { generatePassword } from './utils/generator'
import Display from './components/Display'
import Options from './components/Options'

function App() {
  const [password, setPassword] = useState('')

  const handleSubmit = (length, options) => {
    if (Object.values(options).every(option => !option) || !length) return

    const generatedPassword = generatePassword(length, options)
    setPassword(generatedPassword)
  }

  return (
    <main className="custom-container">
      <div>
        <h1 className="text-xl font-bold capitalize md:text-2xl">
          Password generator
        </h1>
      </div>
      <div>
        <Display password={password} />
        <Options password={password} generatePassword={handleSubmit} />
      </div>
    </main>
  )
}

export default App

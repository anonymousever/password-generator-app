import { useState } from 'react'
import { generatePassword } from './utils/generator'
import Display from './components/Display'

function App() {
  const [password, setPassword] = useState('')

  const handleSubmit = (length, options) => {
    // TODO: Error handling
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
      </div>
    </main>
  )
}

export default App

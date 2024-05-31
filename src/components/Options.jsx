import { useEffect, useId, useState } from 'react'
import { checkboxes, strengthLevels } from '../config/password'
import { ArrowRight } from 'lucide-react'

const initialOptions = Object.fromEntries(
  checkboxes.map(checkboxe => [checkboxe.name, checkboxe.initialValue])
)

function Options({ password, generatePassword }) {
  const id = useId()
  const [length, setLength] = useState(10)
  const [options, setOptions] = useState(initialOptions)
  const [strengthLevel, setStrengthLevel] = useState(0)

  useEffect(() => {
    if (!password) return
    const lengthPoints = Math.floor(length / 2)
    const optionsPoints = Object.values(options).filter(Boolean).length / 2
    const totalPoint = lengthPoints + optionsPoints
    const strengthIndex = strengthLevels.findLastIndex(
      level => totalPoint >= level.requiredPoints
    )

    setStrengthLevel(strengthIndex + 1)
  }, [password])

  const handleChange = ({ target }) => {
    const { name, checked } = target

    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: checked,
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    generatePassword(length, options)
  }

  const currentStrength = strengthLevels[strengthLevel - 1]

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 p-4 mt-2 bg-dark-gray md:p-8"
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <label htmlFor="length" className="flex justify-between items-center">
          <span className="capitalize">Character length</span>
          <span className="text-neon-green">{length}</span>
        </label>
        <input
          type="range"
          name="length"
          id="length"
          min={0}
          max={20}
          className="slider"
          value={length}
          onChange={event => setLength(Number(event.target.value))}
          style={{ '--value': `${(length / 20) * 100 - length / 20}%` }}
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-5">
        {checkboxes.map(checkbox => (
          <div key={checkbox.name} className="flex items-center gap-5 md:gap-6">
            <input
              type="checkbox"
              name={checkbox.name}
              id={`${id}-${checkbox.name}`}
              checked={options[checkbox.name]}
              onChange={handleChange}
              className="size-5 appearance-none border-2 bg-no-repeat bg-center cursor-pointer transition-colors checked:bg-check 
              checked:border-neon-green checked:bg-neon-green"
            />
            <label htmlFor={`${id}-${checkbox.name}`}>{checkbox.label}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center gap-4 px-4 py-[0.875rem] bg-very-dark-gray md:px-8 md:py-5">
          <p className="capitalize text-gray">Strength</p>
          <p className="ml-auto">
            {currentStrength ? currentStrength.name : ''}
          </p>
          <div className="flex gap-2">
            {strengthLevels.map((level, index) => (
              <div
                key={level.name}
                className={`w-[0.625rem] h-7 border-2 border-[#e6e5ea] ${
                  index < strengthLevel ? currentStrength.classNames : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
        <button
          disabled={Object.values(options).every(value => !value) || !length}
          className="flex justify-center items-center gap-4 px-4 py-[1.125rem] uppercase transition-colors border-2 border-neon-green bg-neon-green 
          text-dark-gray md:py-5 hover:bg-transparent hover:text-neon-green disabled:cursor-not-allowed disabled:hover:bg-neon-green disabled:text-dark-gray"
        >
          <span>Generate</span>
          <ArrowRight />
        </button>
      </div>
    </form>
  )
}

export default Options

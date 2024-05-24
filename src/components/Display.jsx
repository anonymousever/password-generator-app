import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'

function Display({ password }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setIsCopied(true)
  }

  useEffect(() => {
    setIsCopied(false)
  }, [password])

  return (
    <div className="flex justify-between items-center p-4 mt-5 bg-dark-gray md:px-6">
      <p
        className={`text-xl md:text-2xl ${
          password ? 'text-[#e6e5ea]' : 'text-[#e6e5ea]/25'
        }`}
      >
        {password || 'P4$5WOrD!'}
      </p>
      <div className="flex items-center gap-4">
        {isCopied && (
          <small className="uppercase text-neon-green">Copied</small>
        )}
        <button
          type="button"
          aria-label="Copy to clipboard"
          disabled={!password}
          onClick={handleCopy}
          className="text-neon-green transition-colors hover:text-white disabled:hover:text-neon-green disabled:hover:cursor-not-allowed"
        >
          <Copy />
        </button>
      </div>
    </div>
  )
}

export default Display

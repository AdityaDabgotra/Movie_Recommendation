import { useState } from "react"
import '../App.css'

function InputForm({ addLike }) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() !== "") {
      addLike(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        placeholder="Enter favourite genre..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default InputForm

"use client"

import { useState, useEffect, useRef } from "react"
import "../styles/LiveChat.css"

const LiveChat = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef(null)

  // Initial welcome message
  useEffect(() => {
    setTimeout(() => {
      addMessage({
        text: "Halo! Selamat datang di EcoCart. Ada yang bisa kami bantu?",
        sender: "agent",
        time: new Date(),
      })
    }, 1000)

    // Simulate agent going offline/online occasionally
    const onlineInterval = setInterval(() => {
      setIsOnline((prev) => !prev)
    }, 30000)

    return () => clearInterval(onlineInterval)
  }, [])

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message])
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    addMessage({
      text: inputValue,
      sender: "user",
      time: new Date(),
    })

    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate agent response after a delay
    setTimeout(() => {
      setIsTyping(false)

      // Sample responses
      const responses = [
        "Terima kasih atas pertanyaan Anda. Kami akan segera membantu.",
        "Tentu, kami dapat membantu Anda dengan hal tersebut.",
        "Untuk informasi lebih lanjut, Anda dapat mengunjungi halaman FAQ kami.",
        "Apakah ada informasi lain yang Anda butuhkan?",
        "Kami senang dapat membantu Anda hari ini!",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      addMessage({
        text: randomResponse,
        sender: "agent",
        time: new Date(),
      })
    }, 2000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="live-chat-container">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <div className="chat-status">
          <span className={`status-indicator ${isOnline ? "status-online" : "status-offline"}`}></span>
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.sender}`}>
            {message.text}
            <div className="message-time">{formatTime(message.time)}</div>
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input type="text" placeholder="Ketik pesan Anda..." value={inputValue} onChange={handleInputChange} />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default LiveChat

import React, { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun, FaPaperPlane, FaHistory, FaTrash, FaImage, FaFile } from 'react-icons/fa';
import { RiRobot3Fill } from "react-icons/ri";
import { gsap } from 'gsap';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size exceeds 5MB limit.");
        return;
      }
      setSelectedFile(file);
      setQuestion(prev => prev + ` [File: ${file.name}]`);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const generateAnswer = async () => {
    if (!question.trim() && !selectedFile) return;

    setLoading(true);
    setError(null);
    let newQuestion = { type: 'user', content: question };

    try {
      if (selectedFile) {
        const base64File = await fileToBase64(selectedFile);
        newQuestion.file = {
          name: selectedFile.name,
          type: selectedFile.type,
          content: base64File
        };
      }
      await processQuestion(newQuestion);
    } catch (error) {
      console.error("Error processing file:", error);
      setError("Error processing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const processQuestion = async (newQuestion) => {
    setChatHistory(prev => [...prev, newQuestion]);
    setQuestion("");
    setSelectedFile(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [
              { text: newQuestion.content },
              newQuestion.file ? { inline_data: { mime_type: newQuestion.file.type, data: newQuestion.file.content } } : null
            ].filter(Boolean)
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from the API');
      }
      const aiResponse = { type: 'ai', content: data.candidates[0].content.parts[0].text };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error: ${error.message}`);
      const errorResponse = { type: 'ai', content: "An error occurred while generating the answer." };
      setChatHistory(prev => [...prev, errorResponse]);
    }
  };

  const deleteHistoryItem = (index) => {
    const itemToDelete = document.querySelector(`.history-item:nth-child(${index + 1})`);
    
    gsap.to(itemToDelete, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      onComplete: () => {
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory.splice(index * 2, 2);
          return newHistory;
        });
      }
    });
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="logo">
          <RiRobot3Fill size={32} />
          <h1>SABOT AI</h1>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </header>

      <main className="main-content">
        <section className="chat-section">
          <div ref={chatContainerRef} className="chat-container">
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.type}-message`}>
                {message.content}
                {message.file && (
                  <div className="file-attachment">
                    <FaFile /> {message.file.name}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            )}
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); generateAnswer(); }} className="input-form">
            <div className="input-wrapper">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input-field"
                placeholder="Ask anything..."
                aria-label="Ask a question"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="file-button"
                aria-label="Attach file"
              >
                <FaImage />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
              aria-label="Submit question"
            >
              <FaPaperPlane />
            </button>
          </form>
        </section>

        <aside className="history-section">
          <h2 className="history-title">
            <FaHistory /> Chat History
          </h2>
          <ul className="history-list">
            {chatHistory.filter(msg => msg.type === 'user').map((chat, index) => (
              <li key={index} className="history-item">
                {chat.content}
                {chat.file && (
                  <span className="file-indicator">
                    <FaFile /> {chat.file.name}
                  </span>
                )}
                <button 
                  className="delete-button" 
                  onClick={() => deleteHistoryItem(index)}
                  aria-label="Delete chat history item"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SABOT AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
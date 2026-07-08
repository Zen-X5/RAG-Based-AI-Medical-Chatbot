import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function getOldChat(oldid) {
    try {
      const apiRes = await axios.get(
        `http://localhost:8080/api/ai/getOldChats/${oldid}`
      );

      setMessages(apiRes.data.success);
      setChatId(oldid);
      setSidebarOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function send() {
    try {
      const currentQuestion = question;

      if (!currentQuestion.trim()) return;

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: currentQuestion,
        },
      ]);

      setQuestion("");

      const apiRes = await axios.post(
        "http://localhost:8080/api/ai/ask-ai",
        {
          question: currentQuestion,
          id: chatId,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: apiRes.data.success,
        },
      ]);

      const updatedChats = await axios.get(
        "http://localhost:8080/api/ai/getChats"
      );

      setChats(updatedChats.data.success);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function createNewChat() {
      const apiRes = await axios.post(
        "http://localhost:8080/api/ai/createNewChat"
      );

      setChatId(apiRes.data.chatid);
      setMessages([]);
    }

    async function getChats() {
      const apiRes = await axios.get(
        "http://localhost:8080/api/ai/getChats"
      );

      setChats(apiRes.data.success);
    }

    createNewChat();
    getChats();
  }, []);

  async function handleNewChat() {
    try {
      const apiRes = await axios.post(
        "http://localhost:8080/api/ai/createNewChat"
      );

      setChatId(apiRes.data.chatid);
      setMessages([]);

      const updatedChats = await axios.get(
        "http://localhost:8080/api/ai/getChats"
      );

      setChats(updatedChats.data.success);
      setSidebarOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        :root {
          --bg: #0b1020;
          --panel: rgba(18, 24, 45, 0.82);
          --panel-solid: #12182d;
          --panel-soft: #1b2340;
          --panel-hover: #232d52;
          --border: rgba(255, 255, 255, 0.10);
          --text: #ecf2ff;
          --muted: #9daccc;
          --primary: #5b8cff;
          --primary-dark: #3d6ff0;
          --accent: #78e7c8;
          --danger: #ff6b81;
          --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          --radius-xl: 24px;
          --radius-lg: 18px;
          --radius-md: 14px;
          --radius-sm: 10px;
        }

        body {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at top left, rgba(91, 140, 255, 0.22), transparent 26%),
            radial-gradient(circle at bottom right, rgba(120, 231, 200, 0.18), transparent 24%),
            linear-gradient(135deg, #09101f 0%, #0f172d 48%, #0b1020 100%);
          color: var(--text);
          overflow: hidden;
        }

        .app-shell {
          height: 100vh;
          padding: 20px;
          overflow: hidden;
        }

        .app-frame {
          width: 100%;
          height: calc(100vh - 40px);
          display: grid;
          grid-template-columns: 320px 1fr;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 28px;
          backdrop-filter: blur(18px);
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .sidebar {
          background: rgba(10, 15, 30, 0.86);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          overflow: hidden;
        }

        .sidebar-top {
          padding: 24px 20px 18px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-shrink: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--primary), #7aa2ff);
          color: white;
          font-size: 20px;
          font-weight: 800;
          box-shadow: 0 10px 25px rgba(91, 140, 255, 0.35);
          flex-shrink: 0;
        }

        .brand-text h1 {
          font-size: 1.1rem;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .brand-text p {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .new-chat-btn {
          border: none;
          outline: none;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 0.96rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: 0 12px 28px rgba(61, 111, 240, 0.35);
        }

        .new-chat-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .chat-list-wrap {
          padding: 18px 14px 16px;
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          min-height: 0;
        }

        .chat-list-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          margin: 0 8px 14px;
        }

        .chat-item {
          width: 100%;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text);
          text-align: left;
          cursor: pointer;
          padding: 14px;
          border-radius: 14px;
          margin-bottom: 10px;
          transition: 0.22s ease;
        }

        .chat-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateX(2px);
        }

        .chat-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.35;
          word-break: break-word;
        }

        .chat-item-sub {
          margin-top: 6px;
          color: var(--muted);
          font-size: 0.82rem;
        }

        .main {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
          height: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
        }

        .topbar {
          border-bottom: 1px solid var(--border);
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          background: rgba(13, 18, 35, 0.5);
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.05);
          color: var(--text);
          cursor: pointer;
          flex-shrink: 0;
        }

        .topbar-title h2 {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .topbar-title p {
          margin-top: 4px;
          font-size: 0.88rem;
          color: var(--muted);
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ghost-btn {
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .ghost-btn:hover {
          background: rgba(255,255,255,0.08);
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(120, 231, 200, 0.10);
          color: #baf5e4;
          border: 1px solid rgba(120, 231, 200, 0.18);
          font-size: 0.84rem;
          font-weight: 600;
        }

        .status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 6px rgba(120, 231, 200, 0.12);
        }

        .chat-area {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 22px;
          gap: 18px;
        }

        .message-container {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 4px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-state {
          flex: 1;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px;
        }

        .empty-card {
          max-width: 560px;
          width: 100%;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          border-radius: 24px;
          padding: 32px 24px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .empty-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 18px;
          border-radius: 22px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(91,140,255,0.22), rgba(120,231,200,0.18));
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 30px;
        }

        .empty-card h3 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .empty-card p {
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.98rem;
        }

        .message-row {
          display: flex;
          width: 100%;
        }

        .message-row.user {
          justify-content: flex-end;
        }

        .message-row.assistant {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: min(78%, 760px);
          border-radius: 20px;
          padding: 16px 18px;
          position: relative;
          word-break: break-word;
          line-height: 1.7;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
        }

        .message-row.user .message-bubble {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border-bottom-right-radius: 8px;
        }

        .message-row.assistant .message-bubble {
          background: rgba(255,255,255,0.06);
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom-left-radius: 8px;
        }

        .message-role {
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.8;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .message-text {
          white-space: pre-wrap;
          font-size: 0.97rem;
        }

        .input-wrap {
          border: 1px solid var(--border);
          background: rgba(13, 18, 35, 0.72);
          border-radius: 22px;
          padding: 14px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.22);
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: var(--text);
          font-size: 1rem;
          resize: none;
          min-height: 54px;
          max-height: 140px;
          padding: 14px 6px 8px;
        }

        .chat-input::placeholder {
          color: var(--muted);
        }

        .send-btn {
          border: none;
          outline: none;
          min-width: 124px;
          height: 54px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          font-weight: 700;
          font-size: 0.96rem;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: 0 12px 30px rgba(61, 111, 240, 0.35);
        }

        .send-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .sidebar-overlay {
          display: none;
        }

        .message-container::-webkit-scrollbar,
        .chat-list-wrap::-webkit-scrollbar {
          width: 8px;
        }

        .message-container::-webkit-scrollbar-track,
        .chat-list-wrap::-webkit-scrollbar-track {
          background: transparent;
        }

        .message-container::-webkit-scrollbar-thumb,
        .chat-list-wrap::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
        }

        @media (max-width: 1100px) {
          .app-frame {
            grid-template-columns: 280px 1fr;
          }
        }

        @media (max-width: 900px) {
          .app-shell {
            height: 100vh;
            padding: 12px;
          }

          .app-frame {
            height: calc(100vh - 24px);
            border-radius: 22px;
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: fixed;
            top: 12px;
            left: ${sidebarOpen ? "12px" : "-100%"};
            width: min(86vw, 320px);
            height: calc(100vh - 24px);
            z-index: 50;
            border-radius: 22px;
            transition: left 0.28s ease;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
          }

          .sidebar-overlay {
            display: ${sidebarOpen ? "block" : "none"};
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.45);
            z-index: 40;
          }

          .menu-btn {
            display: inline-grid;
            place-items: center;
          }

          .topbar {
            padding: 16px;
          }

          .chat-area {
            padding: 16px;
          }

          .message-bubble {
            max-width: 92%;
          }

          .send-btn {
            min-width: 96px;
            padding: 0 16px;
          }

          .topbar-actions .status-pill {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .topbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .topbar-left,
          .topbar-actions {
            width: 100%;
          }

          .topbar-actions {
            justify-content: space-between;
          }

          .input-wrap {
            flex-direction: column;
            align-items: stretch;
          }

          .send-btn {
            width: 100%;
          }

          .chat-input {
            min-height: 52px;
          }

          .empty-card {
            padding: 24px 18px;
          }

          .brand-text h1 {
            font-size: 1rem;
          }

          .message-text {
            font-size: 0.94rem;
          }
        }
      `}</style>

      <div className="app-shell">
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />

        <div className="app-frame">
          <aside className="sidebar">
            <div className="sidebar-top">
              <div className="brand">
                <div className="brand-logo">✚</div>
                <div className="brand-text">
                  <h1>RAG Medical Chatbot</h1>
                  <p>Smart medical conversation workspace</p>
                </div>
              </div>

              <button className="new-chat-btn" onClick={handleNewChat}>
                + New Chat
              </button>
            </div>

            <div className="chat-list-wrap">
              <div className="chat-list-title">Recent Conversations</div>

              {chats.length > 0 ? (
                chats.map((chat) => (
                  <button
                    key={chat._id}
                    className="chat-item"
                    onClick={() => getOldChat(chat._id)}
                  >
                    <div className="chat-item-title">
                      {chat.title || "Untitled Chat"}
                    </div>
                    <div className="chat-item-sub">
                      Open saved conversation
                    </div>
                  </button>
                ))
              ) : (
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.92rem",
                    padding: "10px 8px",
                    lineHeight: "1.7",
                  }}
                >
                  No previous chats found.
                </div>
              )}
            </div>
          </aside>

          <main className="main">
            <div className="topbar">
              <div className="topbar-left">
                <button
                  className="menu-btn"
                  onClick={() => setSidebarOpen(true)}
                >
                  ☰
                </button>

                <div className="topbar-title">
                  <h2>Medical Assistant Panel</h2>
                  <p>Ask questions, review old chats, and start new sessions</p>
                </div>
              </div>

              <div className="topbar-actions">
                <div className="status-pill">
                  <span className="status-dot"></span>
                  Ready to chat
                </div>

                <button className="ghost-btn" onClick={handleNewChat}>
                  New Chat
                </button>
              </div>
            </div>

            <div className="chat-area">
              <div className="message-container">
                {messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-card">
                      <div className="empty-icon">💬</div>
                      <h3>Start a new medical conversation</h3>
                      <p>
                        Ask symptoms, treatment-related doubts, medical document
                        queries, or anything your RAG assistant is trained to
                        answer. Your recent chat sessions are available in the
                        left sidebar.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message-row ${
                        msg.role === "user" ? "user" : "assistant"
                      }`}
                    >
                      <div className="message-bubble">
                        <div className="message-role">{msg.role}</div>
                        <div className="message-text">{msg.content}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="input-wrap">
                <textarea
                  className="chat-input"
                  placeholder="Type your medical question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="send-btn" onClick={send}>
                  Send
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
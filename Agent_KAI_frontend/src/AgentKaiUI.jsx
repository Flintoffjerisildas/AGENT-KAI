import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
const AgentKaiUI = () => {
  return (
    <main className="mx-auto px-4 py-8 flex gap-4">
        <Sidebar />
        <ChatWindow />
        <HistoryPanel />
      </main>
  )
}

export default AgentKaiUI

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMessages, sendMessage } from '../services/messageService';
import MessageSidebar from '../components/MessageSidebar';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toParam = queryParams.get("to");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // ✅ updated
    if (jwt) {
      try {
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        setCurrentUserEmail(payload.email);
        loadMessages(jwt, payload.email);
      } catch (e) {
        console.error("Invalid JWT format:", e);
      }
    }
  }, []);

  const loadMessages = async (token, email) => {
    setLoading(true);
    try {
      const msgs = await getMessages(token);
      console.log("📥 Messages fetched:", msgs); // ✅ Debug log
      const grouped = groupMessagesByUser(msgs, email);
      setConversations(grouped);

      if (toParam) {
        const match = grouped.find(c => c.email === toParam);
        if (match) {
          setActiveConversation(match);
        } else {
          setActiveConversation({ email: toParam, messages: [] });
        }
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupMessagesByUser = (messages, currentEmail) => {
    const grouped = {};
    messages.forEach((msg) => {
      const otherEmail = msg.sender === currentEmail ? msg.receiver : msg.sender;
      if (!grouped[otherEmail]) grouped[otherEmail] = [];
      grouped[otherEmail].push(msg);
    });
    return Object.entries(grouped).map(([email, msgs]) => ({ email, messages: msgs }));
  };

  const handleSendMessage = async (content) => {
    const token = localStorage.getItem("jwt"); // ✅ consistent token usage
    if (!token || !activeConversation?.email) {
      console.warn("Cannot send message: Missing token or recipient.");
      return;
    }

    try {
      setLoading(true);
      const success = await sendMessage(
        { receiver_email: activeConversation.email, content },
        token
      );

      if (success) {
        await loadMessages(token, currentUserEmail);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MessageSidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onSelect={setActiveConversation}
      />
      <main className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading...
          </div>
        ) : activeConversation ? (
          <>
            <header className="p-4 border-b bg-white shadow-sm">
              <h3 className="text-lg font-bold">Chat with {activeConversation.email}</h3>
            </header>
            <ChatWindow
              messages={activeConversation.messages}
              currentUserEmail={currentUserEmail}
              recipientEmail={activeConversation.email}
            />
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import ScheduleSessionModal from '../components/ScheduleSessionModal';

export default function ChatWindow({ messages, currentUserEmail, recipientEmail }) {
  const [showModal, setShowModal] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => {
          const isSender = msg.sender === currentUserEmail;
          return (
            <div
              key={i}
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl shadow text-sm ${
                isSender
                  ? 'bg-blue-600 text-white self-end rounded-br-none'
                  : 'bg-gray-200 text-gray-900 self-start rounded-bl-none'
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs mt-1 text-right opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Schedule Session Button */}
      <div className="p-3 border-t flex justify-end bg-white">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          📅 Schedule Session
        </button>
      </div>

      {/* Modal */}
      <ScheduleSessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        recipientEmail={recipientEmail}
      />
    </div>
  );
}

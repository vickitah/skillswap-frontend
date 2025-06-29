import { useState } from 'react';

export default function MessageSidebar({ conversations, activeConversation, onSelect }) {
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-1/3 border-r overflow-y-auto p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <input
        placeholder="Search conversations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <ul>
        {filteredConversations.length === 0 ? (
          <li className="text-gray-500 text-sm">No conversations found</li>
        ) : (
          filteredConversations.map((conv) => (
            <li
              key={conv.email}
              onClick={() => onSelect(conv)}
              className={`cursor-pointer p-3 rounded mb-2 ${
                activeConversation?.email === conv.email
                  ? 'bg-indigo-100 font-medium'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold truncate">{conv.email}</div>
              <div className="text-sm text-gray-600 truncate">
                {conv.messages[conv.messages.length - 1]?.content.slice(0, 40) || 'No messages yet'}...
              </div>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
export const ChatBox = ({
  socket,
  messages,
  curMsg,
  handleKeyDown,
  handleInputChange,
}) => {
  return (
<aside
      id="chat-button-sidebar"
      aria-label="Sidebar"
      className="fixed top-0 right-0 z-40 w-96 h-full transition-transform  overflow-y-auto flex flex-col flex-grow max-w-xl bg-white shadow-xl overflow-hidden"
    >
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {messages.map((msg) => {
          return (
            <>
              {msg.author?.id !== socket.id ? (
                <div
                  key={msg.id}
                  className="flex w-full mt-2 space-x-3 max-w-xs"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">
                        {msg.author.name}
                        {": "}
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {msg.date}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">
                        {msg.author.name}
                        {": "}
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {msg.date}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <div className="bg-gray-300 p-4">
        <input
          className="flex text-black items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={curMsg}
          placeholder="Type your message…"
        />
      </div>
    </aside>
  );
};

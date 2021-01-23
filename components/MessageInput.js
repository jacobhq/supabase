import { useState } from "react";
import  { getId } from '../lib/Store';

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      if (messageText != "") {
          onSubmit(messageText);
          setMessageText("");
      }
    }
  };

  const sendMsg = () => {
      if (messageText != "") {
          onSubmit(messageText);
          setMessageText("");
      }
  }

  return (
    <>
      <div className="flex items-center border-b border-t border-indigo-500 py-2 px-4">
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Send a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => submitOnEnter(e)}
        />
        <button onClick={sendMsg} className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
          Send
        </button>
      </div>
    </>
  );
};

export default MessageInput;

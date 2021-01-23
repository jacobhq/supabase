const Message = ({ message }) => (
  <>
    <div className="py-1 px-2 hover:bg-gray-900" id="msg">
      <div className="absolute flex bg-gray-700 border rounded border-solid border-gray-900 transform -translate-y-4" id="toolbar">
        <div className="p-1 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3.333 5.833h13.334m-.834 0l-.722 10.119a1.667 1.667 0 01-1.663 1.548H6.552a1.667 1.667 0 01-1.663-1.548L4.167 5.833h11.666zm-7.5 3.334v5-5zm3.334 0v5-5zm.833-3.334v-2.5a.833.833 0 00-.833-.833H8.333a.833.833 0 00-.833.833v2.5h5z"
            ></path>
          </svg>
        </div>
      </div>
      <p className="text-indigo-500 font-bold">{message.author.username}</p>
      <p className="text-white">{message.message}</p>
    </div>
  </>
);

export default Message;


function Message({message, isGreen, timestamp}) {
  return (
    <p className={`chat_message ${isGreen && 'chat_receiver'}`}>
      {message}
      <span className="chat_timestamp">
        {timestamp}
      </span>
    </p>
  );  
}

export default Message

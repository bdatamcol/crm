import { useState } from 'react';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSendMessage = async () => {
    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sender: 'Usuario' }),
    });

    const data = await res.json();
    setResponse(data.message);
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSendMessage}>Enviar</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Chatbox;

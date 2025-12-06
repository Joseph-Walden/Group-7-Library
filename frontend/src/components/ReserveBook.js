import React, { useState } from "react";

function ReserveBook() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState(null);

  const reserveBook = async () => {
    const res = await fetch("http://localhost:3000/books/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, email })
    });

    const data = await res.json();
    setResponseMsg(data.message);
  };

  return (
    <div>
      <h2>Reserve a Book</h2>

      <input 
        type="text"
        placeholder="Book title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />

      <input 
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <button onClick={reserveBook}>Reserve</button>

      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
}

export default ReserveBook;

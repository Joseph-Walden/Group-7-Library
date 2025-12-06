import React, { useState } from "react";

function WaitlistStatus() {
  const [title, setTitle] = useState("");
  const [waitlist, setWaitlist] = useState(null);

  const loadWaitlist = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/books/waitlist/${encodeURIComponent(title)}`
      );
      const data = await res.json();
      setWaitlist(data);
    } catch (err) {
      setWaitlist({ error: "Error loading waitlist" });
    }
  };

  return (
    <div>
      <h2>Check Waitlist</h2>

      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={loadWaitlist}>Check</button>

      {waitlist && (
        <div>
          <h3>Waitlist for: {waitlist.title}</h3>
          <ul>
            {waitlist.waitlist?.length === 0 ? (
              <p>No users on waitlist</p>
            ) : (
              waitlist.waitlist.map((email, i) => <li key={i}>{email}</li>)
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WaitlistStatus;

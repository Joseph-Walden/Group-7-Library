import React, { useState } from "react";

function BookAvailability() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);

  const checkAvailability = async () => {
    if (!title) return;

    try {
      const response = await fetch(
        `http://localhost:3000/books/availability/${encodeURIComponent(title)}`
      );

      if (!response.ok) throw new Error("Book not found");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Book not found" });
    }
  };

  return (
    <div>
      <h2>Check Book Availability</h2>

      <input 
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={checkAvailability}>Search</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <div>
              <p><strong>Title:</strong> {result.title}</p>
              <p><strong>Author:</strong> {result.author}</p>
              <p><strong>Total Copies:</strong> {result.total_copies}</p>
              <p><strong>Available:</strong> {result.available}</p>
              <p><strong>Waitlist:</strong> {result.waitlist_length} users</p>
              <p><strong>Status:</strong> {result.status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookAvailability;

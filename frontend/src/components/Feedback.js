import React, { useState } from "react";

function Feedback() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <h2>Send Feedback</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write feedback..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
        ></textarea>
        <br />
        
        <button type="submit">Submit</button>
      </form>

      {sent && <p>Thanks for your feedback!</p>}
    </div>
  );
}

export default Feedback;

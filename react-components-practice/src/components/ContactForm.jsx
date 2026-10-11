import { useState } from "react";
import Button from "./Button.jsx";

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", email: "", topic: "Component feedback", message: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", topic: "Component feedback", message: "" });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-title-row">
        <h3>Send a message</h3>
        <span>DEMO FORM</span>
      </div>
      <label>
        Your name
        <input name="name" value={formData.name} onChange={updateField} placeholder="e.g. Ayush" required />
      </label>
      <label>
        Email address
        <input name="email" type="email" value={formData.email} onChange={updateField} placeholder="you@example.com" required />
      </label>
      <label>
        Topic
        <select name="topic" value={formData.topic} onChange={updateField}>
          <option>Component feedback</option>
          <option>React question</option>
          <option>Project collaboration</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" value={formData.message} onChange={updateField} placeholder="Write your message..." rows="4" required />
      </label>
      <Button type="submit">Send message <span aria-hidden="true">↗</span></Button>
      <p className="form-footnote">This is a frontend demo; no email is sent or stored.</p>
    </form>
  );
}

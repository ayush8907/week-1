import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Card from "./components/Card.jsx";
import Button from "./components/Button.jsx";
import ContactForm from "./components/ContactForm.jsx";
import "./App.css";

const initialCards = [
  {
    id: 1,
    title: "Build with reusable pieces",
    category: "COMPONENT DESIGN",
    description: "Create small components that can be reused across a React application without repeating the same markup.",
    action: "Explore component"
  },
  {
    id: 2,
    title: "Pass data through props",
    category: "PROPS",
    description: "Props let a parent component customise the content and behaviour of a child component.",
    action: "Learn about props"
  },
  {
    id: 3,
    title: "Update the interface with state",
    category: "STATE",
    description: "State stores changing data. When it changes, React renders the updated interface for the user.",
    action: "Explore state"
  }
];

export default function App() {
  const [savedCards, setSavedCards] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState("");

  function toggleSaved(id) {
    setSavedCards((current) =>
      current.includes(id)
        ? current.filter((cardId) => cardId !== id)
        : [...current, id]
    );
  }

  function handleFormSubmit(formData) {
    setNotice(`Thanks, ${formData.name}! Your message has been received in this demo.`);
  }

  const cards = showAll
    ? [
        ...initialCards,
        {
          id: 4,
          title: "Compose a page with confidence",
          category: "COMPOSITION",
          description: "Combine a header, cards, buttons, and a form into a consistent page layout.",
          action: "View example"
        },
        {
          id: 5,
          title: "Keep components accessible",
          category: "ACCESSIBILITY",
          description: "Use semantic HTML, clear labels, and keyboard-friendly controls in every component.",
          action: "Read tip"
        }
      ]
    : initialCards;

  return (
    <div className="app">
      <Header
        brand="Component Lab"
        links={[
          { label: "Components", href: "#components" },
          { label: "Contact", href: "#contact" }
        ]}
      />

      <main>
        <section className="hero page-width">
          <p className="eyebrow">REACT PRACTICE / 01</p>
          <h1>Small pieces.<br /><em>Better interfaces.</em></h1>
          <p className="hero-copy">
            A hands-on showcase of reusable React components, props, and state.
            Each section is built as a separate component and brought together here.
          </p>
          <div className="hero-actions">
            <Button onClick={() => document.getElementById("components")?.scrollIntoView({ behavior: "smooth" })}>
              Explore components
            </Button>
            <Button variant="secondary" onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Show fewer cards" : "Show more cards"}
            </Button>
          </div>
          <div className="hero-note"><span className="status-dot" /> Built with React + CSS</div>
        </section>

        <section className="components-section page-width" id="components">
          <div className="section-heading">
            <div>
              <p className="eyebrow">REUSABLE BY DESIGN</p>
              <h2>Component gallery<span>.</span></h2>
            </div>
            <p className="section-note">Saved: {savedCards.length} / {cards.length}</p>
          </div>

          <div className="cards-grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                category={card.category}
                description={card.description}
                action={card.action}
                saved={savedCards.includes(card.id)}
                onSave={() => toggleSaved(card.id)}
                onAction={() => setNotice(`You selected: ${card.title}`)}
              />
            ))}
          </div>
        </section>

        <section className="form-section" id="contact">
          <div className="page-width form-layout">
            <div className="form-intro">
              <p className="eyebrow">COMPONENT 05 / FORM</p>
              <h2>Let's start<br /><em>a conversation.</em></h2>
              <p>This demo form uses controlled React state. Enter your details to see a confirmation message.</p>
              <div className="component-list">
                <span>01 / Header</span>
                <span>02 / Footer</span>
                <span>03 / Card</span>
                <span>04 / Button</span>
                <span>05 / Form</span>
              </div>
            </div>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </section>

        {notice && (
          <div className="toast" role="status">
            <p>{notice}</p>
            <button onClick={() => setNotice("")} aria-label="Dismiss message">×</button>
          </div>
        )}
      </main>

      <Footer brand="Component Lab" year={2026} />
    </div>
  );
}

import Button from "./Button.jsx";

export default function Card({ title, category, description, action, saved, onSave, onAction }) {
  return (
    <article className="component-card">
      <div className="card-topline">
        <span className="card-category">{category}</span>
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          type="button"
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
        >
          {saved ? "Saved ✓" : "Save +"}
        </button>
      </div>
      <div className="card-mark" aria-hidden="true">{title.slice(0, 1)}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-bottom">
        <Button variant="text" onClick={onAction}>{action} <span aria-hidden="true">↗</span></Button>
      </div>
    </article>
  );
}

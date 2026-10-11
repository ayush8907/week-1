export default function Button({ children, variant = "primary", type = "button", onClick, disabled = false }) {
  return (
    <button
      className={`button button-${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

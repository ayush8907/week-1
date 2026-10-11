export default function Header({ brand, links }) {
  return (
    <header className="site-header">
      <div className="page-width nav-inner">
        <a className="brand" href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {brand}<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <span className="header-tag">REACT / UI</span>
      </div>
    </header>
  );
}

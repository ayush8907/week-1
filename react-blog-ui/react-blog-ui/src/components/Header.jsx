export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="container nav-inner">
        <a className="wordmark" href="#top" aria-label="Fieldnotes home">
          fieldnotes<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#latest">Stories</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="mailto:hello@example.com">Get in touch <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}

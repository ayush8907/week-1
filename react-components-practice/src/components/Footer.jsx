export default function Footer({ brand, year }) {
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <a className="brand footer-brand" href="#top">{brand}<span>.</span></a>
        <p>Reusable components, thoughtfully composed.</p>
        <p>© {year} {brand}</p>
      </div>
    </footer>
  );
}

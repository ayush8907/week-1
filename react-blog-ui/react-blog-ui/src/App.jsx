import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import PostCard from "./components/PostCard.jsx";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load blog posts.");
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setError("We couldn't load the posts. Please check that public/posts.json is valid JSON and try again."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const searchableText =
        `${post.title} ${post.excerpt} ${post.author} ${post.category}`.toLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [posts, query, activeCategory]);

  const featuredPost = posts.find((post) => post.featured);

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="hero container">
          <p className="eyebrow">THE JOURNAL / VOL. 01</p>
          <h1>Ideas worth <em>keeping.</em></h1>
          <p className="hero-copy">
            Notes on design, technology, creativity, and the little things
            that make a difference.
          </p>
          <a className="text-link" href="#latest">Explore the journal <span aria-hidden="true">↘</span></a>
        </section>

        {featuredPost && (
          <section className="featured container" aria-label="Featured article">
            <div className="featured-image-wrap">
              <img src={featuredPost.image} alt="" className="featured-image" />
              <span className="image-label">EDITOR'S PICK</span>
            </div>
            <div className="featured-copy">
              <p className="eyebrow">{featuredPost.category} <span>—</span> {featuredPost.readTime}</p>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="byline">By {featuredPost.author} <span>·</span> {formatDate(featuredPost.date)}</div>
            </div>
          </section>
        )}

        <section className="journal container" id="latest">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A FEW THINGS TO READ</p>
              <h2>Latest stories<span className="period">.</span></h2>
            </div>
            <p className="result-count">{filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"}</p>
          </div>

          <div className="tools-row">
            <SearchBar value={query} onChange={setQuery} />
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {loading ? (
            <p className="status-message">Loading stories…</p>
          ) : error ? (
            <p className="status-message error-message">{error}</p>
          ) : filteredPosts.length ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">NO MATCHES</p>
              <h3>Nothing on that page just yet.</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="reset-button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </section>

        <section className="newsletter">
          <div className="container newsletter-inner">
            <div>
              <p className="eyebrow">A NOTE FROM US</p>
              <h2>Good ideas, occasionally.</h2>
              <p>A small collection of things worth reading. No noise.</p>
            </div>
            <a href="mailto:hello@example.com" className="newsletter-link">Say hello <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <a className="wordmark" href="#top">fieldnotes<span>.</span></a>
        <p>Made for curious minds. © 2026 Fieldnotes.</p>
        <a href="#top" className="back-top">Back to top ↑</a>
      </footer>
    </div>
  );
}

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

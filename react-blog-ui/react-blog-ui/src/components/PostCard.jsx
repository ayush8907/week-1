export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <a className="post-image-link" href={`#post-${post.id}`} aria-label={`Read ${post.title}`}>
        <img className="post-image" src={post.image} alt="" loading="lazy" />
        <span className="post-image-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="post-card-body" id={`post-${post.id}`}>
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3>{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-footer">
          <span>{post.author}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  );
}

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

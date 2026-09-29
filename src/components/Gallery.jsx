function Gallery({ images }) {
  return (
    <section className="dashboard-card gallery-card">
      <div className="card-header">
        <h2>Gallery</h2>
        <button className="soft-button" onClick={() => {}}>
          Show more
          <span>→</span>
        </button>
      </div>

      <div className="gallery-content">
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={image}>
              <img src={image} alt={`Gallery photo ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="gallery-dots">
          {images.map((image, index) => (
            <span
              key={image}
              className={["gallery-dot", index === 0 && "active"]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
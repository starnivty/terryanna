import { useEffect, useState } from "react";

function getImageSource(image) {
  if (typeof image === "string") return image;
  return image.src ?? image.image ?? image.url ?? "";
}

function formatCreatedAt(createdAt) {
  if (!createdAt) return "";

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(date);
}

function Gallery({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const visibleImages = images.slice(0, 5);
  const extraImages = images.slice(5);

  useEffect(() => {
    if (!isModalOpen && !selectedPhoto) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (selectedPhoto) setSelectedPhoto(null);
        else setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedPhoto]);

  const selectedImage = selectedPhoto && getImageSource(selectedPhoto.image);
  const selectedImageDate = selectedPhoto &&
    typeof selectedPhoto.image !== "string" &&
    formatCreatedAt(selectedPhoto.image.created_at);

  return (
    <section className="dashboard-card gallery-card">
      <div className="card-header">
        <h2>Gallery</h2>
        {extraImages.length > 0 && (
          <button
            className="soft-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Show more
            <span>→</span>
          </button>
        )}
      </div>

      <div className="gallery-content">
        <div className="gallery-grid">
          {visibleImages.map((image, index) => (
            <button
              className="gallery-item"
              type="button"
              key={`${getImageSource(image)}-${index}`}
              onClick={() => setSelectedPhoto({ image, index })}
            >
              <img src={getImageSource(image)} alt={`Gallery photo ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal show"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content gallery-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="gallery-modal-title">More photos</h2>
              <button
                className="close-modal"
                type="button"
                aria-label="Close gallery"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="gallery-modal-grid">
              {extraImages.map((image, index) => (
                <button
                  className="gallery-modal-item"
                  type="button"
                  key={`${getImageSource(image)}-${index}`}
                  onClick={() => setSelectedPhoto({ image, index: index + 5 })}
                >
                  <img
                    src={getImageSource(image)}
                    alt={`Gallery photo ${index + 6}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div
          className="modal show gallery-detail-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="modal-content gallery-detail-content"
            role="dialog"
            aria-modal="true"
            aria-label="Photo details"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-modal"
              type="button"
              aria-label="Close photo details"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <img
              className="gallery-detail-image"
              src={selectedImage}
              alt={
                typeof selectedPhoto.image === "string"
                  ? `Gallery photo ${selectedPhoto.index + 1}`
                  : selectedPhoto.image.title || `Gallery photo ${selectedPhoto.index + 1}`
              }
            />
            <div className="gallery-detail-copy">
              {typeof selectedPhoto.image !== "string" && selectedPhoto.image.title && (
                <h2>{selectedPhoto.image.title}</h2>
              )}
              {typeof selectedPhoto.image !== "string" && selectedPhoto.image.description && (
                <p>{selectedPhoto.image.description}</p>
              )}
              {selectedImageDate && (
                <time dateTime={selectedPhoto.image.created_at}>
                  {selectedImageDate}
                </time>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
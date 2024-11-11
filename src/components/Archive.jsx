import "../styles/style.css";

export default function Archive({ archive, setArchive }) {
  const handleDeleteFromArchive = (id) => {
    const updatedArchive = archive.filter((item) => item.id !== id);
    setArchive(updatedArchive);
    localStorage.setItem("archive", JSON.stringify(updatedArchive));
  };

  return (
    <div className="archive-section">
      <h2>Archived Tasks</h2>
      {archive.length > 0 ? (
        archive.map((item) => (
          <div key={item.id} className="archived-item card">
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="archived-status">State when archived: {item.status}</p>
              <p className="archived-date">Archived on: {item.createdDate}</p>
              <button
                className="delete-archive-btn"
                onClick={() => handleDeleteFromArchive(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks archived yet.</p>
      )}
    </div>
  );
}

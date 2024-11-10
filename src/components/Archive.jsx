import "../styles/style.css";


export default function Archive({ archive, setArchive }) {
  // Function to handle delete from archive
  const handleDeleteFromArchive = (id) => {
    const updatedArchive = archive.filter((item) => item.id !== id);
    setArchive(updatedArchive);
    localStorage.setItem("archive", JSON.stringify(updatedArchive)); // Update localStorage
  };

  return (
    <div className="archive-section">
      <h2>Archived Tasks</h2>
      {archive.length > 0 ? (
        archive.map((item) => (
          <div key={item.id} className="archived-item card">
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="archived-status">Status: {item.status}</p>
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

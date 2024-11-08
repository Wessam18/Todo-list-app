export default function Archive({ archive }) {
    return (
      <div className="archive-section">
        <h2>Archived Tasks</h2>
        {archive.length > 0 ? (
          archive.map((item) => (
            <div key={item.id} className="archived-item">
              <span>{item.name}</span>
              <span className="archived-date">{`Archived on: ${item.createdDate}`}</span>
            </div>
          ))
        ) : (
          <p>No tasks archived yet.</p>
        )}
      </div>
    );
  }
  
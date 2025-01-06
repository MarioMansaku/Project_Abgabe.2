import React, { useState } from "react";
import { WriteServiceBuch } from '../api/write-buch.service';

const UpdateButton: React.FC<{ id: number; initialData: any }> = ({ id, initialData }) => {
  const [buch, setBuch] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    const service = new WriteServiceBuch();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await service.putBuch(buch, id);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during the update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
      {success && <p>Update successful!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateButton;

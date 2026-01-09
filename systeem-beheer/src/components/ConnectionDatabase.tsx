import { useEffect, useState } from "react";

function ConnectionDatabase() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const url = `https://localhost:7083/api/hardware`;

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Geen respons");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log("e");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHardware();
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Fout: {error}</p>;

  return (
    <div>
      <h2>Fetch</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ConnectionDatabase;

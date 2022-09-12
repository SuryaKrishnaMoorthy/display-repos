import { useState, useEffect } from "react";

import "./styles.css";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch("https://api.github.com/users/facebook/repos");
        const data = await res.json();
        setRepos(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Repos by facebook</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {repos.length &&
        repos.map(({ id, name }) => (
          <p style={{ textAlign: "left" }} key={id}>
            {name}
          </p>
        ))}
    </div>
  );
}

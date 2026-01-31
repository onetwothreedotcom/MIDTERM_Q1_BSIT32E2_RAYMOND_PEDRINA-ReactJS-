import { useState } from "react";

export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState(
    import.meta.env.VITE_DEFAULT_EMAIL || "",
  );
  const [password, setPassword] = useState(
    import.meta.env.VITE_DEFAULT_PASSWORD || "",
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await onLoggedIn({ username, password });
    } catch (ex) {
      setErr(ex.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1> Auth Demo - Login</h1>
      <form onSubmit={handleSubmit}>
        {/* COntrolled Input: Value comes from State */}
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}

import React, { useState } from 'react';

function App() {
  const [topic, setTopic] = useState('');
  const [exportFormat, setExportFormat] = useState('md');
  const [loading, setLoading] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [exportPath, setExportPath] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBlogContent('');
    setExportPath(null);

    try {
      const response = await fetch('http://localhost:4000/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, exportFormat }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate blog');
      }
      const data = await response.json();
      setBlogContent(data.blogContent);
      setExportPath(data.exportPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Blog Agent</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Blog Topic:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>
            Export Format:
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              style={{ marginLeft: 8, padding: 4 }}
            >
              <option value="md">Markdown</option>
              <option value="html">HTML</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 16, padding: '8px 16px' }}>
          {loading ? 'Generating...' : 'Generate Blog'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {exportFormat === 'md' && blogContent && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 20, border: '1px solid #ccc', padding: 10 }}>
          <h2>Generated Blog (Markdown):</h2>
          <pre>{blogContent}</pre>
        </div>
      )}

      {exportFormat === 'html' && exportPath && (
        <div style={{ marginTop: 20 }}>
          <h2>Exported HTML Blog:</h2>
          <a href={`http://localhost:4000/${exportPath.replace(/^.*[\\\/]/, '')}`} target="_blank" rel="noopener noreferrer">
            Open Exported HTML
          </a>
        </div>
      )}
    </div>
  );
}

export default App;

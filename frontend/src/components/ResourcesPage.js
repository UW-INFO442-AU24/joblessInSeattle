import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from "./Navbar.js";

export default function ResourcesPage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthNews = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/resources/health`);
                const filteredArticles = response.data.articles.filter(
                    (article) => article.title.trim().toLowerCase() !== "[removed]"
                );
                setArticles(filteredArticles);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch news");
                setLoading(false);
            }
        };

        fetchHealthNews();
    }, [apiUrl]);

    if (loading) return <p>Loading news...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container my-5" style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
          <h1 className="text-center mb-5">Latest Health News</h1>
          <div className="row">
            {articles.map((article, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100" style={{ backgroundColor: '#fff0f5' }}>
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      className="card-img-top"
                      alt={article.title}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: '180px' }}>
                      <span className="text-muted">No Image Available</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{article.title}</h5>
                    <p className="card-text text-secondary mb-2">
                      {article.author ? `By ${article.author}` : 'Unknown Author'} |{' '}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="card-text">{article.description || "No description available."}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success mt-auto"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <footer className="mt-5">
            <NavBar />
          </footer>
        </div>
      );
    
};
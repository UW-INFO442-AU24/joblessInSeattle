import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthNews = () => {
    const API_URL = "https://newsapi.org/v2/top-headlines";
    const API_KEY = "ya9f03109e1f6413aafbdc160af1c3770";

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthNews = async () => {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        country: "us",
                        category: "health",
                        apiKey: API_KEY,
                    },
                });
                setArticles(response.data.articles);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch news");
                setLoading(false);
            }
        };

        fetchHealthNews();
    }, []);

    if (loading) return <p>Loading news...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1>Latest Health News</h1>
            <div>
                {articles.map((article, index) => (
                    <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                        <h3>{article.title}</h3>
                        <p>{article.description || "No description available."}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthNews;

    // const resources = [
    //     {
    //       name: "World Health Organization",
    //       description: "Directing and coordinating authority on international health within the United Nations system.",
    //       url: "https://www.who.int/",
    //     },
    //     {
    //       name: "Centers for Disease Control and Prevention",
    //       description: "Leading national public health institute of the United States.",
    //       url: "https://www.cdc.gov/",
    //     },
    //     {
    //       name: "Mayo Clinic",
    //       description: "Non-profit organization committed to clinical practice, education, and research.",
    //       url: "https://www.mayoclinic.org/",
    //     }];
    // return (
    //     <div className="container mx-auto p-6">
    //         <h1 className="text-3xl font-bold mb-4">Health Resources</h1>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {resources.map((resource, index) => (
    //             <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
    //                 <h2 className="text-2xl font-semibold mb-2">{resource.name}</h2>
    //                 <p className="text-gray-700 mb-4">{resource.description}</p>
    //                 <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"> Visit Website</a>
    //             </div>
    //             ))}
    //         </div>
    //     </div>
    // )
// }


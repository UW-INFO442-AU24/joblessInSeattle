import React from "react";
//Waiting for routing
export default function ResourcesPage() {
    const resources = [
        {
          name: "World Health Organization",
          description: "Directing and coordinating authority on international health within the United Nations system.",
          url: "https://www.who.int/",
        },
        {
          name: "Centers for Disease Control and Prevention",
          description: "Leading national public health institute of the United States.",
          url: "https://www.cdc.gov/",
        },
        {
          name: "Mayo Clinic",
          description: "Non-profit organization committed to clinical practice, education, and research.",
          url: "https://www.mayoclinic.org/",
        }];
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Health Resources</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-2">{resource.name}</h2>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"> Visit Website</a>
                </div>
                ))}
            </div>
        </div>
    )
}


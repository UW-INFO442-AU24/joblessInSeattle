import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-4">
                Page not found. Return 
                <Link to="/dashboard" className="hover:text-blue-500 hover:underline">Home</Link>
            </p>
        </div>
    );
}
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-bold text-primary/20">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 mb-8">Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
        Back to Home
      </Link>
    </div>
  );
}
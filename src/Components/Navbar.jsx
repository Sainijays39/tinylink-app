import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link 
          to="/" 
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
        >
          TinyLink
        </Link>
      </div>
    </nav>
  );
}

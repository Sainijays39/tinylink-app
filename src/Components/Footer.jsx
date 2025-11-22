import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function Footer(code) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">


        <div>
          <h2 className="text-xl font-semibold text-white mb-3">TinyLink</h2>
          <p className="text-sm text-gray-400">
            A fast and reliable URL shortener built with Node, Express, React, and PostgreSQL.
          </p>
        </div>

  
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="/" className="hover:text-white">Dashboard</a></li>
          </ul>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://github.com/Sainijays39" target="_blank" className="hover:text-white text-2xl">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/jagdish-saini-151038297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="hover:text-white text-2xl">
              <FaLinkedin />
            </a>
          </div>

          <p className="text-gray-400 mt-3 text-sm">
            Email: <a href="mailto:youremail@example.com" className="hover:text-white">
              sainijays39@gmail.com
            </a>
          </p>
        </div>

      </div>

    
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TinyLink — All rights reserved.
      </div>
    </footer>
  );
}

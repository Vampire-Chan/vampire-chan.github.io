import React from 'react';
import { Github, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-vampire-red/10 rounded-lg group-hover:bg-vampire-red/20 transition-colors">
              <Terminal className="w-6 h-6 text-vampire-red" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Vampire-Chan
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/Vampire-Chan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
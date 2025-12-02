import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import type { Repository } from '../types';
import { Link } from 'react-router-dom';

interface RepoCardProps {
  repo: Repository;
  index: number;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-vampire-red to-vampire-purple rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
      <div className="relative h-full bg-black border border-white/10 rounded-xl p-6 hover:bg-zinc-900/50 transition duration-300 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Code className="w-6 h-6 text-vampire-red" />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" />
              {repo.forks_count}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-vampire-red transition-colors">
          {repo.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
          {repo.description || "No description available for this mysterious project..."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-xs font-medium px-2 py-1 bg-zinc-800 rounded-md text-gray-300">
            {repo.language || 'Unknown'}
          </span>
          
          <Link 
            to={`/project/${repo.name}`}
            className="flex items-center text-sm text-vampire-red hover:text-white transition-colors"
          >
            View Details <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RepoCard;
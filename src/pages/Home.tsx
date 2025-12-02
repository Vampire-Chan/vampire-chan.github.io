import React, { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RepoCard from '../components/RepoCard';
import { githubService } from '../services/github';
import type { Repository } from '../types';

const Home: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await githubService.getRepos();
        const sorted = data.sort((a, b) => 
          b.stargazers_count - a.stargazers_count || 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRepos(sorted);
        setFilteredRepos(sorted);
      } catch (error) {
        console.error('Failed to fetch repos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  // Filter Logic
  useEffect(() => {
    const filtered = repos.filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredRepos(filtered);
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchQuery, repos]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-vampire-red selection:text-white">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 whitespace-nowrap">
            Featured Projects
          </h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-gradient-to-r from-vampire-red to-vampire-purple rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-lg flex items-center p-2">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-gray-500 ml-3 w-full"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-zinc-900/50 rounded-xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
              {currentItems.length > 0 ? (
                currentItems.map((repo, index) => (
                  <RepoCard key={repo.id} repo={repo} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                  No projects found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredRepos.length > itemsPerPage && (
              <div className="flex justify-center items-center space-x-6 mt-16">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-white/10 transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-vampire-red text-white'}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <span className="text-gray-400 font-mono">
                  Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                </span>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border border-white/10 transition-all duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-vampire-red text-white'}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 mt-20 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vampire-Chan. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default Home;
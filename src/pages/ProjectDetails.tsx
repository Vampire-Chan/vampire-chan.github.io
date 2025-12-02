import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import { githubService } from '../services/github';
import { ArrowLeft, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      githubService.getReadme(id)
        .then(setContent)
        .catch(() => setContent('# Error loading content'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-vampire-red transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-zinc-900 rounded w-3/4" />
            <div className="h-4 bg-zinc-900 rounded w-full" />
            <div className="h-4 bg-zinc-900 rounded w-5/6" />
            <div className="h-64 bg-zinc-900 rounded w-full" />
          </div>
        ) : (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-red max-w-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 m-0">
                {id}
              </h1>
              <a 
                href={`https://github.com/Vampire-Chan/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium no-underline text-white"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </div>

            <div className="markdown-content bg-zinc-900/30 p-8 rounded-2xl border border-white/5">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-200 mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-400 leading-relaxed mb-4" {...props} />,
                  a: ({node, ...props}) => <a className="text-vampire-red hover:text-white transition-colors underline" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="ml-4" {...props} />,
                  code: ({node, ...props}) => <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-vampire-red font-mono" {...props} />,
                  pre: ({node, ...props}) => <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10 mb-6" {...props} />,
                  img: ({node, ...props}) => <img className="rounded-xl border border-white/10 my-8 max-w-full" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-vampire-red pl-4 italic text-gray-500 my-6" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.article>
        )}
      </main>
    </div>
  );
};

export default ProjectDetails;
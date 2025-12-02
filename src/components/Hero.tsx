import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { githubService } from '../services/github';
import type { UserProfile } from '../types';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    githubService.getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vampire-red/20 via-black to-black opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vampire-purple/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-vampire-red/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-vampire-red to-vampire-purple rounded-full blur opacity-50 animate-pulse" />
          <img 
            src={profile.avatar_url} 
            alt={profile.name}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-black object-cover"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            {profile.name || 'Vampire-Chan'}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center space-x-8 text-gray-400 text-sm md:text-base"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{profile.public_repos}</span>
            <span>Projects</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{profile.followers}</span>
            <span>Followers</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-gray-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { githubService } from '../services/github';
import type { UserProfile } from '../types';
import { ArrowDown, Gamepad2, MapPin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    githubService.getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  const skills = [
    { name: "C / C++", level: "Expert" },
    { name: "Java", level: "Advanced" },
    { name: ".NET (C# & VB)", level: "Advanced" },
    { name: "Python", level: "Basic" },
    { name: "React", level: "Learning" },
    { name: "Flutter", level: "Learning" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vampire-red/10 via-black to-black opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vampire-purple/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-vampire-red/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-vampire-red to-vampire-purple rounded-full blur opacity-50 animate-pulse" />
          <img 
            src={profile.avatar_url} 
            alt="Sarthak Gautam"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black object-cover shadow-2xl"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Sarthak Gautam
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-vampire-red font-mono mb-6"
        >
          @Vampire-Chan
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 text-gray-400 mb-8 text-sm md:text-base"
        >
          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-vampire-red" /> Northern India</span>
          <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-1 text-vampire-purple" /> MCA @ Uttaranchal University ('24-'26)</span>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span key={skill.name} className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-sm text-gray-300 hover:border-vampire-red transition-colors cursor-default">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Game Dev CTA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-zinc-900 to-black border-2 border-vampire-red/50 p-8 rounded-2xl max-w-2xl mx-auto mb-12 hover:border-vampire-red hover:shadow-[0_0_30px_rgba(255,0,51,0.2)] transition-all duration-500 group relative overflow-hidden"
        >
          {/* Animated Background Glint */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite]" />

          <div className="flex items-center justify-center mb-4 relative z-10">
            <Gamepad2 className="w-10 h-10 text-vampire-red mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white">Project JustLive</h3>
          </div>
          <p className="text-gray-400 mb-6 relative z-10">
            My flagship long-term game project. A massive undertaking in C++ and Game Development.
            I'm looking for passionate collaborators to join the journey.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
             <Link 
              to="/project/JustLive"
              className="inline-flex items-center px-6 py-2 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all border border-white/10"
            >
              View Details
            </Link>
            <a 
              href="mailto:114753530+Vampire-Chan@users.noreply.github.com"
              className="inline-flex items-center px-6 py-2 bg-vampire-red text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_30px_rgba(255,0,51,0.5)]"
            >
              Assist / Collaborate
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-gray-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
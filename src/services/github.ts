import axios from 'axios';
import type { Repository, UserProfile } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'Vampire-Chan';

export const githubService = {
  async getProfile(): Promise<UserProfile> {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${USERNAME}`);
    return response.data;
  },

  async getRepos(): Promise<Repository[]> {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`);
    return response.data;
  },

  async getReadme(repoName: string): Promise<string> {
    try {
      // Try main branch first
      const response = await axios.get(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/main/README.md`);
      return response.data;
    } catch {
      try {
        // Fallback to master branch
        const response = await axios.get(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/master/README.md`);
        return response.data;
      } catch {
        return '# No README found';
      }
    }
  }
};
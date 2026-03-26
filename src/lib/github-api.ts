const GITHUB_USERNAME = "joemark2k15-506";
// Use the token from env if available
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const getHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (GITHUB_TOKEN && GITHUB_TOKEN !== "your_personal_access_token_here") {
    // Both 'Bearer' and 'token' prefixes work for GitHub PATs
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }
  
  return headers;
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
      { 
        headers: getHeaders(),
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
      console.warn(`GitHub API repos check failed: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { 
        headers: getHeaders(),
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
      console.warn(`GitHub API user check failed: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export async function getGitHubStats() {
  try {
    const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);

    if (!user) {
      // Hard fallback if user fetch fails entirely
      return {
        repos: 5, // Corrected to user's real count as approximate
        followers: 0,
        totalStars: 0,
        totalForks: 0,
        isFallback: true
      };
    }

    const totalStars = repos ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0) : 0;
    const totalForks = repos ? repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0) : 0;

    return {
      repos: user.public_repos,
      followers: user.followers,
      totalStars,
      totalForks,
      isFallback: false
    };
  } catch (error) {
    console.error("Critical error in getGitHubStats:", error);
    return {
      repos: 5,
      followers: 0,
      totalStars: 0,
      totalForks: 0,
      isFallback: true
    };
  }
}

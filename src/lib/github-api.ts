const GITHUB_USERNAME = "joemark2k15-506";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

interface GitHubRepo {
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

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const getHeaders = (): HeadersInit => {
  if (GITHUB_TOKEN) {
    return {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    };
  }
  return {
    Accept: "application/vnd.github.v3+json",
  };
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      { 
        headers: getHeaders(),
        next: { revalidate: 3600 } 
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repos");
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
      throw new Error("Failed to fetch user");
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

    if (!user || user.public_repos === undefined) {
      // Fallback data if API fails or no token
      return {
        repos: 12,
        followers: 45,
        totalStars: 128,
        totalForks: 32,
        isFallback: true
      };
    }

    const totalStars = repos ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : 0;
    const totalForks = repos ? repos.reduce((sum, repo) => sum + repo.forks_count, 0) : 0;

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
      repos: 12,
      followers: 45,
      totalStars: 128,
      totalForks: 32,
      isFallback: true
    };
  }
}

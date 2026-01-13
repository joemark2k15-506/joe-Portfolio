"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiStar, FiGitBranch, FiUsers } from "react-icons/fi";
import { getGitHubStats } from "@/lib/github-api";
import styles from "./github-stats.module.css";

interface GitHubStatsData {
  repos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  isFallback: boolean;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getGitHubStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading GitHub Activity...</p>
      </div>
    );
  }

  if (!stats) return null;

  const statsData = [
    { icon: <FiGithub />, label: "Repositories", value: stats.repos },
    { icon: <FiStar />, label: "Total Stars", value: stats.totalStars },
    { icon: <FiGitBranch />, label: "Total Forks", value: stats.totalForks },
    { icon: <FiUsers />, label: "Followers", value: stats.followers },
  ];

  return (
    <div className={`${styles.container} scroll-animate`}>
      <h3 className={styles.title}>
        GitHub <span className="gradient-text">Activity</span>
      </h3>
      <div className={styles.grid}>
        {statsData.map((stat, index) => (
          <div key={index} className={`${styles.card} glass`}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
      {stats.isFallback && (
        <p className={styles.fallbackNotice}>* Showing estimated activity</p>
      )}
    </div>
  );
}

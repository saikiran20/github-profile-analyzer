// GitHub service
import axios from "axios";

export const fetchGithubProfile = async (username) => {
  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return {
    user: userResponse.data,
    repos: reposResponse.data
  };
};

export const calculateInsights = (user, repos) => {
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const mostStarredRepo =
    repos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    )[0]?.name || null;

  const accountAgeDays = Math.floor(
    (Date.now() - new Date(user.created_at)) /
    (1000 * 60 * 60 * 24)
  );

  const profileScore =
    user.followers +
    user.public_repos * 2 +
    totalStars * 5;

  return {
    totalStars,
    totalForks,
    mostStarredRepo,
    accountAgeDays,
    profileScore
  };
};
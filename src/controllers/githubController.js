// GitHub controller
import pool from "../config/db.js";
import {
  fetchGithubProfile,
  calculateInsights
} from "../services/githubService.js";

export const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const { user, repos } =
      await fetchGithubProfile(username);

    const insights =
      calculateInsights(user, repos);

    await pool.query(
      `
      INSERT INTO github_profiles(
        username,
        name,
        followers,
        following,
        public_repos,
        total_stars,
        total_forks,
        most_starred_repo,
        account_age_days,
        profile_score,
        avatar_url,
        profile_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user.login,
        user.name,
        user.followers,
        user.following,
        user.public_repos,
        insights.totalStars,
        insights.totalForks,
        insights.mostStarredRepo,
        insights.accountAgeDays,
        insights.profileScore,
        user.avatar_url,
        user.html_url
      ]
    );

    res.status(201).json({
      message: "Profile analyzed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllProfiles = async (
  req,
  res
) => {
  const [profiles] =
    await pool.query(
      `
      SELECT *
      FROM github_profiles
      ORDER BY analyzed_at DESC
      `
    );

  res.json(profiles);
};

export const getProfile = async (
  req,
  res
) => {
  const { username } = req.params;

  const [profile] = await pool.query(
    `
    SELECT *
    FROM github_profiles
    WHERE username = ?
    `,
    [username]
  );

  if (!profile.length) {
    return res
      .status(404)
      .json({ message: "Profile not found" });
  }

  res.json(profile[0]);
};

export const refreshProfile = async (
  req,
  res
) => {
  const { username } = req.params;

  const { user, repos } =
    await fetchGithubProfile(username);

  const insights =
    calculateInsights(user, repos);

  await pool.query(
    `
    UPDATE github_profiles
    SET
      followers=?,
      following=?,
      public_repos=?,
      total_stars=?,
      total_forks=?,
      most_starred_repo=?,
      account_age_days=?,
      profile_score=?,
      analyzed_at=NOW()
    WHERE username=?
    `,
    [
      user.followers,
      user.following,
      user.public_repos,
      insights.totalStars,
      insights.totalForks,
      insights.mostStarredRepo,
      insights.accountAgeDays,
      insights.profileScore,
      username
    ]
  );

  res.json({
    message: "Profile refreshed"
  });
};

export const getTopProfiles = async (
  req,
  res
) => {
  const [profiles] =
    await pool.query(
      `
      SELECT *
      FROM github_profiles
      ORDER BY profile_score DESC
      `
    );

  res.json(profiles);
};
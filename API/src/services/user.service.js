import { db } from "../db.js";

export const updateUserAvatar = async (userId, avatarUrl) => {
  try {
    const query = `UPDATE users SET avatarUrl = $1 WHERE id = $2`;
    const values = [avatarUrl, userId];
    await db.query(query, values);
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw error;
  }
};

export const uploadAvatar = async (userId, avatarUrl) => {
  try {
    const query = `UPDATE users SET   img = '${avatarUrl}' WHERE id = '${userId}'`;
    await db.query(query);
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    const result = await db.query(query);
    return result[0];
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

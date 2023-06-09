import jwt from "jsonwebtoken";
import { uploadAvatar, getUserById } from "../services/user.service.js";

export const updateUserAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatarUrl, token } = req.body;
    console.log("AAAA", avatarUrl);
    const decodedToken = jwt.verify(token, "jwtKey");
    if (decodedToken.userId !== id) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    await uploadAvatar(id, avatarUrl);

    res.json({ success: true, message: "Avatar updated successfully." });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

export const getUserAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({ success: true, avatarUrl: user.avatarUrl });
  } catch (error) {
    console.error("Error getting user avatar:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

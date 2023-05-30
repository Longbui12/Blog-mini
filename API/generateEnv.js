import crypto from "crypto";
import fs from "fs";

// Tạo khóa bí mật
const accessTokenSecret = crypto.randomBytes(64).toString("hex");
const refreshTokenSecret = crypto.randomBytes(64).toString("hex");

// Lưu khóa bí mật vào tệp .env
const envContent = `ACCESS_TOKEN_SECRET=${accessTokenSecret}\nREFRESH_TOKEN_SECRET=${refreshTokenSecret}`;
fs.writeFileSync(".env", envContent);

console.log("Khóa bí mật đã được tạo và lưu trong tệp .env.");

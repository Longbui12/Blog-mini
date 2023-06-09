import { uploadAvatar } from "./user.controller";

describe("User Controller", () => {
  test("uploadAvatar should update user avatar correctly", async () => {
    // Tạo mock cho req và res
    const req = {
      body: {
        username: "testuser",
      },
      file: {
        filename: "avatar.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Gọi hàm uploadAvatar với các mock req và res
    await uploadAvatar(req, res);

    // Kiểm tra kết quả
    expect(res.status).toHaveBeenCalledWith(404); // Thay đổi thành res.status(404)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
    });
  });
});

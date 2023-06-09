// user.service.test.js
const userService = require("./user.service");

describe("User Service", () => {
  const user = {
    // Dữ liệu người dùng giả định
  };

  it("should get user by username", async () => {
    // Thiết lập giả lập cho phương thức getUserByUsername
    userService.getUserByUsername = jest.fn().mockResolvedValue(user);

    // Sử dụng userService.getUserByUsername trong phương thức kiểm tra của bạn
    // Ví dụ:
    const result = await userService.getUserByUsername("username");

    expect(userService.getUserByUsername).toHaveBeenCalled();
    expect(result).toEqual(user);
  });

  it("should save user", async () => {
    // Thiết lập giả lập cho phương thức save
    userService.save = jest.fn().mockResolvedValue(user);

    // Sử dụng userService.save trong phương thức kiểm tra của bạn
    // Ví dụ:
    const result = await userService.save(user);

    expect(userService.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });
});

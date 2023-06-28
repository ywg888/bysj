import { request } from "./util"

describe("用户模块", () => {
  // editUser
  test("编辑用户信息（正常）", async () => {
    const { data } = await request.post("/api/user/editUser", {
      nickname: "test-ywg",
      avatar:
        "http://yangwenguang.oss-cn-nanjing.aliyuncs.com/feed/1660889816032.jpg",
      banner:
        "http://yangwenguang.oss-cn-nanjing.aliyuncs.com/feed/1660889704829.jpg",
      introduce: "测试-我是杨文光",
    })
    expect(data.code).toBe(0)
  })

  test("编辑用户信息（缺少必要参数avatar）", async () => {
    const { data } = await request.post("/api/user/editUser", {
      nickname: "test-ywg",
      banner:
        "http://yangwenguang.oss-cn-nanjing.aliyuncs.com/feed/1660889704829.jpg",
      introduce: "测试-我是杨文光",
    })
    expect(data.code).toBe(10001)
  })

  // getUserInfo
  test("获取用户信息（正常）", async () => {
    const { data } = await request.get("/api/user/getUserInfo")
    expect(data.code).toBe(0)
    expect(data.data.userInfo).not.toBeNull()
  })

  test("获取用户信息（account对应的用户不存在）", async () => {
    const query = new URLSearchParams({
      account: "ywg123",
    })
    const { data } = await request.get(
      "/api/user/getUserInfo?" + query.toString()
    )
    expect(data.code).toBe(10005)
    expect(data.message).toBe("用户不存在")
  })

  // listFollowers
  test("获取所有的关注者（正常）", async () => {
    const query = new URLSearchParams({
      account: "ywg",
    })
    const { data } = await request.get(
      "/api/user/listFollowers?" + query.toString()
    )
    expect(data.code).toBe(0)
    expect(data.data.followers.items.length).toBeGreaterThanOrEqual(0)
  })

  test("获取所有的关注者（account对应的用户不存在）", async () => {
    const query = new URLSearchParams({
      account: "ywg123",
    })
    const { data } = await request.get(
      "/api/user/listFollowers?" + query.toString()
    )
    expect(data.code).toBe(10005)
    expect(data.message).toBe("用户不存在")
  })

  test("获取所有的关注者（缺少必要参数account）", async () => {
    const { data } = await request.get(
      "/api/user/listFollowers"
    )
    expect(data.code).toBe(10001)
  })

  // listConcerns
  test("获取正在关注的所有用户（正常）", async () => {
    const query = new URLSearchParams({
      account: "ywg",
    })
    const { data } = await request.get(
      "/api/user/listConcerns?" + query.toString()
    )
    expect(data.code).toBe(0)
    expect(data.data.concerns.items.length).toBeGreaterThanOrEqual(0)
  })

  test("获取正在关注的所有用户（account对应的用户不存在）", async () => {
    const query = new URLSearchParams({
      account: "ywg123",
    })
    const { data } = await request.get(
      "/api/user/listConcerns?" + query.toString()
    )
    expect(data.code).toBe(10005)
    expect(data.message).toBe("用户不存在")
  })

  test("获取所有的关注者（缺少必要参数account）", async () => {
    const { data } = await request.get(
      "/api/user/listConcerns"
    )
    expect(data.code).toBe(10001)
  })

  // listSearchUsers
  test("获取搜索到的所有用户（正常）", async () => {
    const query = new URLSearchParams({
      keyword: "ywg",
    })
    const { data } = await request.get(
      "/api/user/listSearchUsers?" + query.toString()
    )
    expect(data.code).toBe(0)
    expect(data.data.users.items.length).toBeGreaterThanOrEqual(0)
  })
})

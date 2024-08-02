import axios from "axios"
import { useCallback } from "react"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import relativeTime from "dayjs/plugin/relativeTime"
import { Toast } from "antd-mobile"

dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

export default function useCommon() {
  /**
   * 传入时间
   * @param time
   * @returns
   */
  const formateTime = useCallback((time: number): string => {
    const limit = 7
    // diff的作用就是求传入时间戳相比于当前时间戳间隔了多久。第二个参数指定单位
    // 这里的if判断：如果传入的时间距离当前时间超过7天，那就转换为YYYY-MM-DD的日期格式
    if (dayjs().diff(time, "day") > limit) {
      return dayjs(time).format("YYYY-MM-DD")
    }
    // 如果没超过7天，那就显示传入时间距离当前时间间隔了多久
    return dayjs(time).fromNow()
  }, [])

  /**
   * 传入Blob类型的图片数据
   */
  const upload = useCallback(async (file: Blob) => {
    const query = new URLSearchParams({
      urlname: Date.now() + ".jpg",
    })
    const res = await axios.get(`/api/upload?` + query.toString())
    const { url } = res.data.data
    // 拿到访问路径，就可以向后端发请求了
    const visitUrl = url.split("?")[0]
    // 异步上传即可
    await axios.put(url, file, {
      headers: { "Content-Type": "image/jpg" },
      onUploadProgress: (process: any) => {
        let percent = Math.ceil((process.loaded / process.total) * 100) + "%"
        Toast.show({ content: percent })
      },
    })

    return visitUrl
  }, [])
  return { formateTime, upload }
}

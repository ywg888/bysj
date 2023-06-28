import axios from "axios"
import { useCallback } from "react"

export default function useImage() {
  /**
   * 传入Blob类型的图片数据
   */
  const uploadOSS = useCallback(async (url: string, file: Blob) => {
    // 异步上传即可
    await axios.put(url, file, {
      headers: { "Content-Type": "image/jpg" },
    })
  }, [])

  return { uploadOSS }
}

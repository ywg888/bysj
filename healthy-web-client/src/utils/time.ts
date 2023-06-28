/**
 * 时间转换器
 * @param seconds 总秒数
 * @describe 该函数能够将秒数转换为时分秒显示
 */
export const timeFormate = (seconds: number) => {
  let result = seconds
  let h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600)
  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60)
  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60)

  let res = ""
  if (h !== "00") res += `${h}时 `
  if (m !== "00") res += `${m}分 `
  res += `${s}秒`
  return res
}

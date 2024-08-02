import { ReportHandler } from "web-vitals"

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      // FCP：首次内容加载时间，也就是白屏时间
      getFCP(onPerfEntry)
      // LCP：主要内容加载完成时间，也就是首屏加载时间
      getLCP(onPerfEntry)
      // TTFB：首字节到达的时间点
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals

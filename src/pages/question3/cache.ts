import Axios from "axios"

interface Option {
  cacheKey: string;
}
interface CacheInfo { // 缓存数据
  status: string; // PENDING SUCCESS FAIL
  response: any; // 请求响应数据
  resolves: any[]; // 成功的异步队列
  rejects: any[]; // 失败的队列
}

const dict = new Map<string, CacheInfo>()

// 更新缓存
const setCache = (cacheKey: string, info: CacheInfo) => {
  dict.set(cacheKey, {
    ...(dict.get(cacheKey) || {}),
    ...info,
  })
}

// 更新缓存，并且通知队列更新状态
const notify = (cacheKey: string, value: any, status: string) => {
  const info = dict.get(cacheKey)
  let queue: any[] = []

  if (status === "SUCCESS") {
    queue = info?.resolves || []
  } else if (status === "FAIL") {
    queue = info?.rejects || []
  }

  while (queue.length) {
    const cb = queue.shift()
    cb(value)
  }

  setCache(cacheKey, {
    status,
    response: value,
    resolves: [],
    rejects: [],
  })
}

// 发起请求
const handleRequest = (url: string, cacheKey: string) => {
  setCache(cacheKey, {
    status: "PENDING",
    response: null,
    resolves: [],
    rejects: [],
  })

  const request = Axios(url)

  return request.then((res: any) => {
    // 返回成功，则刷新缓存，并且通知给并发队列中的所有请求
    // setCache(cacheKey, {
    //   ...(dict.get(cacheKey)),
    //   status: 'SUCCESS',
    //   response: res,
    // })
    notify(cacheKey, res, "SUCCESS")
    return Promise.resolve(res)
  }).catch((err: any) => {
    // 返回失败， 刷新缓存，并通知队列
    // setCache(cacheKey, { status: 'FAIL' })
    notify(cacheKey, err, "FAIL")
    return Promise.reject(err)
  })
}

// 缓存请求
// eslint-disable-next-line consistent-return
const cacheRequest = (target: string, option = {} as Option) => {
  const cacheKey = option.cacheKey || target

  const cacheInfo = dict.get(cacheKey)
  // 没有缓存时，发起真实的请求
  if (!cacheInfo) {
    return handleRequest(target, cacheKey)
  }

  const { status } = cacheInfo
  // 有缓存时，查看请求状态
  if (status === "SUCCESS") {
    return Promise.resolve(cacheInfo.response)
  }

  // 缓存正在pending时
  if (status === "PENDING") {
    return new Promise((resolve, reject) => {
      cacheInfo.resolves.push(resolve)
      cacheInfo.rejects.push(reject)
    })
  }

  // 缓存失败时，重新发起请求
  if (status === "FAIL") {
    return handleRequest(target, cacheKey)
  }
}

export default cacheRequest

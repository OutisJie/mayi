import { Button } from 'antd'
import React, { FC, useState } from 'react'
import cacheRequest from './cache'

const Q3: FC = () => {
  const [data, setData] = useState<unknown>()

  const singleRequest = (url: string) => {
    cacheRequest(url)?.then(res => {
      setData(res.data)
    }).catch(err => {
      setData('error')
    }).finally(() => {
      console.log('请求结束')
    })
  }

  const multiRequestSuccess = () => {
    Promise.all([singleRequest('/success'), singleRequest('/success')])
  }

  const multiRequestFail = () => {
    Promise.all([singleRequest('/error'), singleRequest('/error')])
  }
  return (
    <div>
      <Button onClick={() => singleRequest('/single')} >单个请求</Button>
      <Button onClick={multiRequestSuccess}>并发成功请求</Button>
      <Button onClick={multiRequestFail}>并发失败请求</Button>

      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Q3

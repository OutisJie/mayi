import { Button, Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import find from './find'

const Q2: FC = () => {
  const [filterConfig, setFilterConfig] = useState('')
  const [orderKey, setOrderKey] = useState('')
  const [orderMode, setOrderMode] = useState('desc') // 默认降序
  const [result, setResult] = useState([] as any[])
  const data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
  ]

  const handleCalc = () => {
    console.log(filterConfig)
    try {
      const result = find(data).where(JSON.parse(filterConfig)).orderBy(orderKey, orderMode)
      setResult(result.valueOf())
      console.log('result:', result)
    } catch(e) {
      alert('请输入正确格式的数据')
    }
  }

  // const parseJson = (jsonStr: string) => {
  //   return JSON.parse(jsonStr, (k, v) => {
  //     try{
  //       // 将正则字符串转成正则对象
  //       if (eval(v) instanceof RegExp) {
  //         return eval(v);
  //       }
  //     }catch(e){
  //       // nothing
  //     }
  
  //     return v;
  //   });
  // }

  return (
    <div>
      <div>
        对于数据：
        {
          `data = [
            { userId: 8, title: 'title1' },
            { userId: 11, title: 'other' },
            { userId: 15, title: null },
            { userId: 19, title: 'title2' }
          ]`
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        find(data).where(
          <Input placeholder="请输入json格式的对象" value={filterConfig} onChange={(e) => setFilterConfig(e.target.value)} />
        ).orderBy(
          <Input placeholder="请输入要排序的key" value={orderKey} onChange={e => setOrderKey(e.target.value)} />, 
          <Input placeholder="请输入desc/asc" value={orderMode} onChange={e => setOrderMode(e.target.value)}/>
        )
      </div>
      <Button onClick={handleCalc}>计算</Button>
      <div>
        输出：
      {
          JSON.stringify(result)
        }
      </div>

      <div style={{ marginTop: '30px' }}>
        {`find(data).where({ "title": /\d$/ }).orderBy("userId", "desc")`}
        <div>
          输出：
          {JSON.stringify(find(data).where({title: /\d$/}).orderBy("userId", "desc").valueOf())}
        </div>
      </div>
    </div>
  )
}

export default Q2
import React, { FC, useState } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import papaparse from 'papaparse' // 解析csv文件
import jschardet from 'jschardet' // 编码识别

class Person {
  public name: string
  public age: number
  public parent: Person[]
  public children: Person[]
  constructor(name: string, age: number, parent?: Person[], children?: Person[]) {
    this.name = name
    this.age = age
    this.parent = parent || []
    this.children = children || []
  }
}

const Q1: FC = () => {
  // const [incameData, setIncameData] = useState('')
  const [outputData, setOutputData] = useState([] as unknown[])
  const [formatData, setFormatData] = useState([] as Person[])

  // 检查编排
  const checkEncoding = (base64Str: any) => {
    const str = atob(base64Str.split(';base64,')[1]) // stob,用于解码使用base64编码的字符
    let temp = jschardet.detect(str)
    let encoding = temp.encoding

    if (encoding === 'windows-1252') {
      encoding = "ANSI"
    }
    return encoding
  }

  // 转化
  const format = (outputData: any[]) => {
    const list = []
    for(let i = 0; i < outputData.length; i++) {
      let temp = new Person(outputData[i].name, outputData[i].age, [])
      list.push(temp)
    }

    // 确认父子关系
    for (let i = 0; i < list.length; i++) {
      let current = list[i]
      // 出到每个人的父母名字
      let currentParentNames = outputData[i].parent ? outputData[i].parent.split(',') : []
      console.log('names', currentParentNames)
      for (let j = 0; j < list.length; j++) {
        if (currentParentNames.includes(list[j].name)) {
          current.parent.push(list[j])
          list[j].children.push(current)
        }
      }
    }
    setFormatData(list)
    console.log('问题1 csv转Json：', JSON.stringify(outputData))
    console.log('问题1 JSON转对象：', list)
  }

  return (
    <div>
      <Upload
        beforeUpload={file => {
          const fReader = new FileReader()
          fReader.readAsDataURL(file) // readAsDataURL读取本地文件 得到的是一个base64的值
          fReader.onload = (e) => {
            const data = e.target?.result
            const encoding = checkEncoding(data)
            // setIncameData(String(data))
            papaparse.parse(file, {
              encoding: encoding,
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                console.log('outcame:', JSON.stringify(results.data))
                setOutputData(results.data)
                format(results.data)
              }
            })

          }
          return false
        }}
      >
        <Button>
          <UploadOutlined /> 点击上传csv
      </Button>
      </Upload>
      {/* <div>输入：{incameData}</div> */}
      <div>csv转JSON：{JSON.stringify(outputData)}</div>
      <div>JSON转对象, 可能会产生循环引用，请查看console</div>
    </div>

  )
}

export default Q1
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/class-name-casing */
class find {
  private hasInitValue!: boolean

  private value!: any[]

  constructor(value?: any[]) {
    let hasInitValue = true
    if (value === undefined) {
      value = []
      hasInitValue = false
    }
    Object.defineProperties(this, {
      value: { // 存储每次调用的值
        enumerable: true,
        value,
      },
      hasInitValue: {
        enumerable: false,
        value: hasInitValue,
      },
    })
  }

  where(...args: any[]) {
    let newValue: any[] = this.hasInitValue ? this.value : []
    if (args.length !== 0) {
      const condition = args.shift() // 获取过滤条件
      // newValue = this.hasInitValue ? this.value : []
      // 这里只考虑正则匹配或者值相等两种情况
      Object.keys(condition).forEach((key) => {
        if (Object.prototype.toString.call(condition[key]) === "[object String]"
        || Object.prototype.toString.call(condition[key]) === "[object Number]") {
          newValue = newValue.filter((p) => p[key] === condition[key])
        } else if (Object.prototype.toString.call(condition[key]) === "[object RegExp]") {
          newValue = newValue.filter((p) => condition[key].test(p[key]))
        }
      })
    }
    return new find(newValue) // 每次调用都需要生成一个新的实例
  }

  orderBy(...args: any[]) {
    const [key, mode] = args
    let newValue: any[] = this.hasInitValue ? this.value : []

    // 降序
    if (mode === "asc") {
      newValue = newValue.sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      })
    } else if (mode === "desc") {
      newValue = newValue.sort((a, b) => {
        if (a[key] < b[key]) return 1
        if (a[key] > b[key]) return -1
        return 0
      })
    }
    return new find(newValue)
  }

  // 隐式转换
  toJSON() {
    return this.valueOf()
  }

  toString() {
    return String(this.valueOf())
  }

  valueOf() {
    return this.value
  }

  [Symbol.toPrimitive](hint?: string) {
    const { value } = this
    if (hint === "string") {
      return String(value)
    }
    return value
  }
}

export default (data: any[]) => new find(data)

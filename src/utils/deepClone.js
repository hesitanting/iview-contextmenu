/**
 * 获取变量类型
 * @param {any} any 任意变量
 */
const getType = any => Object.prototype.toString.call(any).replace(/\[object\s(.+)\]/, '$1').toLowerCase()

/**
 * 深度拷贝对象或数组 (避免一层死循环)
 * @param {Object|Array} obj 需要拷贝的对象或数组
 */
const deepClone = obj => {
  const type = getType(obj)

  // 类型校验
  let _root
  switch (type) {
    case 'object': _root = {}; break
    case 'array': _root = []; break
    default: return obj
  }

  // 循环数组栈
  const loopList = [
    {
      parent: _root,
      key: undefined,
      data: obj
    }
  ]

  while (loopList.length) {
    // 先入后出，深度优先
    const node = loopList.pop()
    const { parent, key, data } = node
    const type = getType(data)

    // 初始化克隆对象_root
    let res = parent
    if (getType(key) !== 'undefined') {
      res = parent[key] = type === 'array' ? [] : {}
    }

    for (let i in data) {
      let _data = data[i]
      let _type = getType(_data)
      if (type === 'array' || (type === 'object' && Object.prototype.hasOwnProperty.call(data, i))) {
        // 避免一层死循环
        if (_data === data) {
          res[i] = res
        } else if (_type === 'object' || _type === 'array') {
          loopList.push({
            parent: res,
            key: i,
            data: _data
          })
        } else {
          res[i] = _data
        }
      }
    }
  }

  return _root
}

export default deepClone

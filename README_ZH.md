# iview-contextmenu

![version](https://img.shields.io/github/package-json/v/qmhc/iview-contextmenu.svg)
[![NPM download](https://img.shields.io/npm/v/iview-contextmenu.svg)](https://www.npmjs.com/package/iview-contextmenu)
[![license](https://img.shields.io/github/license/qmhc/iview-contextmenu.svg)](http://opensource.org/licenses/MIT)

一个基于iView的Dropdown开发的右键菜单组件。

## 演示

![demo](./public/demo.gif)

[Engilsh](./README.md) | **中文**

## 安装

使用 npm:
```
npm install iview-contextmenu
```

## 用法

一个简单的例子:
```vue
<template>
  <div @contextmenu.prevent="preventContextmenu">
    <Contextmenu
      :menu-data="menuData"
      @on-select="handleSelect"
      @on-cancel="handleCancel"
    ></Contextmenu>
  </div>
</template>

<script>
import Contextmenu from 'iview-contextmenu'
import 'iview-contextmenu/dist/iview-contextmenu.css'

export default {
  name: 'app',
  components: {
    Contextmenu
  },
  data () {
    return {
      menuData: [
        {
          title: '菜单1',
          name: 'menu1'
        },
        {
          title: '菜单2',
          name: 'menu2',
          shortcut: 'Ctrl+J'
        },
        {
          title: '菜单3',
          name: 'menu3',
          divided: true,
          disabled: true
        }
      ]
    }
  },
  methods: {
    handleSelect (name) {
      console.log(`选择了菜单: ${name}`)
    },
    handleCancel () {
      console.log('取消了右键菜单')
    },
    preventContextmenu () {
      return false
    }
  }
}
</script>
```

## 属性

|属性|说明|类型|默认值|
|---|---|---|---|
|menu-data|一个包含菜单数据的数组|Array|-|
|trigger|设置为 `'custom'` 时结合可以手动控制显示状态|String|''|
|visible|手动控制右键菜单的显示状态, 在设置 trigger = 'custom' 时使用|Boolean|false|

## 事件

|事件名|说明|返回值|
|---|---|---|
|on-select|当选择了某个具体的菜单选项时会触发, 如果触发的是一个子级菜单, 则返回值会是像 'parentName-childName' 的形式|ContextmenuItem's prefixName|
|on-cancel|点击了菜单外部来关闭菜单时触发|-|

## 参数

|名称|说明|类型|默认值|
|---|---|---|---|
|title|菜单的标题|String|-|
|name|用来标识该项, 在整个菜单中应该唯一|String|-|
|visible|隐藏该项|Boolean|true|
|divided|显示分割线|Boolean|false|
|desabled|禁用该项|Boolean|false|
|icon|右侧图标的 type 值, 若存在子级菜单, 则会被忽略|String|-|
|shortcut|右侧显示的文字, 若设置了 icon 或存在子级菜单, 则会被忽略|String|-|
|children|该项的子级菜单|Array|-|
|prefix|该项的前缀名, 选取子级菜单时会拼接在其 name 值前, 若不设置则默认使用该项 name 值|String|-|
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, iview-contextmenu
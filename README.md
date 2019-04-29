# iview-contextmenu

![version](https://img.shields.io/github/package-json/v/qmhc/iview-contextmenu.svg)
[![NPM download](https://img.shields.io/npm/v/iview-contextmenu.svg)](https://www.npmjs.com/package/iview-contextmenu)
[![license](https://img.shields.io/github/license/qmhc/iview-contextmenu.svg)](http://opensource.org/licenses/MIT)

A contextmenu component depend on iview-dropdown component.

## Demo

![demo](./public/demo.gif)

**Engilsh** | [中文](./README_ZH.md)

## Install

Using npm:
```
npm install iview-contextmenu
```

## Usage

A simple Example:
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
          title: 'Menu1',
          name: 'menu1'
        },
        {
          title: 'Menu2',
          name: 'menu2',
          shortcut: 'Ctrl+J'
        },
        {
          title: 'Menu3',
          name: 'menu3',
          divided: true,
          disabled: true
        }
      ]
    }
  },
  methods: {
    handleSelect (name) {
      console.log(`select contextmenu: ${name}`)
    },
    handleCancel () {
      console.log('cancel contextmenu')
    },
    preventContextmenu () {
      return false
    }
  }
}
</script>
```

## Props

|Property|Desciption|Type|Default|
|---|---|---|---|
|menu-data|An Array that generates the contextmenu.|Array|-|
|trigger|Set to `'custom'` to control visible manually.|String|''|
|visible|Control the display of Contextmenu manually, used when trigger = 'custom'.|Boolean|false|

## Events

|Event Name|Description|Return Value|
|---|---|---|
|on-select|Emit when clicking the contextmenu item, the return value will be 'parentName-childName' when clicking the child menu.|ContextmenuItem's prefixName|
|on-cancel|Triggered when click the outside body.|-|

## Params

|Key|Description|Type|Default|
|---|---|---|---|
|title|Item's title.|String|-|
|name|Used to tag the item.|String|-|
|visible|Used to hidden the item.|Boolean|true|
|divided|Show spilt line.|Boolean|false|
|desabled|Used to disable the item.|Boolean|false|
|icon|Right icon Type, it will be ignored when item has children.|String|-|
|shortcut|Right text content, it wiil be ignored when 'icon' is set or the 'children' is not null.|String|-|
|children|The son item|Array|-|
|prefix|Tag the children name when to select item's children.|String|-|

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, iview-contextmenu
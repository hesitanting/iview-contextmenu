<template>
  <div
    id="app"
    @contextmenu.prevent="preventContextmenu"
  >
    <Contextmenu
      item-class="my-item"
      :menu-data="menuData"
      :render="rootRender"
      @on-select="handleSelect"
      @on-cancel="handleCancel"
    >
      <template #item="{ data }">
        <span
          class="ivu-contextmenu-item-flex"
          :style="{color: data.disabled ? 'gary' : 'red'}"
        >
          {{ data.title }}
          <Icon
            v-if="data.children && data.children.length"
            type="ios-arrow-forward"
          ></Icon>
          <Icon
            v-if="data.icon"
            :type="data.icon"
          ></Icon>
        </span>
      </template>
    </Contextmenu>
  </div>
</template>

<script>
import Contextmenu from './components/Contextmenu'

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
          name: 'menu1',
          render: (h, data) => {
            return h('span', [ data.title ])
          }
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
        },
        {
          title: '菜单4',
          name: 'menu4',
          children: [
            {
              title: '子菜单1',
              name: 'sonMenu1',
              icon: 'md-checkmark'
            },
            {
              title: '子菜单2',
              name: 'sonMenu2'
            },
            {
              title: '更多',
              name: 'more',
              divided: true,
              children: [
                {
                  title: '子菜单3',
                  name: 'sonMenu3'
                },
                {
                  title: '子菜单4',
                  name: 'sonMenu4'
                }
              ]
            }
          ]
        },
        {
          title: '菜单5',
          name: 'menu5',
          disabled: true,
          children: [
            {
              title: '子菜单5',
              name: 'sonMenu5'
            }
          ]
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
    },
    rootRender (h, data) {
      return h('span', [ data.title ])
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
body {
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>

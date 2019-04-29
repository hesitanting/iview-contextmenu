<template>
  <Dropdown
    transfer
    class="contextmenu"
    transfer-class-name="contextmenu-list"
    ref="contextMenu"
    placement="right-start"
    trigger="custom"
    :visible="currentVisible"
    :stop-propagation="true"
    @on-clickoutside="handleCancel"
  >
    <DropdownMenu
      @click.native.stop
      slot="list"
    >
      <template v-for="(item, index) in localMenuData">
        <ContextmenuItem
          v-if="item.visible !== false"
          :key="index"
          :item-class="enterItem === item.name ? 'expand' : ''"
          :visible="enterItem === item.name"
          :data="item"
          :prefix="item.prefix || item.name"
          @mouseenter.native="handleMouseEnter(item.name)"
        ></ContextmenuItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import ContextmenuItem from './ContextmenuItem'
import deepClone from '@/utils/deepClone'

export default {
  name: 'Contextmenu',
  components: {
    ContextmenuItem
  },
  props: {
    menuData: {
      type: Array,
      required: true
    },
    trigger: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      locator: null,
      enterItem: '',
      currentVisible: this.visible,
      posX: 0,
      posY: 0
    }
  },
  computed: {
    localMenuData () {
      return deepClone(this.menuData)
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.createLocator()
      } else {
        this.removeLocator()
      }
      this.currentVisible = value
      if (!value) {
        this.enterItem = ''
      }
    }
  },
  methods: {
    createLocator () {
      const contextmenu = this.$refs.contextMenu
      const locator = document.createElement('div')
      locator.style.cssText = `position:fixed;left:${this.posX}px;top:${this.posY}px`
      document.body.appendChild(locator)
      contextmenu.$refs.reference = locator
      this.locator = locator
    },
    removeLocator () {
      if (this.locator) document.body.removeChild(this.locator)
      this.locator = null
    },
    handleContextmenu ({ button, clientX, clientY }) {
      if (button === 2) {
        if (this.posX !== clientX) this.posX = clientX
        if (this.posY !== clientY) this.posY = clientY
        if (this.trigger !== 'custom') {
          this.createLocator()
          this.currentVisible = true
        }
      }
    },
    handleMouseEnter (name) {
      if (this.currentVisible) {
        this.enterItem = name
      }
    },
    handleSelect (name) {
      this.currentVisible = false
      this.enterItem = ''
      this.removeLocator()
      this.$emit('on-select', name)
    },
    handleCancel () {
      this.currentVisible = false
      this.enterItem = ''
      this.removeLocator()
      this.$emit('on-cancel')
    }
  },
  mounted () {
    document.addEventListener('contextmenu', this.handleContextmenu, true)
    document.addEventListener('mouseup', this.handleContextmenu, true)
    this.$on('on-select-item', name => this.handleSelect(name))
  },
  destroyed () {
    document.removeEventListener('contextmenu', this.handleContextmenu, true)
    document.removeEventListener('mouseup', this.handleContextmenu, true)
  }
}
</script>

<style>
.contextmenu {
  display: none;
}
.contextmenu-list {
  max-height: none;
}
.contextmenu-list .expand {
  background: #f3f3f3;
}
.contextmenu-list .ivu-dropdown {
  width: 100%;
}
.contextmenu-list .ivu-dropdown-menu {
  min-width: 140px;
}
.contextmenu-list .flex-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
</style>

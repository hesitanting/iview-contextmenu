<template>
  <Dropdown
    transfer
    :class="[prefixCls]"
    :transfer-class-name="`${prefixCls}-list`"
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
          :expand="enterItem === item.name"
          :visible="enterItem === item.name"
          :data="item"
          :item-class="itemClass"
          :prefix="item.prefix || item.name"
          :render="render"
          @mouseenter.native="handleMouseEnter(item.name)"
        >
          <template #item="{ data }">
            <slot name="item" :data="data">
              <RenderItem
                v-if="data.render"
                :data="data"
                :render="data.render"
              ></RenderItem>
              <RenderItem
                v-else-if="rootRender"
                :data="data"
                :render="rootRender"
              ></RenderItem>
            </slot>
          </template>
        </ContextmenuItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import ContextmenuItem from './ContextmenuItem'
import RenderItem from './RenderItem'
import deepClone from '@/utils/deepClone'

const prefixCls = 'ivu-contextmenu'

export default {
  name: 'Contextmenu',
  components: { ContextmenuItem, RenderItem },
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
    },
    itemClass: {
      type: String
    },
    render: {
      type: Function
    }
  },
  data () {
    return {
      prefixCls,
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
    },
    rootRender () {
      return this.render || null
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
.ivu-contextmenu {
  display: none;
}
.ivu-contextmenu-list {
  max-height: none;
}
.ivu-contextmenu-list .ivu-contextmenu-item-expand {
  background: #f3f3f3;
}
.ivu-contextmenu-list .ivu-dropdown {
  width: 100%;
}
.ivu-contextmenu-list .ivu-dropdown-menu {
  min-width: 140px;
}
.ivu-contextmenu-list .ivu-contextmenu-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
</style>

<template>
  <Dropdown
    v-if="hasChildren && !data.disabled"
    transfer
    trigger="custom"
    transfer-class-name="contextmenu-list"
    placement="right-start"
    :visible="currentVisible"
    @on-clickoutside="handleCancel"
  >
    <DropdownItem
      :name="data.name"
      :divided="data.divided"
      :class="itemClass"
      @click.native.prevent.stop
    >
      <span class="flex-item">
        {{ data.title }}
        <Icon type="ios-arrow-forward"></Icon>
      </span>
    </DropdownItem>
    <DropdownMenu slot="list">
      <template v-for="(item, index) in children">
        <ContextMenuItem
          v-if="item.visible !== false"
          :key="index"
          :item-class="enterItem === item.name ? 'expand' : ''"
          :data="item"
          :prefix="`${prefixName}-${item.prefix || item.name}`"
          :visible="enterItem === item.name"
          @mouseenter.native="handleMouseEnter(item.name)"
        ></ContextMenuItem>
      </template>
    </DropdownMenu>
  </Dropdown>
  <DropdownItem
    v-else
    :name="data.name"
    :disabled="data.disabled"
    :divided="data.divided"
    @click.native="handleSelect"
  >
    <span class="flex-item">
      {{ data.title }}
      <Icon
        v-if="hasChildren"
        type="ios-arrow-forward"
      ></Icon>
      <Icon
        v-else-if="data.icon"
        :type="data.icon"
      ></Icon>
      <span
        v-else
        style="color: #808695"
      >
        {{ data.shortcut }}
      </span>
    </span>
  </DropdownItem>
</template>

<script>
export default {
  name: 'ContextMenuItem',
  props: {
    data: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentVisible: this.visible,
      enterItem: '',
      prefixName: this.prefix
    }
  },
  computed: {
    children () {
      return this.data.children
    },
    hasChildren () {
      return !!(this.children && this.children.length)
    },
    trigger () {
      return this.data.trigger || 'hover'
    }
  },
  watch: {
    visible (value) {
      this.currentVisible = value
      if (!value) {
        this.enterItem = ''
      }
    }
  },
  methods: {
    dispatch (component, event, params) {
      let parent = this
      let name = ''
      do {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      } while (parent && (!name || name !== component))
      if (parent) {
        parent.$emit.apply(parent, [event].concat(params))
      }
    },
    handleMouseEnter (name) {
      // 该判断防止在关闭动画中展开下级菜单
      if (this.currentVisible) {
        this.enterItem = name
      }
    },
    handleSelect () {
      this.enterItem = ''
      this.dispatch('Contextmenu', 'on-select-item', this.prefixName)
    },
    handleCancel () {
      this.enterItem = ''
    }
  }
}
</script>

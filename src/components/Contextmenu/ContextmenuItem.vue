<template>
  <Dropdown
    v-if="hasChildren && !data.disabled"
    transfer
    trigger="custom"
    :transfer-class-name="`${prefixCls}-list`"
    placement="right-start"
    :visible="currentVisible"
    @on-clickoutside="handleCancel"
  >
    <DropdownItem
      :name="data.name"
      :divided="data.divided"
      :class="className"
      @click.native.prevent.stop
    >
      <slot name="item" :data="data">
        <span :class="`${prefixCls}-item-flex`">
          {{ data.title }}
          <Icon type="ios-arrow-forward"></Icon>
        </span>
      </slot>
    </DropdownItem>
    <DropdownMenu slot="list">
      <template v-for="(item, index) in children">
        <ContextMenuItem
          v-if="item.visible !== false"
          :key="index"
          :expand="enterItem === item.name"
          :data="item"
          :item-class="itemClass"
          :prefix="`${prefixName}-${item.prefix || item.name}`"
          :visible="enterItem === item.name"
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
        </ContextMenuItem>
      </template>
    </DropdownMenu>
  </Dropdown>
  <DropdownItem
    v-else
    :name="data.name"
    :class="className"
    :disabled="data.disabled"
    :divided="data.divided"
    @click.native="handleSelect"
  >
    <slot name="item" :data="data">
      <span :class="`${prefixCls}-item-flex`">
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
    </slot>
  </DropdownItem>
</template>

<script>
import RenderItem from './RenderItem'

const prefixCls = 'ivu-contextmenu'

export default {
  name: 'ContextMenuItem',
  components: { RenderItem },
  props: {
    data: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: String,
      default: ''
    },
    render: {
      type: Function
    }
  },
  data () {
    return {
      prefixCls,
      currentVisible: this.visible,
      enterItem: '',
      prefixName: this.prefix || this.data.name
    }
  },
  computed: {
    children () {
      return this.data.children
    },
    hasChildren () {
      return !!(this.children && this.children.length)
    },
    className () {
      return {
        [`${prefixCls}-item-expand`]: this.expand,
        [this.itemClass]: this.itemClass
      }
    },
    rootRender () {
      return this.render || null
    }
  },
  watch: {
    visible (value) {
      this.currentVisible = value
      if (!value) {
        this.enterItem = ''
      }
    },
    currentVisible (value) {
      this.$emit('on-toggle', value)
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
      if (this.data.visible && !this.data.disabled) {
        this.dispatch('Contextmenu', 'on-select-item', this.prefixName)
      }
    },
    handleCancel () {
      this.enterItem = ''
    }
  }
}
</script>

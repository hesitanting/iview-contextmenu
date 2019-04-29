import Contextmenu from './components/Contextmenu'

const components = {
  Contextmenu
}

const install = function (Vue) {
  Object.entries(components).forEach(([ name, component ]) => {
    Vue.component(name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}

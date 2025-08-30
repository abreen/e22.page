import './style.scss'
import './search.scss'
import './header.scss'
import './collapse.scss'

import mountSearch from './search'
import mountHeader from './header'
//import mountMenu from './menu'
import mountCollapse from './collapse'

document.addEventListener('DOMContentLoaded', () => {
  const components = {search: mountSearch, header: mountHeader, collapse: mountCollapse}

  Object.entries(components).forEach(([name, mount]) => {
    try {
      mount()
    } catch (err) {
      console.error(`failed to mount ${name} component`)
    }
  })
})

function setTabIndex(header: HTMLElement, tabIndex: number) {
  const links = header.querySelectorAll('a')
  if (!links) {
    return
  }

  links.forEach(el => {
    console.log(tabIndex)
    el.tabIndex = tabIndex
  })
}

function getElement(parent: Document | Element, selector: string): HTMLElement {
  const el = parent.querySelector(selector)
  if (!el) {
    throw new Error('no element')
  }
  return el as HTMLElement
}

export default () => {
  const header: HTMLElement = getElement(document, 'header')
  const button: HTMLElement = getElement(header, 'button')

  function handleLogoClick() {
    if (header.classList.contains('expanded')) {
      header.classList.remove('expanded')
      button.setAttribute('aria-expanded', 'false')
      setTabIndex(header, -1)
    } else {
      header.classList.add('expanded')
      setTabIndex(header, 0)
      button.setAttribute('aria-expanded', 'true')
    }
  }
  button.addEventListener('click', handleLogoClick)

  return () => {
    button.removeEventListener('click', handleLogoClick)
  }
}

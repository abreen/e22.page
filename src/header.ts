const DURATION_MS = 250

function setTabIndex(header: HTMLElement, tabIndex: number) {
  const links = header.querySelectorAll('a')
  if (!links) {
    return
  }

  links.forEach(el => {
    el.tabIndex = tabIndex
  })
}

function getElement(parent: Document | Element, selector: string): HTMLElement {
  const el = parent.querySelector(selector)
  if (!el) {
    throw new Error(`no element matching "${selector}"`)
  }
  return el as HTMLElement
}

export default () => {
  const header: HTMLElement = getElement(document, 'header')
  const details = getElement(header, 'details') as HTMLDetailsElement
  const summary: HTMLElement = getElement(details, 'summary')
  const content: HTMLElement = getElement(details, '.content')

  const main: HTMLElement = getElement(document, 'main')

  let isExpanding = false,
    isCollapsing = false,
    animation: Animation | null

  function finish(isOpen: boolean) {
    details.open = isOpen
    details.classList.remove('expanding')
    details.style.height = ''
    details.style.overflow = ''
    isExpanding = false
    isCollapsing = false
    animation = null
  }

  function collapse() {
    if (isCollapsing || isExpanding) {
      animation?.cancel()
    }

    isCollapsing = true

    animation = details.animate(
      {height: [`${details.offsetHeight}px`, `${summary.offsetHeight}px`]},
      {duration: DURATION_MS, easing: 'ease-out'},
    )

    animation.onfinish = () => finish(false)
    animation.oncancel = () => {
      isCollapsing = false
    }
  }

  function expand() {
    if (isCollapsing || isExpanding) {
      animation?.cancel()
    }

    isExpanding = true
    details.classList.add('expanding')

    details.style.height = `${details.offsetHeight}px`
    details.open = true

    animation = details.animate(
      {height: [`${details.offsetHeight}px`, `${summary.offsetHeight + content.offsetHeight}px`]},
      {duration: DURATION_MS, easing: 'ease-out'},
    )

    animation.onfinish = () => finish(true)
    animation.oncancel = () => {
      isExpanding = false
      details.classList.remove('expanding')
    }
  }

  function handleClick(e: MouseEvent) {
    if (details.open) {
      setTabIndex(header, -1)
      main.inert = false
    } else {
      setTabIndex(header, 0)
      main.inert = true
    }

    e.preventDefault()
    details.style.overflow = 'hidden'
    if (isCollapsing || !details.open) {
      expand()
    } else if (isExpanding || details.open) {
      collapse()
    }
  }
  details.addEventListener('click', handleClick)

  return () => {
    details.removeEventListener('click', handleClick)
  }
}

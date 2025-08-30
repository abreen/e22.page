const DURATION_MS = 500

// CSS properties we control via the style attribute
const CONTROLLED_PROPERTIES = ['height', 'overflow']

//function setTabIndex(header: HTMLElement, tabIndex: number) {
//  const links = header.querySelectorAll('a')
//  if (!links) {
//    return
//  }
//
//  links.forEach(el => {
//    el.tabIndex = tabIndex
//  })
//}

function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className)
  if (!el.className) {
    el.removeAttribute('class')
  }
}

function removeStyle(el: HTMLElement, propertyName: string) {
  el.style.removeProperty(propertyName)
  if (CONTROLLED_PROPERTIES.every(property => !el.style.getPropertyValue(property))) {
    el.removeAttribute('style')
  }
}

function getExpandedHeight(summary: HTMLElement, content: HTMLElement) {
  function elementHeight(el: HTMLElement) {
    const style = window.getComputedStyle(el)
    return el.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
  }

  let totalHeight = elementHeight(summary)

  for (const child of content.children) {
    totalHeight += elementHeight(child as HTMLElement)
  }

  return Math.ceil(totalHeight)
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

  let isExpanding = false,
    isCollapsing = false,
    animation: Animation | null

  function finish(isOpen: boolean) {
    details.open = isOpen
    if (isOpen) {
      header.classList.add('is-open')
    } else {
      removeClass(header, 'is-open')
    }
    removeClass(header, 'is-expanding')
    removeClass(header, 'is-collapsing')
    removeStyle(details, 'height')
    removeStyle(details, 'overflow')
    isExpanding = false
    isCollapsing = false
    animation = null
  }

  function collapse() {
    if (isCollapsing || isExpanding) {
      animation?.cancel()
    }

    isCollapsing = true
    header.classList.add('is-collapsing')

    animation = details.animate(
      {height: [`${details.offsetHeight}px`, `${summary.offsetHeight}px`]},
      {duration: DURATION_MS, easing: 'ease-in-out'},
    )

    animation.onfinish = () => finish(false)
    animation.oncancel = () => {
      isCollapsing = false
      removeClass(header, 'is-collapsing')
    }
  }

  function expand() {
    if (isCollapsing || isExpanding) {
      animation?.cancel()
    }

    isExpanding = true
    header.classList.add('is-expanding')

    details.style.height = `${details.offsetHeight}px`
    details.open = true

    const expandedHeight = getExpandedHeight(summary, content)

    animation = details.animate(
      {height: [`${details.offsetHeight}px`, `${expandedHeight}px`]},
      {duration: DURATION_MS, easing: 'ease-in-out'},
    )

    animation.onfinish = () => finish(true)
    animation.oncancel = () => {
      isExpanding = false
      removeClass(header, 'is-expanding')
    }
  }

  function handleClick(e: MouseEvent) {
    if (details.open) {
      //setTabIndex(header, -1)
    } else {
      //setTabIndex(header, 0)
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

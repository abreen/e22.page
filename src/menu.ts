import './menu.scss'

type State = {isOpen: boolean}

function click(menu: HTMLElement, event: MouseEvent, state: State) {
  if (menu.contains(event.target as HTMLElement)) {
    return state
  } else {
    // Clicked outside the context menu
    if (state.isOpen) {
      hide(menu)
      return {...state, isOpen: false}
    }
    return state
  }
}

function secondaryClick(menu: HTMLElement, event: MouseEvent, state: State) {
  if (!state.isOpen) {
    event.preventDefault()
    show(menu, event)
    return {...state, isOpen: true}
  }
  return state
}

function touch(menu: HTMLElement, event: MouseEvent, state: State) {
  // Allow touches anywhere to trigger menu

  if (!state.isOpen) {
    show(menu, event)
    return {...state, isOpen: true}
  }

  return state
}

function secondaryTouch(menu: HTMLElement, event: MouseEvent, state: State) {
  if (!state.isOpen) {
    show(menu, event)
    return {...state, isOpen: true}
  } else {
    hide(menu)
    return {...state, isOpen: false}
  }
}

function show(menu: HTMLElement, event: MouseEvent) {
  updateNavButtons(menu)

  if (!menu.classList.contains('floating')) {
    menu.classList.add('floating')
  }

  menu.style.left = `${event.pageX}px`
  menu.style.top = `${event.pageY}px`
  menu.style.position = 'fixed'
  menu.style.display = 'block'
}

function hide(menu: HTMLElement) {
  menu.style.display = 'none'
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

function getMenuElement(): HTMLElement {
  const el = document.getElementById('menu')
  if (!el) {
    throw new Error('no menu element')
  }
  return el
}

function updateNavButtons(menu: HTMLElement) {
  const back = menu.querySelector('.back')
  const forward = menu.querySelector('.forward')

  if (navigation.canGoBack) {
    back?.classList.remove('disabled')
  } else {
    back?.classList.add('disabled')
  }

  if (navigation.canGoForward) {
    forward?.classList.remove('disabled')
  } else {
    forward?.classList.add('disabled')
  }
}

export default () => {
  const menu: HTMLElement = getMenuElement()
  let state: State = {isOpen: false}

  function updateState(newState: State) {
    if (newState !== state) {
      state = {...state, ...newState}
    }
  }

  function handleClick(event: MouseEvent) {
    let newState
    if (isTouchDevice()) {
      newState = touch(menu, event, state)
    } else {
      newState = click(menu, event, state)
    }
    updateState(newState)
  }
  document.addEventListener('click', handleClick)

  function handleRightClick(event: MouseEvent) {
    let newState
    if (isTouchDevice()) {
      if (event.target !== document.body) {
        // Didn't touch empty space
        return
      }
      newState = secondaryTouch(menu, event, state)
    } else {
      newState = secondaryClick(menu, event, state)
    }
    updateState(newState)
  }
  document.addEventListener('contextmenu', handleRightClick)

  function handleBlur() {
    hide(menu)
    updateState({...state, isOpen: false})
  }
  window.addEventListener('blur', handleBlur)

  function handleBack() {
    hide(menu)
    updateState({...state, isOpen: false})
    history.back()
  }
  menu.querySelector('.back')?.addEventListener('click', handleBack)

  function handleForward() {
    hide(menu)
    updateState({...state, isOpen: false})
    history.forward()
  }
  menu.querySelector('.forward')?.addEventListener('click', handleForward)

  function handleReload() {
    hide(menu)
    updateState({...state, isOpen: false})
    window.location.reload()
  }
  menu.querySelector('.reload')?.addEventListener('click', handleReload)

  function handleHome() {
    hide(menu)
    updateState({...state, isOpen: false})
    window.location.href = '/'
  }
  menu.querySelector('.home')?.addEventListener('click', handleHome)

  //menu.style.display = 'none'

  return () => {
    menu.querySelector('.home')?.removeEventListener('click', handleHome)
    menu.querySelector('.reload')?.removeEventListener('click', handleReload)
    menu.querySelector('.forward')?.removeEventListener('click', handleForward)
    menu.querySelector('.back')?.removeEventListener('click', handleBack)
    window.removeEventListener('blur', handleBlur)
    document.removeEventListener('contextmenu', handleRightClick)
    document.removeEventListener('click', handleClick)
  }
}

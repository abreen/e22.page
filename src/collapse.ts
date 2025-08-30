import './collapse.scss'

function getCollapsibleSections(): HTMLElement[] {
  const selector = [2, 3, 4, 5, 6].map(n => `section > h${n}:first-child`).join(',')
  return Array.from(document.querySelectorAll(selector)).map(el => el.parentElement as HTMLElement)
}

export default () => {
  const sections: HTMLElement[] = getCollapsibleSections()
  console.log(sections)

  const clickHandlers: (() => void)[] = sections.map(el => () => {
    console.log(el)
  })

  clickHandlers.forEach((handler, i) => sections[i].addEventListener('click', handler))

  sections.forEach(el => {
    const heading = el.firstElementChild as HTMLElement
    if (heading) {
      heading.innerText = heading.innerText + '*'
    }
  })

  return () => {
    clickHandlers.forEach((handler, i) => {
      sections[i].removeEventListener('click', handler)
    })
  }
}

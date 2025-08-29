import './logo.scss'

function getLogoElement(): HTMLElement {
  const el = document.getElementById('logo')
  if (!el) {
    throw new Error('no logo element')
  }
  return el
}

export default () => {
  const logo: HTMLElement = getLogoElement()

  function handleMouseEnter() {
    logo.classList.remove('post-shine');

    setTimeout(() => {
      if (logo.matches(':hover')) {
        logo.classList.add('post-shine');
      }
    }, 800);
  }
  document.addEventListener('mouseenter', handleMouseEnter)

  function handleMouseLeave() {
    logo.classList.remove('post-shine');
  }
  document.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mouseenter', handleMouseEnter)
  }
}

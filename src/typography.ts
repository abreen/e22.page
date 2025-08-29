import unjustifiable from 'unjustifiable';

const justify = unjustifiable();

export default () => {
  document.querySelectorAll("menu p").forEach(justify);

  return () => {
  }
}

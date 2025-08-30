declare global {
  interface Window {
    unjustifiable: ({
      stretch: number,
      shrink: number,
      overhang: number,
    }) => (value: Element, key: number, parent: NodeListOf<Element>) => void
  }
}

export {}

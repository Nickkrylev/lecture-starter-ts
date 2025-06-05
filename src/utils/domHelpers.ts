
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classNames: string[] = [],
  innerHTML: string = ''
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);
  if (classNames.length) el.classList.add(...classNames);
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

export function clearContainer(container: HTMLElement) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

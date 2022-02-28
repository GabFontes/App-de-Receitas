const setComputedStyle = () => {
  // Solution to Error "Not implemented: window.computedStyle(elt, pseudoElt)"
  // that appeared at console during tests (unknown reason);
  // Found @ https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
};

export default setComputedStyle;

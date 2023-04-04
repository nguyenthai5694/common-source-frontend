/**
 *  componentDidUpdate only indicates
 *  that React component has status of "render" but the DOM doesn't paint yet
 *  so we must use requestAnimationFrame
 * @param handler handler method will execute after the DOM is painted 
 */
export const requestAnimation = (handler) => {
  setTimeout(() => {
    window.requestAnimationFrame(handler);
  }, 0);
}
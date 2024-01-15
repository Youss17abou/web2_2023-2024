import { renderHeaderTitle } from '../../utils/render';

const EXPECTED_RECT_COUNT = 101;
const DEFAULT_SHAPE_SIDE = 20;
// const DEFAULT_COLOR = 'blue'; // 'rgba(255,0,0,0.5)';

/**
 * WARNING : THE STROBOSCOPIC EFFECT OF THIS DEMO COULD LEAD TO EPILEPSY !!!
 * PLEASE DON'T EXECUTE THIS DEMO IF YOUR ARE SUBJECT TO EPILEPSY !
 */

const HomePage = () => {
  const main = document.querySelector('main');
  const mainWidth = main.clientWidth;
  const mainHeight = main.clientHeight;
  let canvas;
  let canvasContext;

  renderHeaderTitle('Canvas Animation');
  renderCanvasWrapper();
  setCanvasContextAndSize();
  removePotentialVerticalAndHorizontalScrollbars();
  requestAnimationFrame(drawOneFrame);

  function renderCanvasWrapper() {
    main.innerHTML = '<canvas />';
    canvas = document.querySelector('canvas');
  }

  function setCanvasContextAndSize() {
    canvasContext = canvas.getContext('2d');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
  }

  /**
   * This function remove the vertical scrollbar that spuriously appears
   * even though the canvas is not meant to extend beyond the height
   * of the browser windows.
   */
  function removePotentialVerticalAndHorizontalScrollbars() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  function drawOneFrame() {
    clearFrame();

    // drawRectanglesAtRandomLocations();
    drawAlwaysFullRectanglesAtRandomLocations();

    requestAnimationFrame(() => setTimeout(drawOneFrame, 100));
  }

  function clearFrame() {
    canvasContext.clearRect(0, 0, mainWidth, mainHeight);
  }

  function drawAlwaysFullRectanglesAtRandomLocations() {
    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      const randomX = Math.random() * mainWidth;
      let expectedX = randomX;
      if (randomX < DEFAULT_SHAPE_SIDE) expectedX = 0;
      else if (randomX > mainWidth - DEFAULT_SHAPE_SIDE) expectedX = mainWidth - DEFAULT_SHAPE_SIDE;

      const randomY = Math.random() * mainHeight;
      let expectedY = randomY;
      if (randomY < DEFAULT_SHAPE_SIDE) expectedY = 0;
      else if (randomY > mainHeight - DEFAULT_SHAPE_SIDE) {
        expectedY = mainHeight - DEFAULT_SHAPE_SIDE;
      }

      const shapeSide = Math.random() * DEFAULT_SHAPE_SIDE * 2;

      const randomColor = getRandomColor();
      canvasContext.fillStyle = randomColor;

      canvasContext.fillRect(expectedX, expectedY, shapeSide, shapeSide);
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
};

export default HomePage;

export const containerMixin = {
  data() {
    return {
      cellSize: {
        w: 10,
        h: 10
      },
      defaultSize: {
        w: 20,
        h: 5
      },
      maxColumnCount: Infinity,
      maxRowCount: Infinity,
      bubbleUp: false,
      margin: 5,
      layout: []
    }
  }
}

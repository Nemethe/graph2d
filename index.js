class GraphItem {
  constructor(graph2D, data = null, index = 0, last = null) {
    this.graph2D = graph2D;
    this.data = data;
    this.next = null;
    this.prev = last;
    this.index = index;

    last && last.setNext(this);
  }

  set = (data) => {
    this.graph2D.memoryHierarchy &&
      this.graph2D.refreshInMemoryHierarchy(this.index);

    this.data = data;
  };

  get = (key) => {
    this.graph2D.memoryHierarchy &&
      this.graph2D.refreshInMemoryHierarchy(this.index);

    return key ? key in this.data && this.data[key] : this.data;
  };

  setNext = (item = null) => {
    if (item) {
      this.next = item;
    }
  };

  clearNext = () => {
    this.next = null;
  };

  setPrev = (item = null) => {
    if (item) {
      this.prev = item;
    }
  };

  clearPrev = () => {
    this.prev = null;
  };

  remove = () => {
    if ((this.graph2D.last || {}).index == this.index && this.prev) {
      this.graph2D.setLast(this.prev);
    } else if ((this.graph2D.last || {}).index == this.index) {
      this.graph2D.setLast();
    }

    this.skip();
    !this.graph2D.initialEnabled && this.graph2D.pushEmpty(this.index);
    this.graph2D.memoryHierarchy &&
      this.graph2D.removeInMemoryHierarchy(this.index);

    delete this.graph2D.items[this.index];
  };

  skip = () => {
    if (this.prev) {
      if (this.next) {
        this.prev.setNext(this.next);
      } else {
        this.prev.clearNext();
      }
    }

    if (this.next) {
      if (this.prev) {
        this.next.setPrev(this.prev);
      } else {
        this.next.clearPrev();
      }
    }

    this.next && this.prev && this.next.setPrev(this.prev);
  };
}

class Graph2D {
  constructor(initialEnabled = false, maxMemorySize = 0) {
    if (maxMemorySize) {
      this.maxMemorySize = maxMemorySize;
      this.memoryHierarchy = [];
    }
    this.initialEnabled = initialEnabled;
    this.items = {};
    this.last = null;
    this.emptys = [];

    const { addItem, getItem, removeItem, length, map, forEach, filter, find } =
      this;

    return {
      addItem,
      getItem,
      removeItem,
      length,
      map,
      forEach,
      filter,
      find,
    };
  }

  removeInMemoryHierarchy = (index) => {
    const i = this.memoryHierarchy.indexOf(index);
    if (i > -1) {
      this.memoryHierarchy.splice(i, 1);
    }
  };

  refreshInMemoryHierarchy = (index) => {
    this.removeInMemoryHierarchy(index);

    this.memoryHierarchy.push(index);

    this.memoryHierarchy.length > this.maxMemorySize &&
      this.removeItem(this.memoryHierarchy.shift(), true);
  };

  setLast = (last = null) => {
    this.last = last;
  };

  pushEmpty = (intNumber) => {
    this.emptys.push(intNumber);
  };

  addItem = (data, initial = null) => {
    if (this.initialEnabled && initial == null) {
      return false;
    }

    let index =
      this.initialEnabled && initial != null
        ? initial
        : (this.emptys.length && this.emptys.pop()) ||
          Object.keys(this.items).length;

    if (this.items[index]) {
      if (initial) {
        return false;
      } else {
        while (this.items[index]) {
          index++;
        }
      }
    }

    const emptyIndex = this.emptys.indexOf(index);
    if (emptyIndex != -1) {
      this.emptys.splice(emptyIndex, 1);
    }

    this.items[index] = new GraphItem(this, data, index, this.last);
    this.last = this.items[index];

    this.memoryHierarchy && this.refreshInMemoryHierarchy(index);

    return this.items[index];
  };

  getItem = (intNumber, noRefresh = false) => {
    !noRefresh &&
      this.memoryHierarchy &&
      this.refreshInMemoryHierarchy(intNumber);

    return intNumber in this.items && this.items[intNumber];
  };

  removeItem = (intNumber, noRefresh = false) => {
    const item = this.getItem(intNumber, noRefresh);
    item && item.remove();
    this.memoryHierarchy && this.removeInMemoryHierarchy(intNumber);
  };

  length = () => Object.keys(this.items).length;

  map = (callback, graphItem = false) => {
    let arr = [];
    let item = this.last;

    while (item) {
      callback && arr.push(callback(graphItem ? item : item.data, item.index));
      item = item.prev;
    }

    return arr;
  };

  forEach = (callback, graphItem = false) => {
    let item = this.last;

    while (item) {
      callback(graphItem ? item : item.data, item.index);
      item = item.prev;
    }
  };

  filter = (callback, graphItem = false) => {
    let arr = [];
    let item = this.last;

    while (item) {
      if (callback(graphItem ? item : item.data, item.index)) {
        arr.push(graphItem ? item : item.data);
      }
      item = item.prev;
    }

    return arr;
  };

  find = (callback, graphItem = false) => {
    let item = this.last;

    while (item) {
      if (callback(graphItem ? item : item.data, item.index)) {
        return graphItem ? item : item.data;
      }
      item = item.prev;
    }
  };
}

module.exports = Graph2D;

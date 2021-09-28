# Graph2D

Efficient iterable graph data structure.

## Installation

`npm i graph2d --save`

## Usage

```
// EXAMPLE 1

const Graph2D = require("graph2d");

const graph = new Graph2D();

graph.addItem("first");
for (let i = 1; i < 4; i++) {
  graph.addItem("test " + i);
}

console.log(graph.map((text) => text + " str"));
// [ 'test 3 str', 'test 2 str', 'test 1 str', 'first str' ]
```

```
// EXAMPLE 2

const graph2 = new Graph2D(true);

graph2.addItem("first", "id1");
for (let i = 1; i < 4; i++) {
  graph2.addItem("test " + i, i);
}
graph2.removeItem(1);

console.log(graph2.map((text) => text + " str"));
// [ 'test 3 str', 'test 2 str', 'first str' ]

console.log(graph2.getItem("id1").next.get());
// test 2

graph2.getItem("id1").next.remove();

console.log(graph2.getItem("id1").next.get());
// test 3
```

```
// EXAMPLE 3

const graph3 = new Graph2D(true, 100);
for (let i = 0; i < 200; i++) {
  graph3.addItem("test " + i, i);
}

console.log(graph3.length());
// 100

console.log(graph3.find((text) => text == "test 55"));
// undefined

console.log(graph3.find((text) => text == "test 155"));
// test 155

console.log(graph3);
```

### Graph2D Methods

```
new Graph2D(false); // if false graph will get auto increment number id

new Graph2D(true); // if true you will have to put string as second argument of getItem

new Graph2D(true, 5000); // graph can store max 5000 items, but automatically remove least used items when you will cross the barrier
```

```
graph2d.addItem(data, stringId)
graph2d.getItem(stringId),
graph2d.removeItem(stringId),
graph2d.length(),
graph2d.map(callbackFunction),
graph2d.forEach(callbackFunction),
graph2d.filter(callbackFunction),
graph2d.find(callbackFunction),
```

### GraphItem Methods & References

```
graphItem.set(data)
graphItem.get(key), // optional key
graphItem.remove(),
graphItem.next
graphItem.prev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

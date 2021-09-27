const Graph2D = require("./index.js");

// EXAMPLE 1

const graph = new Graph2D();

graph.addItem("first");
for (let i = 1; i < 4; i++) {
  graph.addItem("test " + i);
}

console.log(graph.map((text) => text + " str"));
// [ 'test 3 str', 'test 2 str', 'test 1 str', 'first str' ]

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

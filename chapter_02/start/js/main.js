const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

svg
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "turquoise")
  .style("fill", "plum");

const dataParsed = d3.csv("./data/data.csv", (data) => {
  // console.log(data);
  return {
    technology: data.technology,
    count: +data.count,
  };
});

dataParsed.then((data) => {
  data.sort((a, b) => b.count - a.count);
  console.log(data);
  console.log(data.columns);
  data.forEach((d) => {
    console.log(d);
  });
  console.log(data.length);
  console.log(d3.max(data, (d) => d.count));
  console.log(d3.min(data, (d) => d.count));

  console.log(d3.extent(data, (d) => d.count));

  createViz(data);
});

const createViz = (data) => {
  console.log('--- createViz ---')
  console.log(data);
};

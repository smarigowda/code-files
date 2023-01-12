const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  .style("border", "1px solid black");

// svg
//   .append("rect")
//   .attr("x", 10)
//   .attr("y", 10)
//   .attr("width", 414)
//   .attr("height", 16)
//   .attr("fill", "turquoise")
//   .style("fill", "plum");

const dataParsed = d3.csv("./data/data.csv", (data) => {
  // console.log(data);
  return {
    technology: data.technology,
    count: +data.count,
  };
});

dataParsed.then((data) => {
  data = data.sort((a, b) => b.count - a.count);
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

const barHeight = 20;

const createViz = (data) => {
  console.log("--- createViz ---");
  console.log(data);

  const xScale = d3.scaleLinear().domain([0, 1078]).range([0, 450]);
  window.xScale = xScale;

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.technology))
    .range([0, 700])
    .paddingInner(0.2);

  window.yScale = yScale;

  const bar = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(0, ${yScale(d.technology)})`);

  bar
    .append("rect")
    .attr("class", (d) => {
      console.log(d);
      return `bar bar-${d.technology}`;
    })
    .attr("width", (d) => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("x", 100)
    .attr("y", 0)
    .attr("fill", (d) =>
      d.technology === "D3.js" ? "yellowgreen" : "skyblue"
    );
};

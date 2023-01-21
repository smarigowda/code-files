const drawStreamGraph = (data) => {
  console.log(data);
  // Generate the streamgraph here

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3
    .select("#streamgraph")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const stackGenerator = d3.stack().keys(formatsInfo.map((f) => f.id));

  const annnotatedData = stackGenerator(data);
  console.log(annnotatedData);

  const maxUpperBoundary = d3.max(
    annnotatedData[annnotatedData.length - 1],
    (d) => d[1]
  );

  const yScale = d3
    .scaleLinear()
    .domain([0, maxUpperBoundary])
    .range([innerHeight, 0])
    .nice();

  const areaGenerator = d3
    .area()
    .x((d) => xScale(d.data.year) + xScale.bandwidth() / 2)
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]))
    .curve(d3.curveCatmullRom);

  const bottomAxis = d3
    .axisBottom(xScale)
    .tickValues(d3.range(1975, 2020, 5))
    .tickSizeOuter(0)
    .tickSize(innerHeight * -1);

  innerChart
    .append("g")
    .attr("class", "x-axis-streamgraph")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart
    .append("g")
    .attr("class", "areas-container")
    .selectAll("path")
    .data(annnotatedData)
    .join("path")
    .attr("d", areaGenerator)
    .attr("fill", (d) => colorScale(d.key));

  const leftAxis = d3.axisLeft(yScale);

  innerChart.append("g").call(leftAxis);
};

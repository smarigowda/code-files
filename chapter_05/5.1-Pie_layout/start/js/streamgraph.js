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

  const leftAxisLabel = svg.append("text").attr("dominant-baseline", "hanging");

  leftAxisLabel.append("tspan").text("Total revenue");

  leftAxisLabel
    .append("tspan")
    .text("(million USD)")
    .attr("dx", 5)
    .attr("fill-opacity", 0.7);
  leftAxisLabel
    .append("tspan")
    .text("Adjusted for inflation")
    .attr("x", 0)
    .attr("y", 20)
    .attr("fill-opacity", 0.7)
    .style("font-size", "14px");

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const stackGenerator = d3
    .stack()
    .keys(formatsInfo.map((f) => f.id))
    .order(d3.stackOrderInsideOut)
    .offset(d3.stackOffsetSilhouette);

  const annnotatedData = stackGenerator(data);
  console.log(annnotatedData);

  // this works only for the defalut values
  const maxUpperBoundary = d3.max(
    annnotatedData[annnotatedData.length - 1],
    (d) => d[1]
  );

  const minLowerBoundaries = [];
  const maxUpperBoundaries = [];

  annnotatedData.forEach((series) => {
    minLowerBoundaries.push(d3.min(series, (d) => d[0]));
    maxUpperBoundaries.push(d3.max(series, (d) => d[1]));
  });

  const minDomain = d3.min(minLowerBoundaries);
  const maxDomain = d3.max(maxUpperBoundaries);

  const yScale = d3
    .scaleLinear()
    // .domain([0, maxUpperBoundary])
    .domain([minDomain, maxDomain])
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

  // legends
  const legendItems = d3
    .select(".legend-container")
    .append("ul")
    .attr("class", "color-legend")
    .selectAll(".color-legend-item")
    .data(formatsInfo)
    .join("li")
    .attr("class", "color-legend-item");

  legendItems
    .append("span")
    .attr("class", "color-legend-item-color")
    .style("background-color", (d) => d.color);

  legendItems
    .append("span")
    .attr("class", "color-legend-item-label")
    .text((d) => d.label);
};

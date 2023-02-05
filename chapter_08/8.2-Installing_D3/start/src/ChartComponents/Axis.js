import "./Axis.css";

const AxisBottom = (props) => {
  const numberOfTicks = props.innerWidth / 100;
  const ticks = props.scale.ticks(numberOfTicks);
  console.log(ticks);
  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`}>
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {ticks.map((tick) => {
        return (
          <g
            key={`tick-${tick}`}
            transform={`translate(${props.scale(tick)}, 0)`}
          >
            <line x1={0} y1={0} x2={0} y2={5} />
            <text x={0} y={20} textAnchor="middle">
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const AxisLeft = (props) => {
  return <g></g>;
};

const AxisBandBottom = (props) => {
  return <g></g>;
};

const Axis = (props) => {
  switch (props.type) {
    case "bottom":
      return AxisBottom(props);
    case "left":
      return AxisLeft(props);
    case "band":
      return AxisBandBottom(props);
    // no default
  }
};

export default Axis;

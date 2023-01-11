export default function(props) {
  return (
    <select className="size-selector" onChange={(e) => props.selectSize(e.target.value)}>
      <option default>SELECT SIZE</option>
      {props.sizeOptions.map((size, i) => <option key={i}>{size}</option>)}
    </select>
  );
};
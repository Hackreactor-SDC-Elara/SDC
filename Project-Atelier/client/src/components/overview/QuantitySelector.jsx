export default function(props) {
  let options = [];
  for (let i = 1; i <= props.maxQuantity; i++) {
    let option = <option key={i}>{i}</option>;
    if (props.currentQuantity && i === props.currentQuantity) {
      option = <option key={i} selected>{i}</option>;
    }
    options.push(option);
  }

  return (
    <select
      className="quantity-selector"
      onChange={(e) => props.selectQuantity(parseInt(e.target.value))}
    >
      {options.length ? options : <option>1</option>}
    </select>
  );
}
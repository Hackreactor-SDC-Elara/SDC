export default function(props) {
  let currentlySelected = props.currentStyle ? ' currently-selected' : '';
  return (
    <div
      className={`style-icon${currentlySelected}`}
      onClick={() => props.onClick(props.style)}>
      <img src={props.style.photos[0].thumbnail_url} alt="style image"></img>
    </div>
  );
}
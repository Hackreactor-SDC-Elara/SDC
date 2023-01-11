export default function(props) {
  const stars = {
    clicked: '⭐',
    unclicked: '☆'
  }
  const handleClick = function() {
    console.log(`handling click from star`);
    return props.inOutfit ? props.removeFromOutfit() : props.addToOutfit();
  }
  return (
    <button className="clickable-star" onClick={handleClick}>
      {props.inOutfit ? stars.clicked : stars.unclicked}
    </button>
  );
}
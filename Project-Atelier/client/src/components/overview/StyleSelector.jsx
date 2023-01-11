import StyleIcon from './StyleIcon.jsx';

export default function(props) {
  let currentStyle = props.currentStyle || {};
  return (
    <div className="style-selector">
      <p className="style-label">
        <span className="style-style">STYLE > </span>
        <span className="current-style-name">
          {currentStyle.name && currentStyle.name.toUpperCase()}
        </span>
      </p>
      <div className="style-icons">
        {props.styles.map((style, i) => (
          <StyleIcon
            key={i}
            style={style}
            currentStyle={props.currentStyle.style_id === style.style_id}
            onClick={props.changeCurrentStyle}
          />
        ))}
      </div>
    </div>
  );
}
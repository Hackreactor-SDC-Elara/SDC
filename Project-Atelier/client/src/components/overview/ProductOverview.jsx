export default function(props) {
  const product_info = props.product_info || {};

  return (
    <div className="ov-product-overview">
      <div className="ov-po-left-column">
        <p className="ov-slogan">{product_info.slogan}</p>
        <p className="ov-description">{product_info.description}</p>
      </div>
      <div className="ov-po-right-column">

      </div>
    </div>
  )
}
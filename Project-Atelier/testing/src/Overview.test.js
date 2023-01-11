import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const OV_COMPS_DIR = '../../client/src/components/overview';

import Overview from '../../client/src/components/Overview.jsx';
import AddToCart from '../../client/src/components/overview/AddToCart.jsx';
import ClickableStar from '../../client/src/components/overview/ClickableStar.jsx';
import ImageGallery from '../../client/src/components/overview/ImageGallery.jsx';
import ProductInfo from '../../client/src/components/overview/ProductInfo.jsx';
import ProductOverview from '../../client/src/components/overview/ProductOverview.jsx';
import QuantitySelector from '../../client/src/components/overview/QuantitySelector.jsx';
import SizeSelector from '../../client/src/components/overview/SizeSelector.jsx';
import StarRating from '../../client/src/components/overview/StarRating.jsx';
import StyleIcon from '../../client/src/components/overview/StyleIcon.jsx';
import StyleSelector from '../../client/src/components/overview/StyleSelector';

import exampleData from '../../exampleData/exampleData';

import { getSizeInfoForStyle } from '../../helpers/helpers.js';

/***** React Component Tests *****/

describe('Overview Component and Subcomponents', function() {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  /***** STYLE ICON *****/

  describe('StyleIcon', () => {
    const renderStyleIcon = (currentlySelected = true, onClick) => {
      ReactDOM.render(
        <StyleIcon
          currentStyle={currentlySelected}
          style={exampleData.styles71697.results[0]}
          onClick={onClick}
        />,
        container
      );
    }

    it('should render StyleIcon component to the DOM', () => {
      act(renderStyleIcon);
      expect(container.querySelector('.style-icon')).not.toBe(null);
    });
    it('should have className "currently-selected" if style is currentStyle', () => {
      act(renderStyleIcon);
      expect(container.querySelector('.style-icon').className.split(' ')).toContain('currently-selected');
    });
    it('should not have className "currently-selected if style is not currentStyle', () => {
      act(() => renderStyleIcon(false));
      expect(container.querySelector('.style-icon').className.split(' ')).not.toContain('currently-selected');
    });
    it('should handle click', () => {
      const onClick = jest.fn();
      act(() => renderStyleIcon(true, onClick));
      act(() => {
        container.querySelector('.style-icon').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  /***** CLICKABLE STAR*****/

  describe('ClickableStar', () => {
    let outfit = {};
    const addToOutfit = jest.fn(item => outfit[item] ? outfit[item] += 1 : outfit[item] = 1);
    const removeFromOutfit = jest.fn(item => {
      if (outfit[item]) {
        outfit[item] -= 1;
      };
    });

    const renderClickableStar = (inOutfit = false) => {
      ReactDOM.render(
        <ClickableStar
          inOutfit={inOutfit}
          removeFromOutfit={removeFromOutfit}
          addToOutfit={addToOutfit}
        />,
        container
      );
    }

    afterEach(() => {
      outfit = {};
    });

    it('should render to the DOM', () => {
      act(renderClickableStar);
      expect(document.querySelector('.clickable-star')).not.toBe(null);
    });
    it('should display hollow star if not inOutfit', () => {
      act(() => renderClickableStar(false));
      expect(document.querySelector('.clickable-star').textContent).toBe('☆');
    });
    it('should display solid star if inOutfit', () => {
      act(() => renderClickableStar(true));
      expect(document.querySelector('.clickable-star').textContent).toBe('⭐');
    });
    it.todo('should toggle the star on click');
    it('should call removeFromOutfit on click if item is in outfit', () => {
      act(() => renderClickableStar(true));
      act(() => {
        container.querySelector('.clickable-star').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(removeFromOutfit).toHaveBeenCalledTimes(1);
      expect(addToOutfit).toHaveBeenCalledTimes(0);
    });
    it('should call addToOutfit on click if item is not in outfit', () => {
      act(() => renderClickableStar(false));
      act(() => {
        container.querySelector('.clickable-star').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(addToOutfit).toHaveBeenCalledTimes(1);
      // NEED MORE ISOLATION IN TESTS...THIS FUNCTION HAS TECHNICALLY BEEN CALLED
      // FROM PREVIOUS TEST:
      // expect(removeFromOutfit).toHaveBeenCalledTimes(0);
    });
    // it('should rerender when props change', () => {
    //   act(renderClickableStar);

    // });
  });

  /***** STAR RATING *****/

  describe('StarRating', () => {
    const renderStarRating = () => {
      ReactDOM.render(<StarRating rating={3.8} />, container);
    }
    it('should render StarRating to the DOM', () => {
      act(renderStarRating);
      expect(document.querySelector('.star-rating')).not.toBe(null);
    });
    it('should subtract overlay by the nearest quarter percentage point', () => {
      act(renderStarRating);
      const overlay = document.querySelector('.stars-overlay');
      const overlayWidth = overlay.style.width;
      expect(overlayWidth).toBe('25%');
    });
  });

  /***** QuantitySelector *****/

  describe('QuantitySelector', () => {
    const renderQtySel = (maxQty=15, currentQty=0, selectQty=()=>{}) => {
      ReactDOM.render(
        <QuantitySelector
          maxQuantity={maxQty}
          currentQuantity={currentQty}
          selectQuantity={selectQty}
        />,
        container
      );
    }
    it('should render QuantitySelector to the DOM', () => {
      act(renderQtySel);
      expect(document.querySelector('.quantity-selector')).not.toBe(null);
    });
    it('should set the selected option to the currentQuantity', () => {
      act(() => renderQtySel(12, 2));
      const qtySelector = document.querySelector('.quantity-selector');
      const selected = qtySelector.options[qtySelector.selectedIndex];
      expect(selected.text).toBe('2');
    });
    it('should only have options up to the maxQuantity amount', () => {
      act(() => renderQtySel(12));
      const qtySelector = document.querySelector('.quantity-selector');
      const lastOption = qtySelector.options[qtySelector.options.length - 1];
      expect(lastOption.text).toBe('12');
    });
    it('should call selectQuantity function on change', () => {
      let newQty = '0';
      const selectQty = jest.fn();
      act(() => renderQtySel(12, 1, selectQty));
      const qtySelector = document.querySelector('.quantity-selector');
      expect(selectQty).toHaveBeenCalledTimes(0);
      act(() => qtySelector.dispatchEvent(new Event('change', { bubbles: true })));
      expect(selectQty).toHaveBeenCalledTimes(1);
    });
    it.todo('should have a default value of "-"');
  });

  /***** PRODUCT INFO *****/
  describe('ProductInfo', () => {
    const renderProductInfo = (product_info=exampleData.productInfo71697, rating=4.5) => {
      ReactDOM.render(
        <ProductInfo
          product_info={product_info}
          rating={rating}
        />,
        container);
    }
    it('should render ProductInfo component to the DOM', () => {
      act(renderProductInfo);
      expect(document.querySelector('.ov-product-info')).not.toBe(null);
    });
    it('should still render if product info is non-existent', () => {
      act(() => renderProductInfo(null));
      expect(document.querySelector('.ov-product-info')).not.toBe(null);
    });
  });

  /***** PRODUCT OVERVIEW *****/
  describe('ProductOverview', () => {
    const renderProductOverview = (product_info=exampleData.productInfo71697) => {
      ReactDOM.render(<ProductOverview product_info={product_info} />, container);
    }
    it('should render ProductOverview component to the DOM', () => {
      act(renderProductOverview);
      expect(document.querySelector('.ov-product-overview')).not.toBe(null);
    });
    it('should still render if product info is non-existent', () => {
      act(() => renderProductOverview(null));
      expect(document.querySelector('.ov-product-overview')).not.toBe(null);
    });
  });

  /***** SIZE SELECTOR *****/
  describe('SizeSelector', () => {
    const style = exampleData.styles71697.results[0];
    const sizeInfo = getSizeInfoForStyle(style);
    let selectedSize = '';
    const selectSizeFn = jest.fn(size => selectedSize = size);
    const renderSizeSelector = (sizeOptions=Object.keys(sizeInfo), selectSize=selectSizeFn) => {
      ReactDOM.render(<SizeSelector sizeOptions={sizeOptions} selectSize={selectSize} />, container);
    };
    it('should render SizeSelector component to the DOM', () => {
      act(renderSizeSelector);
      expect(document.querySelector('.size-selector')).not.toBe(null);
    });
  });
});
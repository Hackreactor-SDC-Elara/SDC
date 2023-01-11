
let cookie = ""
Object.defineProperty(document, 'cookie', {
  get: () => cookie,
  set: (str) => {
    cookie = str
  }
});
import React from "react";
import {getOutfitListInCookie, addOutfitListToCookie, deleteOutfitIdInCookie} from '../../helpers/helpers.js';

import exampleData from '../../exampleData/exampleData.js';
import { roundToNearestQuarter, getSizeInfoForStyle } from '../../helpers/helpers.js';


/***** Unit Tests for roundToNearestQuarter helper function *****/

describe('roundToNearestQuarter', function() {
  it('should round numbers to nearest quarter of a point', function() {
    expect(roundToNearestQuarter(3)).toBe(3);
    expect(roundToNearestQuarter(1.25)).toBe(1.25);
    expect(roundToNearestQuarter(2.75)).toBe(2.75);
    expect(roundToNearestQuarter(2.73)).toBe(2.75);
    expect(roundToNearestQuarter(3.402342)).toBe(3.5);
    expect(roundToNearestQuarter(3.12)).toBe(3);
    expect(roundToNearestQuarter(3.13)).toBe(3.25);
  });
});

describe('getSizeInfoForStyle', () => {
  it('should return an object with sku and quantity info for each size key', () => {
    let style = exampleData.styles71697.results[0];
    let sizeInfo = getSizeInfoForStyle(style);
    expect(Object.keys(sizeInfo)).not.toBe(null);
    expect(Object.keys(sizeInfo).length).toBe(6);
    expect(sizeInfo.XS.sku).toBe('2580526');
    expect(sizeInfo.XS.quantity).toBe(8);
  });
  
/***** Unit Tests for getOutfitListInCookie helper function *****/

describe("helper function cookie getOutfitListInCookie", () => {
  beforeAll(() => {
    cookie = "";
  })

  it("should not get cookie named 'outfitList' if it does not exist", () => {
    document.cookie = "newName=[]; ";

    expect(getOutfitListInCookie()).toBeUndefined();
  })

  it("should get specific cookie by name 'outfitList' ", () => {
    document.cookie = "outfitList=[2,1]; ";
    expect(getOutfitListInCookie()).toEqual([2,1]);

  })
})

/***** Unit Tests for addOutfitListToCookie helper function *****/

describe("helper function cookie addOutfitListToCookie", () => {
  beforeAll(() => {
    cookie = "";
  })

  it("should add cookie named 'outfitList' if it does not exist", () => {
    addOutfitListToCookie(5);
    let outfitList = getOutfitListInCookie();
    expect(outfitList).toEqual([5]);
  })

  it("should not add same cookie value ", () => {
    addOutfitListToCookie(5);
    let outfitList = getOutfitListInCookie();
    expect(outfitList).toEqual([5]);
  })
  it("should add new cookie value if it is new one", () => {
    addOutfitListToCookie(6);
    let outfitList = getOutfitListInCookie();
    expect(outfitList).toEqual([5,6]);
  })
  it("should add new cookie value if it is new one", () => {
    addOutfitListToCookie(6);
    let outfitList = getOutfitListInCookie();
    expect(outfitList).toEqual([5,6]);
  })
  it("should directly add array if input is an array", () => {
    addOutfitListToCookie([1,2]);
    let outfitList = getOutfitListInCookie();
    expect(outfitList).toEqual([1,2]);
  })

})

/***** Unit Tests for deleteOutfitIdInCookie helper function *****/
describe("helper function cookie deleteOutfitIdInCookie", () => {

  beforeAll(() => {
    cookie = "";
  })

  it("should add cookie named 'outfitList' if it does not exist", () => {
    document.cookie = "outfitList=[2,1,3]; ";
    let outfitList = deleteOutfitIdInCookie(1);
    expect(outfitList).toEqual([2,3]);
  })

})
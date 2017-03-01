export const MathFloor = Math.floor;

export function timeago(date) {
  date = new Date(date);
  const dateYear = date.getFullYear();
  const dateMonths = date.getMonth() + dateYear * 12; // 计算总月数
  const time = date.getTime();
  const curDate = new Date();
  const curDateYear = curDate.getFullYear();
  const curDateMonths = curDate.getMonth() + curDateYear * 12; // 计算总月数
  const curTime = curDate.getTime();
  const deltaTime = MathFloor((curTime - time) / 1000); // 转为秒

  if (curDateMonths - dateMonths > 12) {
    return `${Math.floor((curDateMonths - dateMonths) / 12)}年前`;
  } else if (curDateMonths - dateMonths > 1) {console.log(curDateMonths, dateMonths)
    return `${curDateMonths - dateMonths}个月前`;
  } else {
    if (deltaTime < 60) {
      return `${deltaTime}秒前`;
    } else if (deltaTime < 3600) {
      return `${MathFloor(deltaTime / 60)}分钟前`;
    } else if (deltaTime < 86400) {
      return `${MathFloor(deltaTime / 3600)}小时前`;
    } else if (deltaTime < 604800) {
      return `${MathFloor(deltaTime / 86400)}天前`;
    } else {
      return `${MathFloor(deltaTime / 604800)}周前`;
    }
  }
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 */

/*eslint-disable no-self-compare */

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
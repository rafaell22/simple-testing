// @ts-check

/**
 * @param {Object} value
 * @returns {string}
 */
const toRawType = (value) => {
  let _toString = Object.prototype.toString;
  
  let str = _toString.call(value)

  return str.slice(8, -1)
}

class Validator {
  /**
   * @param {*} value
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * @param {*} value
   * @returns {Validator}
   */
  toBe(value) {
    if(value === undefined) {
      return this;
    }

    const result = Validator.isEqual(this.value, value);
    if(result) {
      return this;
    }

    throw new Error(`    Expected ${value}, but got ${this.value}`);
  }

  /**
   * @param {*} a
   * @param {*} b
   */
  static isEqual(a, b) {
    switch(toRawType(a)) {
      case 'String':
      case 'Number':
      case 'Boolean':
      case 'Undefined':
      case 'Null':
      case 'Function': 
        return a === b;
      case 'Array':
      case 'Object':
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return false;
  }
}

/**
 * @param {*} value
 * @returns {Validator}
 */
const expect = (value) => {
  return new Validator(value);
};

/**
 * @param {string} description
 * @param {Function} cb
 */
const describe = (description, cb) => {
  console.log(description);
  cb();
} 


/**
 * @param {string} description
 * @param {Function} test
 */
const it = (description, test) => {
  console.log('|-' + description);
  try {
    test();
    console.log('| |-Passed');
  } catch(error) {
    console.log('| |-Failed');
    console.log(error);
  }
}

export {
  expect,
  describe,
  it,
}

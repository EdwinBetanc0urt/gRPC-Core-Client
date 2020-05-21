/*************************************************************************************
 * Product: ADempiere gRPC Business Data Client Convert Utils                        *
 * Copyright (C) 2012-2020 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com                      *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.            *
 ************************************************************************************/

const convertValues = {
  /**
   * Checks if value is empty. Deep-checks arrays and objects
   * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
   * @param  {boolean|array|object|number|string|date|map|set|function} value
   * @returns {boolean}
   */
  isEmptyValue(value) {
    if (value === undefined || value == null || Number.isNaN(value)) {
      return true;
    } else if (String(value).trim() === '-1') {
      return true;
    } else if (typeof value === 'string') {
      return Boolean(!value.trim().length);
    } else if (['boolean', 'function', 'number'].includes(typeof value) ||
      Object.prototype.toString.call(value) === '[object Date]') {
      return false;
    } else if (['[object Map]', '[object Set]'].includes(Object.prototype.toString.call(value))) {
      return Boolean(!value.size);
    } else if (Array.isArray(value)) {
      return Boolean(!value.length);
    } else if (typeof value === 'object') {
      return Boolean(!Object.keys(value).length);
    }

    return true;
  },

  /**
   * Return value converted, compatible with grpc
   * @param {mixed} value
   * @returns {Value}
   */
  convertValueToGRPC({ value, valueType }) {
    var convertedValue;

    if (valueType) {
      return convertValues.convertValueToGRPCWithValueType({ value, valueType });
    }

    // evaluate type of value
    if (value === undefined || value === null) {
      return convertValues.getValueFromString(value);
    }
    if (typeof (value) === 'number') {
      if (Number.isInteger(value)) {
        convertedValue = convertValues.getValueFromInteger(value);
      } else {
        convertedValue = convertValues.getValueFromDecimal(value);
      }
    } else if (typeof (value) === 'boolean') {
      convertedValue = convertValues.getValueFromBoolean(value);
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      convertedValue = convertValues.getValueFromDate(value);
    } else {
      convertedValue = convertValues.getValueFromString(value);
    }
    return convertedValue;
  },

  convertValueToGRPCWithValueType({ value, valueType }) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    let convertedValue;

    switch (ValueType[valueType]) {
      // data type Number (integer)
      case ValueType.INTEGER:
        convertedValue = convertValues.getValueFromInteger(value);
        break;
      // data type Number (float)
      case ValueType.DECIMAL:
        convertedValue = convertValues.getValueFromDecimal(value);
        break;
      // data type Boolean
      case ValueType.BOOLEAN:
        convertedValue = convertValues.getValueFromBoolean(value);
        break;
      // data type String
      case ValueType.STRING:
        convertedValue = convertValues.getValueFromString(value);
        break;
      // data type Date
      case ValueType.DATE:
        convertedValue = convertValues.getValueFromDate(value);
        break;
      case ValueType.UNKNOWN:
      default:
        convertedValue = undefined;
        break;
    }
    return convertedValue;
  },

  /**
   * Get value from Integer
   * @param value
   * @return
   */
  getValueFromInteger(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    let convertedValue = new Value();

    convertedValue.setValuetype(ValueType.INTEGER);
    if (!convertValues.isEmptyValue(value)) {
      if (String(value).length < 11) {
        convertedValue.setIntvalue(value);
      } else {
        convertedValue = convertValues.getValueFromDecimal(value);
      }
    }
    return convertedValue;
  },

  /**
   * Get value from a string
   * @param value
   * @return
   */
  getValueFromString(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();

    convertedValue.setValuetype(ValueType.STRING);
    if (value) {
      convertedValue.setStringvalue(String(value));
    }
    return convertedValue;
  },

  /**
   * Get value from a boolean value
   * @param value
   * @return
   */
  getValueFromBoolean(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();

    convertedValue.setValuetype(ValueType.BOOLEAN);
    if (typeof value === 'string') {
      if (value.trim() === 'N') {
        value = false;
      } else {
        value = true;
      }
    }
    convertedValue.setBooleanvalue(Boolean(value));
    return convertedValue;
  },

  /**
   * Get value from a date
   * @param value
   * @return
   */
  getValueFromDate(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();

    convertedValue.setValuetype(ValueType.DATE);
    if (Object.prototype.toString.call(value) === '[object Date]') {
      value = value.getTime();
      convertedValue.setLongvalue(value);
    }
    convertedValue.setValuetype(ValueType.DATE);
    return convertedValue;
  },

  /**
   * Get value from big decimal
   * @param value
   * @return
   */
  getValueFromDecimal(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();
    const convertedDecimalValue = convertValues.getDecimalInstance();

    convertedValue.setValuetype(ValueType.DECIMAL);
    if (!convertValues.isEmptyValue(value)) {
      if (Number.isInteger(value)) {
        value = value.toFixed(2);
      }
      convertedDecimalValue.setDecimalvalue(value.toString());

      //  Set scale
      let scale = value.toString().indexOf('.');
      if (scale == -1) {
        scale = 0;
      } else {
        scale = value.toString().length - scale - 1;
      }
      convertedDecimalValue.setScale(scale);
    }
    convertedValue.setDecimalvalue(convertedDecimalValue);
    return convertedValue;
  },

  getDecimalInstance() {
    const { Decimal } = require('./grpc/proto/base_data_type_pb.js');
    return new Decimal();
  },

  /**
   * Convert a parameter defined by columnName and value to Value Object
   * @param {string} columnName
   * @param {mixed}  value
   * @returns KeyValue Object
   */
  convertParameterToGRPC({ columnName, value, valueType }) {
    const { KeyValue } = require('./grpc/proto/base_data_type_pb.js');
    const keyValue = new KeyValue();
    keyValue.setKey(columnName);

    keyValue.setValue(
      convertValues.convertValueToGRPC({
        value,
        valueType
      })
    );
    //  Return converted value
    return keyValue;
  },

  /**
   * Convert a list of parameter defined by columnName and value to Value Object
   * @param {number} selectionId keyColumn Value
   * @param {string} selectionUuid TODO: Add support to uuid record
   * @param {array}  selectionValues [{ columName, value }]
   * Return a list of KeyValue Object
   */
  convertSelectionToGRPC({ selectionId, selectionUuid, selectionValues = [] }) {
    const { KeyValueSelection } = require('./grpc/proto/base_data_type_pb.js');
    const selectionInstance = new KeyValueSelection();

    // set selection id from record
    selectionInstance.setSelectionid(selectionId);
    //  Convert values to selection
    selectionValues.forEach(selectionItem => {
      const convertedSelection = convertValues.convertParameterToGRPC({
        columnName: selectionItem.columnName,
        value: selectionItem.value
      });
      selectionInstance.addValues(convertedSelection);
    });
    return selectionInstance;
  },

  /**
   * Convert values map to compatible format
   * @param {map} mapToConvert
   * @param {string} returnType
   * @param {string} keyName, used in array pairs, default value is 'key'
   */
  convertValuesMapFromGRPC({ mapToConvert, returnType = 'map', keyName = 'key', valueName = 'value'}) {
    let returnValues;
    const { convertValueFromGRPC } = require('./convertBaseDataType.js');

    switch (returnType) {
      case 'object':
        returnValues = {};
        mapToConvert.forEach((value, key) => {
          returnValues[key] = convertValueFromGRPC(value);
        });
        break;

      case 'array':
        returnValues = [];
        mapToConvert.forEach((value, key) => {
          const item = {}
          item[keyName] = key;
          item[valueName] = convertValueFromGRPC(value);
          returnValues.push(item);
        });
        break;

      default:
      case 'map':
        returnValues = new Map();
        mapToConvert.forEach((value, key) => {
          returnValues.set(key, convertValueFromGRPC(value));
        });
        break;
    }

    return returnValues;
  },

  /**
   * Convert a parameter defined by columnName and value to Value Object
   * @param {string} columnName
   * @param {mixed}  value
   * @param {mixed}  valueTo
   * @param {array}  values
   * @returns Object
   */
  convertConditionToGRPC({ columnName, value, valueTo, values = [], operator = 'EQUAL' }) {
    const { Condition } = require('./grpc/proto/base_data_type_pb.js');
    const { Operator } = Condition;
    const conditionInstance = new Condition();

    conditionInstance.setColumnname(columnName);

    // set operator
    conditionInstance.setOperator(Operator.EQUAL); // 0
    if (operator) {
      conditionInstance.setOperator(Operator[operator]);
    }

    // set value and value to
    if (value !== undefined && value !== null) {
      conditionInstance.setValue(
        convertValues.convertValueToGRPC({ value })
      );
    }
    if (valueTo !== undefined && valueTo !== null) {
      conditionInstance.setValueto(
        convertValues.convertValueToGRPC({ value: valueTo })
      );
    }
    // set values
    if (values && values.length) {
      values.forEach(itemValue => {
        const convertedValue = convertValues.convertValueToGRPC({ value: itemValue });
        conditionInstance.addValues(convertedValue);
      });
    }

    //  Return converted condition
    return conditionInstance;
  },

  /**
   * Get Criteria from Table Name
   * @param {string} tableName
   * @param {string} query
   * @param {string} whereClause
   * @param {array}  conditionsList
   * @param {string} orderByClause
   * @return {Criteria} instance
   * TODO: Add support to orderByColumnsList
   */
  convertCriteriaToGRPC({ tableName, query, whereClause, referenceUuid, conditionsList = [], orderByClause, valuesList = [], orderByColumnList = [], limit }) {
    const { Criteria } = require('./grpc/proto/base_data_type_pb.js');
    const criteria = new Criteria();

    criteria.setTablename(tableName);
    criteria.setQuery(query);
    criteria.setWhereclause(whereClause);
    criteria.setReferenceuuid(referenceUuid);

    // add values
    if (valuesList && valuesList.length) {
      valuesList.forEach(itemValue => {
        const value = convertValues.convertValueToGRPC({ value: itemValue });
        criteria.addValues(value);
      });
    }

    // add conditions
    if (conditionsList && conditionsList.length) {
      conditionsList.forEach(itemCondition => {
        const convertCondition = convertValues.convertConditionToGRPC(itemCondition);
        criteria.addConditions(convertCondition);
      });
    }

    criteria.setOrderbyclause(orderByClause);
    criteria.setLimit(limit);

    //  Return criteria
    return criteria;
  }

};

module.exports = convertValues;

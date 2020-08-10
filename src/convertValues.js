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
 * along with this program. If not, see <https://www.gnu.org/licenses/>.             *
 ************************************************************************************/

const convertValues = {

  /**
   * Get type of value
   * @param {mixed} value
   * @returns {string} Undefined, Boolean, String, Function...
   */
  typeOfValue(value) {
    // '[object typeOfValue]'
    const typeOfValue = Object.prototype
      .toString
      .call(value)
      .match(/^\[object\s(.*)\]$/)[1];

    return typeOfValue;
  },

  /**
   * Checks if value is empty. Deep-checks arrays and objects
   * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
   * @param  {boolean|array|object|number|string|date|map|set|function} value
   * @returns {boolean}
   */
  isEmptyValue(value) {
    const typeOfValue = convertValues.typeOfValue(value);
    let isEmpty = true;

    switch (typeOfValue) {
      case 'Undefined':
      case 'Error':
      case 'Null':
        isEmpty = true;
        break;

      case 'Boolean':
      case 'Date':
      case 'Function': // Or class
      case 'Math': // TODO: Evaluate as number
      case 'RegExp':
        isEmpty = false;
        break;

      case 'String':
        isEmpty = Boolean(!value.trim().length);
        break;

      case 'Number':
        isEmpty = false;
        if (Number.isNaN(value)) {
          isEmpty = true;
        }
        break;

      case 'JSON':
        isEmpty = true;
        if (value.trim().length) {
          isEmpty = Boolean(value.trim() === '{}');
        }
        break;

      case 'Object':
        isEmpty = Boolean(!Object.keys(value).length);
        break;

      case 'Arguments':
      case 'Array':
        isEmpty = Boolean(!value.length);
        break;

      case 'Map':
      case 'Set':
        isEmpty = Boolean(!value.size);
        break;
    }

    return isEmpty;
  },

  /**
   * Return value converted, compatible with grpc
   * @param {mixed} value
   * @returns {Value}
   */
  convertValueToGRPC({ value, valueType }) {
    let convertedValue;

    if (valueType) {
      convertedValue = convertValues.convertValueToGRPCWithValueType({
        value,
        valueType
      });
      return convertedValue;
    }

    // evaluate type of value
    const typeOfValue = convertValues.typeOfValue(value);

    switch (typeOfValue) {
      case 'Number':
        if (Number.isInteger(value)) {
          convertedValue = convertValues.getValueFromInteger(value);
        } else {
          convertedValue = convertValues.getValueFromDecimal(value);
        }
        break;

      case 'Boolean':
        convertedValue = convertValues.getValueFromBoolean(value);
        break;

      case 'Date':
        convertedValue = convertValues.getValueFromDate(value);

      case 'String':
      default:
        convertedValue = convertValues.getValueFromString(value);
        break;
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
   * Get value from integer to grpc
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
   * Get value from a string to grpc
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
   * Get value from a boolean value to grpc
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
   * Get value from a date to grpc
   * @param value
   * @return
   */
  getValueFromDate(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();

    convertedValue.setValuetype(ValueType.DATE);
    convertedValue.setLongvalue(
      convertValues.getLongFromDate(value)
    );

    return convertedValue;
  },

  /**
   * Get value from big decimal to grpc
   * @param value
   * @return
   */
  getValueFromDecimal(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;
    const convertedValue = new Value();

    convertedValue.setValuetype(ValueType.DECIMAL);
    convertedValue.setDecimalvalue(
      convertValues.getDecimalFromNumber(value)
    );

    return convertedValue;
  },

  /**
   * Get big decimal from number to grpc
   * @param value
   * @return
   */
  getDecimalFromNumber(numberValue) {
    const { Decimal } = require('./grpc/proto/base_data_type_pb.js');
    const convertedDecimalValue = new Decimal();

    if (!convertValues.isEmptyValue(numberValue)) {
      if (Number.isInteger(numberValue)) {
        numberValue = numberValue.toFixed(2);
      }
      convertedDecimalValue.setDecimalvalue(numberValue.toString());

      //  Set scale
      let scale = numberValue.toString().indexOf('.');
      if (scale == -1) {
        scale = 0;
      } else {
        scale = numberValue.toString().length - scale - 1;
      }
      convertedDecimalValue.setScale(scale);
    }
    return convertedDecimalValue;
  },

  getLongFromDate(dateValue) {
    if (!convertValues.isEmptyValue(dateValue) &&
      convertValues.typeOfValue(dateValue) === 'Date') {
      return dateValue.getTime();
    }

    return dateValue;
  },

  /**
   * Convert a parameter defined by columnName and value to Value Object
   * @param {string} columnName
   * @param {string}  valueType
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
   * @param {string} selectionUuid // TODO: Add support to uuid record
   * @param {array}  selectionValues [{ columName: String, value: Mixed }]
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
   * @param {string} returnType 'map', 'object', 'array'
   * @param {string} keyName, used in array pairs, default value is 'key'
   * @param {string} valueName, used in array pairs, default value is 'value'
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
    if (!convertValues.isEmptyValue(value)) {
      conditionInstance.setValue(
        convertValues.convertValueToGRPC({ value })
      );
    }
    if (!convertValues.isEmptyValue(valueTo)) {
      conditionInstance.setValueto(
        convertValues.convertValueToGRPC({
          value: valueTo
        })
      );
    }
    // set values
    if (!convertValues.isEmptyValue(values)) {
      values.forEach(itemValue => {
        const convertedValue = convertValues.convertValueToGRPC({
          value: itemValue
        });
        conditionInstance.addValues(convertedValue);
      });
    }

    //  Return converted condition
    return conditionInstance;
  },

  /**
   * Get order by property converted to gRPC
   * @param {string} columnName
   * @param {string} orderType 'ASCENDING' or 'DESCENDING'
   */
  convertOrderByPropertyToGRPC({ columnName, orderType }) {
    const { OrderByProperty } = require('./grpc/proto/base_data_type_pb.js');
    const { OrderType } = OrderByProperty;
    const orderByInstance = new OrderByProperty;

    orderByInstance.setColumnname(columnName);
    // set order type, default is 0
    orderByInstance.setOrdertype(OrderType.ASCENDING);
    if (orderType) {
      orderByInstance.setOrdertype(OrderType[orderType]);
    }
    return orderByInstance;
  },

  /**
   * Get Criteria from Table Name
   * @param {string} tableName
   * @param {string} query
   * @param {string} whereClause
   * @param {string} referenceUuid
   * @param {array}  conditionsList [{ columnName: String, value: Mixed, valueTo: Mixed, values: Array, operator: String}]
   * @param {array}  valuesList mixed values
   * @param {array}  orderByColumnsList [{ columnName: String, orderType: Number }]
   * @param {string} orderByClause
   * @param {number} limit
   * @return {Criteria} instance
   */
  convertCriteriaToGRPC({
    tableName,
    query,
    whereClause,
    referenceUuid,
    conditionsList = [],
    orderByClause,
    valuesList = [],
    orderByColumnsList = [],
    limit
  }) {
    const { Criteria } = require('./grpc/proto/base_data_type_pb.js');
    const criteria = new Criteria();

    criteria.setTablename(tableName);
    criteria.setQuery(query);
    criteria.setWhereclause(whereClause);
    criteria.setReferenceuuid(referenceUuid);

    // add values
    if (!convertValues.isEmptyValue(valuesList)) {
      valuesList.forEach(itemValue => {
        const value = convertValues.convertValueToGRPC({
          value: itemValue
        });
        criteria.addValues(value);
      });
    }

    // add conditions
    if (!convertValues.isEmptyValue(conditionsList)) {
      conditionsList.forEach(itemCondition => {
        const convertCondition = convertValues.convertConditionToGRPC(itemCondition);
        criteria.addConditions(convertCondition);
      });
    }

    // set order by clause
    if (!convertValues.isEmptyValue(orderByColumnsList)) {
      orderByColumnsList.forEach(itemOrderBy => {
        const orderBy = convertValues.convertOrderByPropertyToGRPC({
          columnName: itemOrderBy.columnName,
          orderType: itemOrderBy.orderType
        });
        criteria.addOrderbycolumn(orderBy);
      })
    }
    criteria.setOrderbyclause(orderByClause);

    criteria.setLimit(limit);

    //  Return criteria
    return criteria;
  }

};

module.exports = convertValues;

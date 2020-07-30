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

const convertEnums = {
  /**
   * Get all values type or get key value type from value
   * @param {object} list
   * @param {string} key
   * @param {number} value
   * @returns {number|string|object}
   */
  getValueOrKey({ list, key, value }) {
    if (key !== undefined) {
      return list[key];
    } else if (value !== undefined) {
      return Object.values(list).find(valueItem => valueItem === value);
    }
    // return all values
    return list;
  },

  /**
   * Get all values type or get key value type from value
   * @param {string} key
   * @param {number} value
   * @returns {number|string|object}
      UNKNOWN = 0;
      INTEGER = 1;
      DECIMAL = 2;
      BOOLEAN = 3;
      STRING = 4;
      DATE = 5;
   */
  getValue_ValueType({ key, value }) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;

    return convertEnums.getValueOrKey({
      list: ValueType,
      key,
      value
    });
  },

  /**
   * Get all operator or get key value type from value
   * @param {string} key
   * @param {number} value
   * @returns {number|string|object}
      EQUAL = 0;
      NOT_EQUAL = 1;
      LIKE = 2;
      NOT_LIKE = 3;
      GREATER = 4;
      GREATER_EQUAL = 5;
      LESS = 6;
      LESS_EQUAL = 7;
      BETWEEN = 8;
      NOT_NULL = 9;
      NULL = 10;
      IN = 11;
      NOT_IN = 12;
   */
  getCondition_Operator({ key, value }) {
    const { Condition } = require('./grpc/proto/base_data_type_pb.js');
    const { Operator } = Condition;

    return convertEnums.getValueOrKey({
      list: Operator,
      key,
      value
    });
  },

  /**
   * @param {number} value
   * @param {string} key
   * @returns {number|string|object}
      ASCENDING = 0;
      DESCENDING = 1;
  */
  getOrderByProperty_OrderType({ key, value }) {
    const { OrderByProperty } = require('./grpc/proto/base_data_type_pb.js');
    const { OrderType } = OrderByProperty;

    return convertEnums.getValueOrKey({
      list: OrderType,
      key,
      value
    });
  },

  /**
   * Get all event type or get key value type from value
   * @param {number} value
   * @param {string} key
   * @returns {number|string|object}
      INSERT = 0;
      UPDATE = 1;
      DELETE = 2;
  */
  getRecordLog_EventType({ key, value }) {
    const { RecordLog } = require('./grpc/proto/base_data_type_pb.js');
    const { EventType } = RecordLog;

    return convertEnums.getValueOrKey({
      list: EventType,
      key,
      value
    });
  },

  /**
   * @returns
      CHECKING = 0;
      SAVINGS = 1;
   */
  getBankAccount_BankAccountType({ key, value }) {
    const { BankAccount } = require('./grpc/proto/core_functionality_pb');
    const { BankAccountType } = BankAccount;

    return convertEnums.getValueOrKey({
      list: BankAccountType,
      key,
      value
    });
  }

};

module.exports = convertEnums;

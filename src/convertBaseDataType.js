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

const convertBaseDataType = {
  /**
   * convert the value obtained from gRPC according to the type of value
   * @param {object} value
   * @returns {mixed}
   */
  convertValueFromGRPC(value) {
    const { Value } = require('./grpc/proto/base_data_type_pb.js');
    const { ValueType } = Value;

    if (value === undefined || value === null || value.getValuetype() === ValueType.UNKNOWN) {
      return undefined;
    }

    let returnValue;
    switch (value.getValuetype()) {
      case ValueType.INTEGER:
        // const { getIntegerFromValue } = require('./convertValues.js');
        returnValue = convertBaseDataType.getIntegerFromValue(value);
        break;
      // data type Number (float)
      case ValueType.DECIMAL:
        // const { getDecimalFromValue } = require('./convertValues.js');
        returnValue = convertBaseDataType.getDecimalFromValue(value);
        break;
      // data type Boolean
      case ValueType.BOOLEAN:
        // const { getBooleanFromValue } = require('./convertValues.js');
        returnValue = convertBaseDataType.getBooleanFromValue(value);
        break;
      // data type String
      case ValueType.STRING:
        // const { getStringFromValue } = require('./convertValues.js');
        returnValue = convertBaseDataType.getStringFromValue(value);
        break;
      // data type Date
      case ValueType.DATE:
        // const { getDateFromValue } = require('./convertValues.js');
        returnValue = convertBaseDataType.getDateFromValue(value);
        break;
      // empty value
      default:
      case ValueType.UNKNOWN:
        returnValue = undefined;
        break;
    }
    return returnValue;
  },

  /**
   * Get Decimal from Value
   * @param value
   * @return
   */
  getDecimalFromValue(value) {
    const { isEmptyValue } = require('./convertValues.js');
    const decimalValue = value.getDecimalvalue();

    if (isEmptyValue(decimalValue)) {
      return undefined;
    }
    // Convert it
    // return Number(decimalValue.getDecimalvalue());
    return Number(decimalValue);
  },

  /**
   * Get Date from a value
   * @param value value to convert
   * @return
   */
  getDateFromValue(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value) || value.getLongvalue() === 0) {
      return undefined;
    }
    if (value.getLongvalue() > 0) {
      return new Date(value.getLongvalue());
    }
    return undefined;
  },

  /**
   * Get String from a value
   * @param value
   * @param uppercase
   * @return
   */
  getStringFromValue(value, uppercase = false) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return undefined;
    }

    let stringValue = value.getStringvalue();
    //	To Upper case
    if (uppercase) {
      stringValue = stringValue.toUpperCase();
    }
    return stringValue;
  },

  /**
   * Get integer from a value
   * @param value
   * @return
   */
  getIntegerFromValue(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return undefined;
    }
    return value.getIntvalue();
  },

  /**
   * Get Boolean from a value
   * @param value
   * @return
   */
  getBooleanFromValue(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return false;
    }
    return value.getBooleanvalue();
  },

  /**
   * Convert criteria to json structure
   * @param {Criteria} criteriaToConvert
   * TODO: Add convert condition from gRPC and order by column from gRPC
   */
  convertCriteriaFromGRPC(criteriaToConvert) {
    if (criteriaToConvert) {
      return {
        tableName: criteriaToConvert.getTablename(),
        query: criteriaToConvert.getQuery(),
        whereClause: criteriaToConvert.getWhereclause(),
        orderByClause: criteriaToConvert.getOrderbyclause(),
        referenceUuid: criteriaToConvert.getReferenceuuid(),
        conditionsList: criteriaToConvert.getConditionsList().map(condition => {
          return condition;
        }),
        valuesList: criteriaToConvert.getValuesList().map(value => {
          return convertBaseDataType.convertValueFromGRPC(value);
        }),
        orderByColumnList: criteriaToConvert.getOrderbycolumnList().map(orderBy => {
          return convertBaseDataType.convertOrderByPropertyFromGRPC(orderBy);
        }),
        limit: criteriaToConvert.getLimit()
      };
    }
    return {
      tableName: undefined,
      query: undefined,
      whereClause: undefined,
      orderByClause: undefined,
      referenceUuid: undefined,
      conditionsList: undefined,
      valuesList: undefined,
      orderByColumnList: undefined,
      limit: undefined
    }
  },

  convertOrderByPropertyFromGRPC(orderByPropertyToConvert) {
    if (orderByPropertyToConvert) {
      const { getOrderByProperty_OrderType } = require('./convertEnums.js');
      return {
        columnName: orderByPropertyToConvert.getColumnname(),
        orderType: orderByPropertyToConvert.getOrdertype(),
        orderTypeName: getOrderByProperty_OrderType({
          value: orderByPropertyToConvert.getOrdertype()
        })
      };
    }
    return {
      columnName: undefined,
      orderType: undefined,
      orderTypeName: undefined
    };
  },

  convertRecordReferenceInfoFromGRPC(recordReferenceInfoToConvert) {
    if (recordReferenceInfoToConvert) {
      return {
        uuid: recordReferenceInfoToConvert.getUuid(),
        windowUuid: recordReferenceInfoToConvert.getWindowuuid(),
        displayName: recordReferenceInfoToConvert.getDisplayname(),
        tableName: recordReferenceInfoToConvert.getTablename(),
        whereClause: recordReferenceInfoToConvert.getWhereclause(),
        recordCount: recordReferenceInfoToConvert.getRecordcount()
      };
    }
    return {
      uuid: undefined,
      windowUuid: undefined,
      displayName: undefined,
      tableName: undefined,
      whereClause: undefined,
      recordCount: undefined,
    };
  },

  convertDocumentStatusFromGRPC(documentStatusToConvert) {
    if (documentStatusToConvert) {
      return {
        value: documentStatusToConvert.getValue(),
        name: documentStatusToConvert.getName(),
        description: documentStatusToConvert.getDescription()
      };
    }
    return {
      value: undefined,
      name: undefined,
      description: undefined
    };
  },

  convertDocumentActionFromGRPC(documentActionToConvert) {
    if (documentActionToConvert) {
      return {
        value: documentActionToConvert.getValue(),
        name: documentActionToConvert.getName(),
        description: documentActionToConvert.getDescription()
      };
    }
    return {
      value: undefined,
      name: undefined,
      description: undefined
    };
  },

  convertEntityFromGRPC({ entityToConvert, formatToConvert = 'object' }) {
    if (entityToConvert) {
      const { convertValuesMapFromGRPC } = require('./convertValues.js');

      return {
        id: entityToConvert.getId(),
        uuid: entityToConvert.getUuid(),
        tableName: entityToConvert.getTablename(),
        values: convertValuesMapFromGRPC({
          mapToConvert: entityToConvert.getValuesMap(),
          returnType: formatToConvert
        })
      };
    }
    return {
      id: undefined,
      uuid: undefined,
      tableName: undefined,
      values: undefined
    };
  },

  convertProcessLogFromGRPC(processLogToConvert) {
    if (processLogToConvert) {
      const { convertValuesMapFromGRPC } = require('./convertValues.js');

      return {
        uuid: processLogToConvert.getUuid(),
        instanceUuid: processLogToConvert.getInstanceuuid(),
        isError: processLogToConvert.getIserror(),
        summary: processLogToConvert.getSummary(),
        resultTableName: processLogToConvert.getResulttablename(),
        isProcessing: processLogToConvert.getIsprocessing(),
        lastRun: processLogToConvert.getLastrun(),
        logsList: processLogToConvert.getLogsList().map(log => {
          return convertBaseDataType.convertProcessInfoLogFromGRPC(
            log
          );
        }),
        parametersList: convertValuesMapFromGRPC({
          mapToConvert: processLogToConvert.getParametersMap(),
          returnType: 'object'
        }),
        output: convertBaseDataType.convertReportOutputFromGRPC(
          processLogToConvert.getOutput()
        )
      };
    }
    return {
      uuid: undefined,
      instanceUuid: undefined,
      isError: undefined,
      summary: undefined,
      resultTableName: undefined,
      isProcessing: undefined,
      lastRun: undefined,
      logsList: undefined,
      parametersList: undefined,
      output: undefined
    };
  },

  convertProcessInfoLogFromGRPC(processInfoLogToConvert) {
    if (processInfoLogToConvert) {
      return {
        recordId: processInfoLogToConvert.getRecordid(),
        log: processInfoLogToConvert.getLog()
      };
    }
    return {
      recordId: undefined,
      log: undefined
    };
  },

  convertTranslationFromGRPC(translationToConvert) {
    if (translationToConvert) {
      const { convertValuesMapFromGRPC } = require('./convertValues.js');

      return {
        language: translationToConvert.getLanguage(),
        translationUuid: translationToConvert.getTranslationuuid(),
        values: convertValuesMapFromGRPC({
          mapToConvert: translationToConvert.getValuesMap(),
          returnType: 'object'
        })
      };
    }
    return {
      language: undefined,
      translationUuid: undefined,
      values: undefined
    };
  },

  convertDashboardFromGRPC(dashboardToConvert) {
    if (dashboardToConvert) {
      return {
        windowUuid: dashboardToConvert.getWindowuuid(),
        browserUuid: dashboardToConvert.getBrowseruuid(),
        dashboardName: dashboardToConvert.getDashboardname(),
        dashboardDescription: dashboardToConvert.getDashboarddescription(),
        dashboardHtml: dashboardToConvert.getDashboardhtml(),
        columnNo: dashboardToConvert.getColumnno(),
        lineNo: dashboardToConvert.getLineno(),
        isCollapsible: dashboardToConvert.getIscollapsible(),
        isOpenByDefault: dashboardToConvert.getIsopenbydefault(),
        isEventRequired: dashboardToConvert.getIseventrequired(),
        fileName: dashboardToConvert.getFilename()
      };
    }
    return {
      windowUuid: undefined,
      browserUuid: undefined,
      dashboardName: undefined,
      dashboardDescription: undefined,
      dashboardHtml: undefined,
      columnNo: undefined,
      lineNo: undefined,
      isCollapsible: undefined,
      isOpenByDefault: undefined,
      isEventRequired: undefined,
      fileName: undefined,
    }
  },

  convertPrintFromatFromGRPC(printFromatToConvert) {
    if (printFromatToConvert) {
      return {
        printFormatUuid: printFromatToConvert.getUuid(),
        name: printFromatToConvert.getName(),
        description: printFromatToConvert.getDescription(),
        tableName: printFromatToConvert.getTablename(),
        isDefault: printFromatToConvert.getIsdefault(),
        reportViewUuid: printFromatToConvert.getReportviewuuid()
      };
    }
    return {
      printFormatUuid: undefined,
      name: undefined,
      description: undefined,
      tableName: undefined,
      isDefault: undefined,
      reportViewUuid: undefined
    };
  },

  convertRecordLogFromGRPC(recordLogToConvert) {
    if (recordLogToConvert) {
      const { getRecordLog_EventType } = require('./convertEnums.js');

      return {
        logId: recordLogToConvert.getLogid(),
        recordId: recordLogToConvert.getRecordid(),
        tableName: recordLogToConvert.getTablename(),
        sessionUuid: recordLogToConvert.getSessionuuid(),
        userUuid: recordLogToConvert.getUseruuid(),
        userName: recordLogToConvert.getUsername(),
        transactionName: recordLogToConvert.getTransactionname(),
        eventType: recordLogToConvert.getEventtype(),
        eventTypeName: getRecordLog_EventType({
          value: recordLogToConvert.getEventtype()
        }),
        logDate: new Date(recordLogToConvert.getLogdate()),
        changeLogsList: recordLogToConvert.getChangelogsList().map(changeLog => {
          return convertBaseDataType.convertChangeLogFromGRPC(
            changeLog
          );
        })
      };
    }
    return {
      logUuid: undefined,
      recordId: undefined,
      tableName: undefined,
      columnName: undefined,
      displayColumnName: undefined,
      sessionUuid: undefined,
      userUuid: undefined,
      userName: undefined,
      transactionName: undefined,
      oldValue: undefined,
      oldDisplayValue: undefined,
      newValue: undefined,
      newDisplayValue: undefined,
      description: undefined,
      eventType: undefined,
      logDate: undefined
    };
  },

  convertChangeLogFromGRPC(changeLogToConvert) {
    if (changeLogToConvert) {
      return {
        columnName: changeLogToConvert.getColumnname(),
        displayColumnName: changeLogToConvert.getDisplaycolumnname(),
        oldValue: changeLogToConvert.getOldvalue(),
        newValue: changeLogToConvert.getNewvalue(),
        oldDisplayValue: changeLogToConvert.getOlddisplayvalue(),
        newDisplayValue: changeLogToConvert.getNewdisplayvalue(),
        description: changeLogToConvert.getDescription()
      };
    }
    return {
      columnName: undefined,
      displayColumnName: undefined,
      oldValue: undefined,
      newValue: undefined,
      oldDisplayValue: undefined,
      newDisplayValue: undefined,
      description: undefined
    };
  },

  convertReportViewFromGRPC(reportViewToConvert) {
    if (reportViewToConvert) {
      return {
        reportViewUuid: reportViewToConvert.getUuid(),
        name: reportViewToConvert.getName(),
        description: reportViewToConvert.getDescription(),
        tableName: reportViewToConvert.getTablename()
      };
    }
    return {
      reportViewUuid: undefined,
      name: undefined,
      description: undefined,
      tableName: undefined
    };
  },

  convertDrillTableFromGRPC(drillTableToConvert) {
    if (drillTableToConvert) {
      return {
        tableName: drillTableToConvert.getTablename(),
        printName: drillTableToConvert.getPrintname()
      };
    }
    return {
      tableName: undefined,
      printName: undefined
    };
  },

  convertReportOutputFromGRPC(reportOutputToConvert) {
    if (reportOutputToConvert) {
      return {
        uuid: reportOutputToConvert.getUuid(),
        name: reportOutputToConvert.getName(),
        description: reportOutputToConvert.getDescription(),
        fileName: reportOutputToConvert.getFilename(),
        output: reportOutputToConvert.getOutput(),
        mimeType: reportOutputToConvert.getMimetype(),
        dataCols: reportOutputToConvert.getDatacols(),
        dataRows: reportOutputToConvert.getDatarows(),
        headerName: reportOutputToConvert.getHeadername(),
        footerName: reportOutputToConvert.getFootername(),
        printFormatUuid: reportOutputToConvert.getPrintformatuuid(),
        reportViewUuid: reportOutputToConvert.getReportviewuuid(),
        tableName: reportOutputToConvert.getTablename(),
        outputStream: reportOutputToConvert.getOutputstream(),
        outputStream_asB64: reportOutputToConvert.getOutputstream_asB64(),
        outputStream_asU8: reportOutputToConvert.getOutputstream_asU8(),
        reportType: reportOutputToConvert.getReporttype()
      };
    }
    return {
      uuid: undefined,
      name: undefined,
      description: undefined,
      fileName: undefined,
      output: undefined,
      mimeType: undefined,
      dataCols: undefined,
      dataRows: undefined,
      headerName: undefined,
      footerName: undefined,
      printFormatUuid: undefined,
      reportViewUuid: undefined,
      tableName: undefined,
      outputStream: undefined,
      outputStream_asB64: undefined,
      outputStream_asU8: undefined,
      reportType: undefined
    };
  }
}

module.exports = convertBaseDataType;

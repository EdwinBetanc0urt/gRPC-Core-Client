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
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return undefined;
    }

    let returnValue;
    switch (value.getValuetype()) {
      case ValueType.INTEGER:
        returnValue = convertBaseDataType.getIntegerFromGRPC(value);
        break;
      // data type Number (float)
      case ValueType.DECIMAL:
        returnValue = convertBaseDataType.getDecimalFromGRPC(value);
        break;
      // data type Boolean
      case ValueType.BOOLEAN:
        returnValue = convertBaseDataType.getBooleanFromGRPC(value);
        break;
      // data type String
      case ValueType.STRING:
        returnValue = convertBaseDataType.getStringFromGRPC(value);
        break;
      // data type Date
      case ValueType.DATE:
        returnValue = convertBaseDataType.getDateFromGRPC(value);
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
  getDecimalFromGRPC(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (!isEmptyValue(value) && !isEmptyValue(value.getDecimalvalue())) {
      // Convert it
      return Number(value.getDecimalvalue());
    }

    return undefined;
  },

  /**
   * Get Date from a grpc value
   * @param value value to convert
   * @return
   */
  getDateFromGRPC(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (!isEmptyValue(value) && value.getLongvalue() > 0) {
      return new Date(value.getLongvalue());
    }
    return undefined;
  },

  /**
   * Get String from a grpc value
   * @param value
   * @param uppercase
   * @return
   */
  getStringFromGRPC(value, uppercase = false) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return undefined;
    }

    let stringValue = value.getStringvalue();
    // To Upper case
    if (uppercase) {
      stringValue = stringValue.toUpperCase();
    }
    return stringValue;
  },

  /**
   * Get integer from a grpc value
   * @param value
   * @return
   */
  getIntegerFromGRPC(value) {
    const { isEmptyValue } = require('./convertValues.js');

    if (isEmptyValue(value)) {
      return undefined;
    }
    return value.getIntvalue();
  },

  /**
   * Get Boolean from a grpc value
   * @param value
   * @return
   */
  getBooleanFromGRPC(value) {
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
    return undefined;
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
    return undefined;
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
    return undefined;
  },

  convertDocumentStatusFromGRPC(documentStatusToConvert) {
    if (documentStatusToConvert) {
      return {
        value: documentStatusToConvert.getValue(),
        name: documentStatusToConvert.getName(),
        description: documentStatusToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertDocumentActionFromGRPC(documentActionToConvert) {
    if (documentActionToConvert) {
      return {
        value: documentActionToConvert.getValue(),
        name: documentActionToConvert.getName(),
        description: documentActionToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertEntityFromGRPC({ entityToConvert, formatToConvert = 'array' }) {
    if (entityToConvert) {
      const { convertValuesMapFromGRPC } = require('./convertValues.js');

      return {
        id: entityToConvert.getId(),
        uuid: entityToConvert.getUuid(),
        tableName: entityToConvert.getTablename(),
        values: convertValuesMapFromGRPC({
          mapToConvert: entityToConvert.getValuesMap(),
          returnType: formatToConvert,
          keyName: 'columnName',
          valueName: 'value'
        })
      };
    }
    return undefined;
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
    return undefined;
  },

  convertProcessInfoLogFromGRPC(processInfoLogToConvert) {
    if (processInfoLogToConvert) {
      return {
        recordId: processInfoLogToConvert.getRecordid(),
        log: processInfoLogToConvert.getLog()
      };
    }
    return undefined;
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
    return undefined;
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
    return undefined;
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
    return undefined;
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
    return undefined;
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
    return undefined;
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
    return undefined;
  },

  convertDrillTableFromGRPC(drillTableToConvert) {
    if (drillTableToConvert) {
      return {
        tableName: drillTableToConvert.getTablename(),
        printName: drillTableToConvert.getPrintname()
      };
    }
    return undefined;
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
    return undefined;
  },

  convertResourceFromGRPC(resourceToConvert) {
    if (resourceToConvert) {
      return resourceToConvert.getData();
    }
    return undefined;
  },

  convertAttachmentFromGRPC(attachmentToConvert) {
    if (attachmentToConvert) {
      return {
        attachmentUuid: attachmentToConvert.getAttachmentuuid(),
        title: attachmentToConvert.getTitle(),
        textMsg: attachmentToConvert.getTextmsg(),
        resourcesList: attachmentToConvert.getResourcesList().map(itemResource => {
          return convertBaseDataType.convertResourceFromGRPC(
            itemResource
          );
        })
      };
    }
    return undefined;
  },

  convertResourceReferenceFromGRPC(resourceReferenceToConvert) {
    if (resourceReferenceToConvert) {
      return {
        resourceUuid: resourceReferenceToConvert.getResourceuuid(),
        fileName: resourceReferenceToConvert.getFilename(),
        fileSize: resourceReferenceToConvert.getFilesize(),
        description: resourceReferenceToConvert.getDescription(),
        textMsg: resourceReferenceToConvert.getTextmsg(),
        contentType: resourceReferenceToConvert.getContenttype()
      }
    }
    return undefined;
  }

};

module.exports = convertBaseDataType;

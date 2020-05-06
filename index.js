/*************************************************************************************
 * Product: ADempiere gRPC Business Data Client                                      *
 * Copyright (C) 2012-2018 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Yamel Senih ysenih@erpya.com                                      *
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
class BusinessData {

  /**
   * Constructor, No authentication required
   * @param {string} host
   * @param {string} sessionUuid
   * @param {string} organizationUuid
   * @param {string} warehouseUuid
   * @param {string} language Languaje i18n
   */
  constructor({
    host,
    sessionUuid,
    organizationUuid,
    warehouseUuid,
    language = 'en_US',
  }) {
    this.sessionUuid = sessionUuid;
    this.host = host;
    this.language = language;
    this.organizationUuid = organizationUuid;
    this.warehouseUuid = warehouseUuid;
  }

  /**
   * Load gRPC Connection
   * @return {object} requestService Return request for get data
   */
  getBusinessService() {
    const grpc_promise = require('grpc-promise');
    const { BusinessDataPromiseClient } = require('./src/grpc/proto/business_grpc_web_pb.js');
    const requestService = new BusinessDataPromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Load gRPC Connection for core functionality service
   * @return {object} requestService Return request for get data
   */
  getCoreFunctionalityService() {
    const grpc_promise = require('grpc-promise');
    const { CoreFunctionalityPromiseClient } = require('./src/grpc/proto/core_functionality_grpc_web_pb.js');
    const requestService = new CoreFunctionalityPromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Load gRPC Connection
   * @return {object} requestService Return request for user interface service
   */
  getUserInterfaceService() {
    const grpc_promise = require('grpc-promise');
    const { UserInterfacePromiseClient } = require('./src/grpc/proto/business_grpc_web_pb.js');
    const requestService = new UserInterfacePromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Load gRPC Connection
   * @return {object} requestService Return request workdlow service
   */
  getWorkflowService() {
    const grpc_promise = require('grpc-promise');
    const { WorkflowPromiseClient } = require('./src/grpc/proto/business_grpc_web_pb.js');
    const requestService = new WorkflowPromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Load gRPC Connection
   * @return {object} requestService Return request for dashboarding service
   */
  getDashboardingService() {
    const grpc_promise = require('grpc-promise');
    const { DashboardingPromiseClient } = require('./src/grpc/proto/business_grpc_web_pb.js');
    const requestService = new DashboardingPromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Load gRPC Connection
   * @return {object} requestService Return request for log service
   */
  getEntityLogService() {
    const grpc_promise = require('grpc-promise');
    const { EntityLogPromiseClient } = require('./src/grpc/proto/business_grpc_web_pb.js');
    const requestService = new EntityLogPromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  getClientRequest() {
    const { ClientRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const clientRequest = new ClientRequest();
    clientRequest.setSessionuuid(this.sessionUuid);
    clientRequest.setLanguage(this.language);
    clientRequest.setOrganizationuuid(this.organizationUuid);
    clientRequest.setWarehouseuuid(this.warehouseUuid);
    return clientRequest;
  }

  /**
   * Checks if value is empty. Deep-checks arrays and objects
   * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
   * @param   {boolean|array|object|number|string|date|map|function} value
   * @returns {boolean}
   */
  isEmptyValue(value) {
    const { isEmptyValue } = require('./src/convertUtils');
    return isEmptyValue(value);
  }

  /**
   * Create a entity from CreateEntityRequest object
   * @param {string} tableName
   * @param {array}  attributesList [{ value, columnName }]
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   * @return {Entity} Entity created.
   */
  requestCreateEntity({ tableName, attributesList = [], isConvert = true, formatToConvert = 'object' }) {
    const { CreateEntityRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new CreateEntityRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);

    if (attributesList && attributesList.length) {
      const { convertParameterToGRPC } = require('./src/convertUtils.js');

      attributesList.forEach(attribute => {
        const convertedAttribute = convertParameterToGRPC(attribute);
        request.addAttributes(convertedAttribute);
      });
    }

    return this.getBusinessService().createEntity(request)
      .then(responseCreateEntity => {
        if (isConvert) {
          const { convertEntityFromGRPC } = require('./src/convertUtils');

          return convertEntityFromGRPC({
            entityToConvert: responseCreateEntity,
            formatToConvert
          });
        }
        return responseCreateEntity;
      });
  }

  /**
   * Create a entity from UpdateEntityRequest object
   * @param {string} tableName
   * @param {number} recordId
   * @param {string} recordUuid
   * @param {array}  attributesList [{ value, columnName }]
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   * @return {Entity} Entity updated.
   */
  requestUpdateEntity({ tableName, recordId, recordUuid, attributesList = [], isConvert = true, formatToConvert = 'object' }) {
    const { UpdateEntityRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new UpdateEntityRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setUuid(recordUuid);

    if (attributesList && attributesList.length) {
      const { convertParameterToGRPC } = require('./src/convertUtils.js');

      attributesList.forEach(attribute => {
        const convertedAttribute = convertParameterToGRPC(attribute);
        request.addAttributes(convertedAttribute);
      });
    }

    return this.getBusinessService().updateEntity(request)
      .then(responseUpdateEntity => {
        if (isConvert) {
          const { convertEntityFromGRPC } = require('./src/convertUtils');

          return convertEntityFromGRPC({
            entityToConvert: responseUpdateEntity,
            formatToConvert
          });
        }
        return responseUpdateEntity;
      });
  }

  /**
   * Get Client Request
   * @param {string} tableName, Table name from request
   * @param {string} recordUuid, Universally Unique IDentifier from record
   * @param {number} recordId, IDentifier from record
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   * @return {object} Entity with records
   */
  requestGetEntity({ tableName, recordUuid, recordId, isConvert = true, formatToConvert = 'object' }) {
    const { GetEntityRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new GetEntityRequest();

    request.setClientrequest(this.getClientRequest());
    request.setRecordid(recordId);
    request.setUuid(recordUuid);

    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');
    const criteriaForRequestEntity = convertCriteriaToGRPC({ tableName });
    request.setCriteria(criteriaForRequestEntity);

    return this.getBusinessService().getEntity(request)
    .then(getEntityResponse => {
      if (isConvert) {
        const { convertEntityFromGRPC } = require('./src/convertUtils');

        return convertEntityFromGRPC({
          entityToConvert: getEntityResponse,
          formatToConvert
        });
      }
      return getEntityResponse;
    });
  }

  /**
   * Get Country Information
   * @param {string} countryUuid, Universally Unique IDentifier from country
   * @param {number} countryId, IDentifier from country
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   * @return {object} Entity with records
   */
  requestGetCountry({ countryUuid, countryId, isConvert = true }) {
    const { GetCountryRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const request = new GetCountryRequest();

    request.setClientrequest(this.getClientRequest());
    request.setCountryid(countryId);
    request.setCountryuuid(countryUuid);
    //
    return this.getCoreFunctionalityService().getCountry(request)
      .then(countryResponse => {
        if (isConvert) {
          const { convertCountryFromGRPC } = require('./src/convertUtils');
          return convertCountryFromGRPC(countryResponse);
        }
        return countryResponse;
      });
  }

  /**
   * Get entities list
   * @param {string} tableName
   * @param {string} query
   * @param {string} whereClause
   * @param {array}  conditionsList
   * @param {string} orderByClause
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   * @returns {ListEntitiesResponse}
   */
  requestListEntities({ tableName, query, whereClause, conditionsList = [], orderByClause, pageToken, pageSize, isConvert = true, formatToConvert = 'object' }) {
    const { ListEntitiesRequest } = require('./src/grpc/proto/business_pb.js');

    const request = new ListEntitiesRequest();
    request.setClientrequest(this.getClientRequest());

    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');
    const criteriaForList = convertCriteriaToGRPC({
      tableName,
      query,
      whereClause,
      conditionsList,
      orderByClause
    });
    request.setCriteria(criteriaForList);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getBusinessService().listEntities(request)
      .then(entitiesListResponse => {
        if (isConvert) {
          const { convertEntityFromGRPC } = require('./src/convertUtils');

          return {
            recordCount: entitiesListResponse.getRecordcount(),
            recordsList: entitiesListResponse.getRecordsList().map(entityItem => {
              return convertEntityFromGRPC({
                entityToConvert: entityItem,
                formatToConvert
              });
            }),
            nextPageToken: entitiesListResponse.getNextPageToken(),
          };
        }
        return entitiesListResponse;
      });
  }

  // Request Organization list
  requestListOrganizations({ roleUuid, roleId, pageToken, pageSize, isConvert = true }) {
    const { ListOrganizationsRequest } = require('./src/grpc/proto/core_functionality_pb.js');

    const request = new ListOrganizationsRequest();
    request.setClientrequest(this.getClientRequest());
    request.setRoleuuid(roleUuid);
    request.setRoleid(roleId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listOrganizations(request)
      .then(organizationsListResponse => {
        if (isConvert) {
          const { convertOrganizationFromGRPC } = require('./src/convertUtils');

          return {
            recordCount: organizationsListResponse.getRecordcount(),
            organizationsList: organizationsListResponse.getOrganizationsList().map(organization => {
              return convertOrganizationFromGRPC(organization);
            }),
            nextPageToken: organizationsListResponse.getNextPageToken(),
          };
        }
        return organizationsListResponse;
      });
  }

  // Request Warehouse list
  requestListWarehouses({ organizationUuid, organizationId, pageToken, pageSize, isConvert = true }) {
    const { ListWarehousesRequest } = require('./src/grpc/proto/core_functionality_pb.js');

    const request = new ListWarehousesRequest();
    request.setClientrequest(this.getClientRequest());
    request.setOrganizationuuid(organizationUuid);
    request.setOrganizationid(organizationId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listWarehouses(request)
      .then(warehousesListResponse => {
        if (isConvert) {
          const { convertWarehouseFromGRPC } = require('./src/convertUtils');

          return {
            recordCount: warehousesListResponse.getRecordcount(),
            warehousesList: warehousesListResponse.getWarehousesList().map(warehouse => {
              return convertWarehouseFromGRPC(warehouse);
            }),
            nextPageToken: warehousesListResponse.getNextPageToken(),
          };
        }
        return warehousesListResponse;
      });
  }

  /**
   * Delete a entity request
   * @param {string} tableName
   * @param {number} recordId
   * @param {string} recordUuid
   * @return {Empty} empty for deleted and throw for error.
   */
  requestDeleteEntity({ tableName, recordId, recordUuid }) {
    const { DeleteEntityRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new DeleteEntityRequest();
    request.setClientrequest(this.getClientRequest());

    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setUuid(recordUuid);

    return this.getBusinessService().deleteEntity(request);
  }

  /**
   * Rollback last Entity operation
   * @param {string} tableName
   * @param {string} recordId
   * @param {string} eventTypeExecuted
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   */
  requestRollbackEntity({ tableName, recordId, eventTypeExecuted, isConvert = true, formatToConvert = 'object' }) {
    const { RollbackEntityRequest } = require('./src/grpc/proto/business_pb.js');
    const { getRollbackEntityRequestEventType } = require('./src/convertUtils.js');

    const rollbackRequest = new RollbackEntityRequest();
    rollbackRequest.setClientrequest(this.getClientRequest());
    rollbackRequest.setTablename(tableName);
    rollbackRequest.setRecordid(recordId);

    // set event type
    const eventType = getRollbackEntityRequestEventType({ key: eventTypeExecuted });
    rollbackRequest.setEventtype(eventType);

    return this.getUserInterfaceService().rollbackEntity(rollbackRequest)
      .then(rollBackResponse => {
        if (isConvert) {
          const { convertEntityFromGRPC } = require('./src/convertUtils');

          return convertEntityFromGRPC({
            entityToConvert: rollBackResponse,
            formatToConvert
          });
        }
        return rollBackResponse;
      });
  }

  /**
   * Request Object from query
   * @param {string} query
   */
  requestGetDefaultValue(query) {
    const { GetDefaultValueRequest } = require('./src/grpc/proto/business_pb.js');
    const defaultValueInstance = new GetDefaultValueRequest();

    defaultValueInstance.setClientrequest(this.getClientRequest());
    defaultValueInstance.setQuery(query);

    return this.getUserInterfaceService().getDefaultValue(defaultValueInstance)
      .then(defaultValueResponse => {
        const { convertValueFromGRPC } = require('./src/convertUtils.js');

        return convertValueFromGRPC(defaultValueResponse);
      });
  }

  /**
   * Request context info value
   * @param {string}  uuid
   * @param {string}  query
   * @param {boolean} isConvert
   */
  requestGetContextInfoValue({ uuid, query, isConvert = true }) {
    const { GetContextInfoValueRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new GetContextInfoValueRequest();
    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setQuery(query);
    requestInstance.setUuid(uuid);

    return this.getUserInterfaceService().getContextInfoValue(requestInstance)
      .then(contextInfoResponse => {
        if (isConvert) {
          return {
            messageText: contextInfoResponse.getMessagetext(),
            messageTip: contextInfoResponse.getMessagetip()
          };
        }
        return contextInfoResponse;
      });
  }

  /**
   * Get Private Access
   * @param {string} tableName
   * @param {string} userUuid
   * @param {number} recordId
   * @param {boolean} isConvert
   * TODO: Add support with userId and recordUuid
   */
  requestGetPrivateAccess({ tableName, recordId, userUuid, isConvert = true }) {
    const { GetPrivateAccessRequest } = require('./src/grpc/proto/business_pb.js');
    const privateAccessInstance = new GetPrivateAccessRequest();
    privateAccessInstance.setClientrequest(this.getClientRequest());
    privateAccessInstance.setTablename(tableName);
    privateAccessInstance.setRecordid(recordId);
    privateAccessInstance.setUseruuid(userUuid);

    return this.getUserInterfaceService().getPrivateAccess(privateAccessInstance)
      .then(privateAccessResponse => {
        if (isConvert) {
          const { convertPrivateAccessFromGRPC } = require('./src/convertUtils.js');
          return convertPrivateAccessFromGRPC(privateAccessResponse);
        }
        return privateAccessResponse;
      });
  }

  /**
   * Lock Private Access
   * @param {string} tableName
   * @param {string} userUuid
   * @param {number} recordId
   * @param {boolean} isConvert
   * TODO: Add support with userId and recordUuid
   */
  requestLockPrivateAccess({ tableName, recordId, userUuid, isConvert = true }) {
    const { LockPrivateAccessRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new LockPrivateAccessRequest();
    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setRecordid(recordId);
    requestInstance.setUseruuid(userUuid);

    return this.getUserInterfaceService().lockPrivateAccess(requestInstance)
      .then(privateAccessResponse => {
        if (isConvert) {
          const { convertPrivateAccessFromGRPC } = require('./src/convertUtils.js');
          return convertPrivateAccessFromGRPC(privateAccessResponse);
        }
        return privateAccessResponse;
      });
  }

  /**
   * Lock Private Access
   * @param {string} tableName
   * @param {string} userUuid
   * @param {number} recordId
   * @param {boolean} isConvert
   * TODO: Add support with userId and recordUuid
   */
  requestUnlockPrivateAccess({ tableName, recordId, userUuid, isConvert = true }) {
    const { UnlockPrivateAccessRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new UnlockPrivateAccessRequest();

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setRecordid(recordId);
    requestInstance.setUseruuid(userUuid);

    return this.getUserInterfaceService().unlockPrivateAccess(requestInstance)
      .then(privateAccessResponse => {
        if (isConvert) {
          const { convertPrivateAccessFromGRPC } = require('./src/convertUtils.js');
          return convertPrivateAccessFromGRPC(privateAccessResponse);
        }
        return privateAccessResponse;
      });
  }

  /**
   * List all references from window
   * @param {string}  windowUuid
   * @param {string}  tableName
   * @param {string}  recordUuid
   * @param {number}  recordId
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListReferences({ windowUuid, tableName, recordId, recordUuid, pageToken, pageSize, isConvert = true }) {
    const { ListReferencesRequest } = require('./src/grpc/proto/business_pb.js');
    const requestReference = new ListReferencesRequest();
    requestReference.setClientrequest(this.getClientRequest());

    requestReference.setWindowuuid(windowUuid);
    requestReference.setTablename(tableName);
    requestReference.setUuid(recordUuid);
    requestReference.setRecordid(recordId);
    requestReference.setPageToken(pageToken);
    requestReference.setPageSize(pageSize);

    return this.getUserInterfaceService().listReferences(requestReference)
      .then(referenceResponse => {
        if (isConvert) {
          const { convertRecordReferenceInfoFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: referenceResponse.getRecordcount(),
            referencesList: referenceResponse.getReferencesList().map(referenceItem => {
              return convertRecordReferenceInfoFromGRPC(referenceItem);
            }),
            nextPageToken: referenceResponse.getNextPageToken()
          };
        }
        return referenceResponse;
      });
  }

  /**
   * Get Report Output from criteria
   * @param {string}  printFormatUuid
   * @param {string}  reportViewUuid
   * @param {boolean} isSummary
   * @param {string}  reportName
   * @param {string}  reportType
   * @param {array}   parametersList
   * @param {boolean} isConvert
   */
  requestGetReportOutput({ parametersList = [], tableName, printFormatUuid, reportViewUuid, isSummary, reportName, reportType, isConvert = true }) {
    const { GetReportOutputRequest } = require('./src/grpc/proto/business_pb.js');
    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');

    const reportOutputInstance = new GetReportOutputRequest();
    reportOutputInstance.setClientrequest(this.getClientRequest());
    reportOutputInstance.setPrintformatuuid(printFormatUuid);
    reportOutputInstance.setIssummary(isSummary);
    reportOutputInstance.setReporttype(reportType);
    reportOutputInstance.setReportviewuuid(reportViewUuid);
    reportOutputInstance.setReportname(reportName);

    const criteriaForReport = convertCriteriaToGRPC({ tableName });
    if (parametersList && parametersList.length) {
      parametersList.forEach(parameter => {
        if(parameter.columnName.endsWith('_To')) {
          var previousParemeter = parametersList.find(param => param.columnName === parameter.columnName.replace('_To', ''));
          if(previousParemeter && previousParemeter.isRange) {
            parameter.columnName = parameter.columnName.replace('_To', '');
          }
        }
        const { convertConditionToGRPC } = require('./src/convertUtils.js');
        const convertedCondition = convertConditionToGRPC(parameter);
        criteriaForReport.addConditions(convertedCondition);
      });
    }
    reportOutputInstance.setCriteria(criteriaForReport);
    return this.getUserInterfaceService().getReportOutput(reportOutputInstance)
      .then(reportOutputResponse => {
        if (isConvert) {
          const { convertReportOutputFromGRPC } = require('./src/convertUtils.js');
          return convertReportOutputFromGRPC(reportOutputResponse);
        }
        return reportOutputResponse;
      });
  }

  /**
   * Request Lookup from Reference
   * @param {string} tableName
   * @param {string} directQuery
   * @param {string|number} value current value to get display column
   */
  requestLookupFromReference({ tableName, directQuery, value, isConvert = true }) {
    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');

    const criteriaForLookup = convertCriteriaToGRPC({
      tableName,
      query: directQuery,
      valuesList: [ value ]
    });

    const { GetLookupItemRequest } = require('./src/grpc/proto/business_pb.js');
    const requestLookup = new GetLookupItemRequest();
    requestLookup.setClientrequest(this.getClientRequest());
    requestLookup.setCriteria(criteriaForLookup);

    return this.getUserInterfaceService().getLookupItem(requestLookup)
      .then(lookupItemRepsonse => {
        if (isConvert) {
          const { convertLookupFromGRPC } = require('./src/convertUtils.js');
          return convertLookupFromGRPC(lookupItemRepsonse);
        }
        return lookupItemRepsonse;
      });
  }

  /**
   * Request Lookup List from Reference
   * @param {string} tableName
   * @param {string} query
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListLookupFromReference({ tableName, query, valuesList, pageToken, pageSize, isConvert = true }) {
    const { ListLookupItemsRequest } = require('./src/grpc/proto/business_pb.js');
    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');
    const criteriaForLookup = convertCriteriaToGRPC({ tableName, query, valuesList });

    const requestLookup = new ListLookupItemsRequest();
    requestLookup.setClientrequest(this.getClientRequest());
    requestLookup.setCriteria(criteriaForLookup);
    requestLookup.setPageToken(pageToken);
    requestLookup.setPageSize(pageSize);

    return this.getUserInterfaceService().listLookupItems(requestLookup)
      .then(lookupsListRepsonse => {
        if (isConvert) {
          const { convertLookupFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: lookupsListRepsonse.getRecordcount(),
            recordsList: lookupsListRepsonse.getRecordsList().map(lookupItem => {
              return convertLookupFromGRPC(lookupItem);
            }),
            nextPageToken: lookupsListRepsonse.getNextPageToken()
          };
        }
        return lookupsListRepsonse;
      });
  }

  /**
   * Request a process to run
   * @param {string}  uuid, uuid from process to run
   * @param {number}  tableName, table name of tab, used only window
   * @param {number}  recordId, record identifier, used only window
   * @param {string}  recordUuid, // TODO: Add record uuid
   * @param {array}   parametersList, parameters from process [{ columnName, value }]
   * @param {array}   selectionsList, selection records, used only browser
        [{
          selectionId,
          selectionValues: [{ columnName, value }]
        }]
   * @param {boolean} isConvert
   */
  requestRunProcess({ uuid, reportType, printFormatUuid, parametersList, tableName, recordId, recordUuid, selectionsList = [], isConvert = true }) {
    const { RunBusinessProcessRequest } = require('./src/grpc/proto/business_pb.js');
    const processRequest = new RunBusinessProcessRequest();
    processRequest.setClientrequest(this.getClientRequest());

    //  Fill Request process
    processRequest.setUuid(uuid);
    // report export type
    if (reportType) {
      processRequest.setReporttype(reportType);
    }
    if (printFormatUuid) {
      processRequest.setPrintformatuuid(printFormatUuid);
    }
    // process params
    if (parametersList && parametersList.length) {
      const { convertParameterToGRPC } = require('./src/convertUtils.js');

      parametersList.forEach(parameter => {
        const convertedParameter = convertParameterToGRPC(parameter);
        processRequest.addParameters(convertedParameter);
      });
    }

    // record in window
    if (tableName) {
      processRequest.setTablename(tableName);
      processRequest.setRecordid(recordId);
    }

    // browser selection list records
    if (selectionsList && selectionsList.length) {
      const { convertSelectionToGRPC } = require('./src/convertUtils.js');

      selectionsList.forEach(record => {
        // selection format = { selectionId: number, selectionValues: array }
        const convertedRecord = convertSelectionToGRPC(record);
        processRequest.addSelections(convertedRecord);
      });
    }

    return this.getBusinessService().runBusinessProcess(processRequest)
      .then(runProcessResponse => {
        if (isConvert) {
          const { convertProcessLogFromGRPC } = require('./src/convertUtils.js');
          return convertProcessLogFromGRPC(runProcessResponse);
        }
        return runProcessResponse;
      });
  }

  /**
   * Request Browser Search
   * @param {string} uuid Of browser
   * @param {array}  parametersList
   * @param {string} query
   * @param {string} whereClause
   * @param {string} orderByClause
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   * @param {string}  formatToConvert
   */
  requestListBrowserSearch({ uuid, parametersList = [], query, whereClause, orderByClause, pageToken, pageSize, isConvert = true, formatToConvert = 'object' }) {
    const { ListBrowserItemsRequest } = require('./src/grpc/proto/business_pb.js');
    const browserRequest = new ListBrowserItemsRequest();
    browserRequest.setClientrequest(this.getClientRequest());

    //  Fill Request browser
    browserRequest.setUuid(uuid);
    browserRequest.setPageToken(pageToken);
    browserRequest.setPageSize(pageSize);

    // isQueryCriteria fields parameters list
    if (parametersList && parametersList.length) {
      const { convertParameterToGRPC } = require('./src/convertUtils.js');

      parametersList.forEach(parameter => {
        const convertedParameter = convertParameterToGRPC(parameter);
        browserRequest.addParameters(convertedParameter);
      });
    }
    const { convertCriteriaToGRPC } = require('./src/convertUtils.js');
    const browserCriteria = convertCriteriaToGRPC({ query, whereClause, orderByClause });
    browserRequest.setCriteria(browserCriteria);

    return this.getUserInterfaceService().listBrowserItems(browserRequest)
      .then(browserSearchResponse => {
        if (isConvert) {
          const { convertEntityFromGRPC } = require('./src/convertUtils');

          return {
            recordCount: browserSearchResponse.getRecordcount(),
            recordsList: browserSearchResponse.getRecordsList().map(entityItem => {
              return convertEntityFromGRPC({
                entityToConvert: entityItem,
                formatToConvert
              });
            }),
            nextPageToken: browserSearchResponse.getNextPageToken()
          };
        }
        return browserSearchResponse;
      });
  }

  /**
   * Request Processes Logs List
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListProcessesLogs({ tableName, recordId, pageToken, pageSize, isConvert = true }) {
    const { ListProcessLogsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListProcessLogsRequest();
    request.setClientrequest(this.getClientRequest());
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);
    request.setTablename(tableName);
    request.setRecordid(recordId);
    //  return
    return this.getEntityLogService().listProcessLogs(request)
      .then(processLogsResponse => {
        if (isConvert) {
          const { convertProcessLogFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: processLogsResponse.getRecordcount(),
            processLogsList: processLogsResponse.getProcesslogsList().map(processItem => {
              return convertProcessLogFromGRPC(processItem);
            }),
            nextPageToken: processLogsResponse.getNextPageToken()
          };
        }
        return processLogsResponse;
      });
  }

  /**
   * Request Print Formats List
   * @param {string} tableName
   * @param {string} reportViewUuid
   * @param {string} processUuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListPrintFormats({ tableName, reportViewUuid, processUuid, pageToken, pageSize, isConvert = true }) {
    const { ListPrintFormatsRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListPrintFormatsRequest();

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setReportviewuuid(reportViewUuid);
    requestInstance.setProcessuuid(processUuid);
    requestInstance.setPageToken(pageToken);
    requestInstance.setPageSize(pageSize);

    return this.getUserInterfaceService().listPrintFormats(requestInstance)
      .then(printFormatResponse => {
        if (isConvert) {
          const { convertPrintFromatFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: printFormatResponse.getRecordcount(),
            printFormatsList: printFormatResponse.getPrintformatsList().map(printFormatItem => {
              return convertPrintFromatFromGRPC(printFormatItem);
            }),
            nextPageToken: printFormatResponse.getNextPageToken()
          };
        }
        return printFormatResponse;
      });
  }

  /**
   * Request Report Views List
   * @param {string}  tableName
   * @param {string}  processUuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert, default value is true
   */
  requestListReportViews({ tableName, processUuid, pageToken, pageSize, isConvert = true }) {
    const { ListReportViewsRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListReportViewsRequest();
    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setProcessuuid(processUuid);
    requestInstance.setPageToken(pageToken);
    requestInstance.setPageSize(pageSize);

    return this.getUserInterfaceService().listReportViews(requestInstance)
      .then(reportViewsResponse => {
        if (isConvert) {
          const { convertReportViewFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: reportViewsResponse.getRecordcount(),
            reportViewsList: reportViewsResponse.getReportviewsList().map(reportViewItem => {
              return convertReportViewFromGRPC(reportViewItem);
            }),
            nextPageToken: reportViewsResponse.getNextPageToken()
          };
        }
        return reportViewsResponse;
      });
  }

  /**
   * Request Favorites List
   * @param {string} tableName
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListDrillTables({ tableName, pageToken, pageSize, isConvert = true }) {
    const { ListDrillTablesRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListDrillTablesRequest();

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setPageToken(pageToken);
    requestInstance.setPageSize(pageSize);

    return this.getUserInterfaceService().listDrillTables(requestInstance)
      .then(drillTableResponse => {
        if (isConvert) {
          const { convertDrillTableFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: drillTableResponse.getRecordcount(),
            drillTablesList: drillTableResponse.getDrilltablesList().map(itemDrillTable => {
              return convertDrillTableFromGRPC(itemDrillTable);
            }),
            nextPageToken: drillTableResponse.getNextPageToken()
          };
        }
        return drillTableResponse;
      });
  }

  /**
   * Request Dashboards List
   * @param {string}  roleUuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListDashboards({ roleUuid, pageToken, pageSize }) {
    const { ListDashboardsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListDashboardsRequest();
    request.setClientrequest(this.getClientRequest());
    request.setRoleuuid(roleUuid);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getDashboardingService().listDashboards(request)
      .then(dashboardResponse => {
        const { convertDashboardFromGRPC } = require('./src/convertUtils.js');

        return {
          recordCount: dashboardResponse.getRecordcount(),
          dashboardsList: dashboardResponse.getDashboardsList().map(dashboardItem => {
            return convertDashboardFromGRPC(dashboardItem);
          }),
          nextPageToken: dashboardResponse.getNextPageToken()
        };
      });
  }

  /**
   * Request Recent Items Activity List
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListRecentItems({ pageToken, pageSize, isConvert = true }) {
    const { ListRecentItemsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListRecentItemsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getEntityLogService().listRecentItems(request)
      .then(recentItemsResponse => {
        if (isConvert) {
          const { convertRecentItemFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: recentItemsResponse.getRecordcount(),
            recentItemsList: recentItemsResponse.getRecentitemsList().map(recentItem => {
              return convertRecentItemFromGRPC(recentItem);
            }),
            nextPageToken: recentItemsResponse.getNextPageToken()
          };
        }
        return recentItemsResponse;
      });
  }

  /**
   * Request Pending Documents List
   * @param {string} userUuid
   * @param {string} roleUuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListPendingDocuments({ userUuid, roleUuid, pageToken, pageSize, isConvert = true }) {
    const { ListPendingDocumentsRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListPendingDocumentsRequest();

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setUseruuid(userUuid);
    requestInstance.setRoleuuid(roleUuid);
    requestInstance.setPageToken(pageToken);
    requestInstance.setPageSize(pageSize);

    return this.getDashboardingService().listPendingDocuments(requestInstance)
      .then(pendingDocumentsResponse => {
        if (isConvert) {
          const { convertPendingDocumentFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: pendingDocumentsResponse.getRecordcount(),
            pendingDocumentsList: pendingDocumentsResponse.getPendingdocumentsList().map(documentItem => {
              return convertPendingDocumentFromGRPC(documentItem);
            }),
            nextPageToken: pendingDocumentsResponse.getNextPageToken()
          };
        }
        return pendingDocumentsResponse;
      });
  }

  /**
   * Request Favorites List
   * @param {string}  userUuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListFavorites({ userUuid, pageToken, pageSize, isConvert = true }) {
    const { ListFavoritesRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListFavoritesRequest();

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setUseruuid(userUuid);
    requestInstance.setPageToken(pageToken);
    requestInstance.setPageSize(pageSize);

    return this.getDashboardingService().listFavorites(requestInstance)
      .then(favoritesResponse => {
        if (isConvert) {
          const { convertFavoriteFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: favoritesResponse.getRecordcount(),
            favoritesList: favoritesResponse.getFavoritesList().map(favoriteItem => {
              return convertFavoriteFromGRPC(favoriteItem);
            }),
            nextPageToken: favoritesResponse.getNextPageToken()
          };
        }
        return favoritesResponse;
      });
  }

  /**
   * Get languages flagged as System Language or Base Language
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListLanguages({ pageToken, pageSize, isConvert = true }) {
    const { ListLanguagesRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListLanguagesRequest();

    request.setClientrequest(this.getClientRequest());
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listLanguages(request)
      .then(languageResponse => {
        if (isConvert) {
          const { convertLanguageFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: languageResponse.getRecordcount(),
            languagesList: languageResponse.getLanguagesList().map(languageItem => {
              return convertLanguageFromGRPC(languageItem);
            }),
            nextPageToken: languageResponse.getNextPageToken()
          };
        }
        return languageResponse;
      });
  }

  /**
   * Get languages flagged as System Language or Base Language
   * @param {string}  tableName
   * @param {string}  recordUuid
   * @param {number}  recordId
   * @param {string}  language
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListTranslations({
    tableName,
    recordUuid,
    recordId,
    language,
    pageToken,
    pageSize,
    isConvert = true
  }) {
    const { ListTranslationsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListTranslationsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);
    //  Set values
    request.setTablename(tableName);
    request.setRecorduuid(recordUuid);
    request.setRecordid(recordId);
    request.setLanguage(language);

    return this.getUserInterfaceService().listTranslations(request)
      .then(translationResponse => {
        if (isConvert) {
          const { convertTranslationFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: translationResponse.getRecordcount(),
            translationsList: translationResponse.getTranslationsList().map(translationItem => {
              return convertTranslationFromGRPC(translationItem);
            }),
            nextPageToken: translationResponse.getNextPageToken()
          };
        }
        return translationResponse;
      });
  }

  /**
   * Run callout request
   * @param {string}  windowUuid
   * @param {string}  tabUuid
   * @param {string}  tableName
   * @param {string}  columnName
   * @param {mixed}   value
   * @param {string}  callout
   * @param {array}   attributesList
   * @returns {Entity}
   */
  requestRunCallout({ windowUuid, windowNo, tabUuid, tableName, columnName, value, oldValue, valueType, callout, attributesList = [], isConvert = true }) {
    const { RunCalloutRequest } = require('./src/grpc/proto/business_pb.js');
    const { convertValueToGRPC } = require('./src/convertUtils.js');

    const calloutRequestInstance = new RunCalloutRequest();
    calloutRequestInstance.setClientrequest(this.getClientRequest());
    calloutRequestInstance.setWindowuuid(windowUuid);
    calloutRequestInstance.setWindowno(windowNo);
    calloutRequestInstance.setTabuuid(tabUuid);
    calloutRequestInstance.setTablename(tableName);
    calloutRequestInstance.setColumnname(columnName);
    calloutRequestInstance.setValue(
      convertValueToGRPC({
        value,
        valueType
      })
    );
    calloutRequestInstance.setOldvalue(
      convertValueToGRPC({
        value: oldValue,
        valueType
      })
    );
    calloutRequestInstance.setCallout(callout);

    if (attributesList.length) {
      const { convertParameterToGRPC } = require('./src/convertUtils.js');

      attributesList.forEach(attribute => {
        const convertedAttribute = convertParameterToGRPC(attribute);
        calloutRequestInstance.addAttributes(convertedAttribute);
      });
    }

    return this.getUserInterfaceService().runCallout(calloutRequestInstance)
      .then(calloutResponse => {
        if (isConvert) {
          const { convertValuesMapFromGRPC } = require('./src/convertUtils.js');

          return {
            result: calloutResponse.getResult(),
            values: convertValuesMapFromGRPC({
              mapToConvert: calloutResponse.getValuesMap(),
              returnType: 'object'
            })
          };
        }
        return calloutResponse;
      });
  }

  /**
   * Request Records Logs List
   * @param {string}  tableName
   * @param {number}  recordId
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListRecordsLogs({ tableName, recordId, pageToken, pageSize, isConvert = true }) {
    const { ListRecordLogsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListRecordLogsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    //  return
    return this.getEntityLogService().listRecordLogs(request)
      .then(recordLogsResponse => {
        if (isConvert) {
          const { convertRecordLogFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: recordLogsResponse.getRecordcount(),
            recordLogsList: recordLogsResponse.getRecordlogsList().map(recordItem => {
              return convertRecordLogFromGRPC(recordItem);
            }),
            nextPageToken: recordLogsResponse.getNextPageToken()
          };
        }
        return recordLogsResponse;
      });
  }

  /**
   * Request Record Chats
   * @param {string}  tableName
   * @param {number}  recordId
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListRecordChats({ tableName, recordId, pageToken, pageSize, isConvert = true }) {
    const { ListRecordChatsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListRecordChatsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    //  return
    return this.getEntityLogService().listRecordChats(request)
      .then(recordChatResponse => {
        if (isConvert) {
          const { convertRecordChatsFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: recordChatResponse.getRecordcount(),
            recordChatsList: recordChatResponse.getRecordchatsList().map(recordChatsItem => {
              return convertRecordChatsFromGRPC(recordChatsItem);
            }),
            nextPageToken: recordChatResponse.getNextPageToken()
          };
        }
        return recordChatResponse;
      });
  }

  /**
   * Request Chats Entries
   * @param {string}  uuid
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListChatEntries({ uuid, pageToken, pageSize, isConvert = true }) {
    const { ListChatEntriesRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListChatEntriesRequest();

    request.setClientrequest(this.getClientRequest());
    request.setChatuuid(uuid);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    //  return
    return this.getEntityLogService().listChatEntries(request)
      .then(chatEntriesResponse => {
        if (isConvert) {
          const { convertChatEntryFromGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: chatEntriesResponse.getRecordcount(),
            chatEntriesList: chatEntriesResponse.getChatentriesList().map(chatEntryItem => {
              return convertChatEntryFromGRPC(chatEntryItem);
            }),
            nextPageToken: chatEntriesResponse.getNextPageToken()
          };
        }
        return chatEntriesResponse;
      });
  }

  /**
   * Request Chats Entries
   * @param {string}  tableName
   * @param {number}  recordId
   * @param {string}  comment
   * @param {boolean} isConvert
   */
  requestCreateChatEntry({ tableName, recordId, comment, isConvert = true }) {
    const { CreateChatEntryRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new CreateChatEntryRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setComment(comment);

    //  return
    return this.getUserInterfaceService().createChatEntry(request)
      .then(chatEntryResponse => {
        if (isConvert) {
          const { convertChatEntryFromGRPC } = require('./src/convertUtils.js');
          return convertChatEntryFromGRPC(chatEntryResponse);
        }
        return chatEntryResponse;
      });
  }

  /**
   * Request Workflows Logs List
   * @param {string}  tableName
   * @param {number}  recordId
   * @param {string}  pageToken
   * @param {string}  pageSize
   * @param {boolean} isConvert
   */
  requestListWorkflowsLogs({ tableName, recordId, pageToken, pageSize, isConvert = true }) {
    const { ListWorkflowLogsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListWorkflowLogsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setRecordid(recordId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    //  return
    return this.getEntityLogService().listWorkflowLogs(request)
      .then(workflowLogsResponse => {
        if (isConvert) {
          const { convertWorkflowProcessFomGRPC } = require('./src/convertUtils.js');

          return {
            recordCount: workflowLogsResponse.getRecordcount(),
            workflowLogsList: workflowLogsResponse.getWorkflowlogsList().map(workflowItem => {
              return convertWorkflowProcessFomGRPC(workflowItem);
            }),
            nextPageToken: workflowLogsResponse.getNextPageToken()
          };
        }
        return workflowLogsResponse;
      });
  }

  requestListWorkflows({ tableName, pageToken, pageSize, isConvert = true }) {
    const { ListWorkflowsRequest } = require('./src/grpc/proto/business_pb.js');
    const request = new ListWorkflowsRequest();

    request.setClientrequest(this.getClientRequest());
    request.setTablename(tableName);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getWorkflowService().listWorkflows(request)
      .then(workflowResponse => {
        if (isConvert) {
          const { convertWorkflowDefinitionFromGRPC } = require('./src/convertUtils.js');
          return {
            recordCount: workflowResponse.getRecordcount(),
            workflowsList: workflowResponse.getWorkflowsList().map(workflowItem => {
              return convertWorkflowDefinitionFromGRPC(workflowItem);
            }),
            nextPageToken: workflowResponse.getNextPageToken()
          };
        }
        return workflowResponse;
      });
  }

  /**
   * Get all operator or get key value type from value
   * @param {number} keyToFind
   */
  getConditionOperators(keyToFind) {
    const { getConditionOperators } = require('./src/convertUtils.js');
    return getConditionOperators(keyToFind);
  }

  /**
   * Request Document Actions List
   * @param {string} tableName
   * @param {number} recordId
   * @param {string} recordUuid
   * @param {string} documentStatus
   * @param {string} documentAction
   * @param {number} pageSize
   * @param {string} pageToken
   */
  requestListDocumentActions({ tableName, recordId, recordUuid, documentStatus, documentAction, pageSize, pageToken, isConvert = true }) {
    const { ListDocumentActionsRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListDocumentActionsRequest;

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setRecordid(recordId);
    requestInstance.setRecorduuid(recordUuid);
    requestInstance.setDocumentstatus(documentStatus);
    requestInstance.setDocumentaction(documentAction);
    requestInstance.setPageSize(pageSize);
    requestInstance.setPageToken(pageToken);
    return this.getWorkflowService().listDocumentActions(requestInstance)
      .then(listDocumentActionsResponse => {
        if (isConvert) {
          const { convertDocumentAction } = require('./src/convertUtils.js');

          return {
            recordCount: listDocumentActionsResponse.getRecordcount(),
            documentActionsList: listDocumentActionsResponse.getDocumentactionsList()
              .map(documentActionItem => {
                return convertDocumentAction(documentActionItem);
              }),
            defaultDocumentAction: convertDocumentAction(
              listDocumentActionsResponse.getDefaultdocumentaction()
            ),
            nextPageToken: listDocumentActionsResponse.getNextPageToken()
          };
        }
        return listDocumentActionsResponse;
      })
  }

  /**
   * Request Document Actions List
   * @param {string} tableName
   * @param {number} recordId
   * @param {string} recordUuid
   * @param {string} documentStatus
   * @param {string} documentAction
   * @param {number} pageSize
   * @param {string} pageToken
   */
  requestListDocumentStatuses({ tableName, recordId, recordUuid, documentStatus, pageSize, pageToken, isConvert = true }) {
    const { ListDocumentStatusesRequest } = require('./src/grpc/proto/business_pb.js');
    const requestInstance = new ListDocumentStatusesRequest;

    requestInstance.setClientrequest(this.getClientRequest());
    requestInstance.setTablename(tableName);
    requestInstance.setRecordid(recordId);
    requestInstance.setRecorduuid(recordUuid);
    requestInstance.setDocumentstatus(documentStatus);
    requestInstance.setPageSize(pageSize);
    requestInstance.setPageToken(pageToken);
    return this.getWorkflowService().listDocumentStatuses(requestInstance)
      .then(listDocumentStatusesResponse => {
        if (isConvert) {
          const { convertDocumentStatus } = require('./src/convertUtils.js');

          return {
            recordCount: listDocumentStatusesResponse.getRecordcount(),
            documentStatusesList: listDocumentStatusesResponse.getDocumentstatusesList()
              .map(documentStatus => {
                return convertDocumentStatus(documentStatus);
              }),
            nextPageToken: listDocumentStatusesResponse.getNextPageToken()
          };
        }
        return listDocumentStatusesResponse;
      })
  }

}

module.exports = BusinessData;

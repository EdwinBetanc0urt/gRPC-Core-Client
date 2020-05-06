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
class SystemCore {

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
}

module.exports = SystemCore;

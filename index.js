/*************************************************************************************
 * Product: ADempiere gRPC Core Client                                               *
 * Copyright (C) 2012-2018 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Yamel Senih ysenih@erpya.com                                      *
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
   * Get type of value
   * @param {mixed} value
   * @returns {string} Undefined, Boolean, String, Function...
   */
  static typeOfValue(value) {
    const { typeOfValue } = require('./src/convertValues.js');
    return typeOfValue(value);
  }

  /**
   * Checks if value is empty. Deep-checks arrays and objects
   * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
   * @param   {boolean|array|object|number|string|date|map|set|function} value
   * @returns {boolean}
   */
  static isEmptyValue(value) {
    const { isEmptyValue } = require('./src/convertValues.js');
    return isEmptyValue(value);
  }

  /**
   * Get Country Information
   * @param {string} countryUuid, Universally Unique IDentifier from country
   * @param {number} countryId, IDentifier from country
   * @return {object}
   */
  requestGetCountry({ countryUuid, countryId }) {
    const { GetCountryRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const request = new GetCountryRequest();

    request.setClientrequest(this.getClientRequest());
    request.setCountryid(countryId);
    request.setCountryuuid(countryUuid);
    //
    return this.getCoreFunctionalityService().getCountry(request)
      .then(countryResponse => {
        const { convertCountryFromGRPC } = require('./src/convertCoreFunctionality.js');

        return convertCountryFromGRPC(countryResponse);
      });
  }

  /**
   * Request Organization list
   * @param {string} roleUuid
   * @param {number} roleId
   * @param {string} pageToken
   * @param {number} pageSize
   */
  requestListOrganizations({ roleUuid, roleId, pageToken, pageSize }) {
    const { ListOrganizationsRequest } = require('./src/grpc/proto/core_functionality_pb.js');

    const request = new ListOrganizationsRequest();
    request.setClientrequest(this.getClientRequest());
    request.setRoleuuid(roleUuid);
    request.setRoleid(roleId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listOrganizations(request)
      .then(organizationsListResponse => {
        const { convertOrganizationFromGRPC } = require('./src/convertCoreFunctionality.js');

        const organizationsList = organizationsListResponse.getOrganizationsList()
          .map(organization => {
            return convertOrganizationFromGRPC(organization);
          });

        return {
          recordCount: organizationsListResponse.getRecordcount(),
          organizationsList,
          nextPageToken: organizationsListResponse.getNextPageToken(),
        };
      });
  }

  /**
   * Request Warehouse list
   * @param {string} organizationUuid
   * @param {number} organizationId
   * @param {string} pageToken
   * @param {number} pageSize
   */
  requestListWarehouses({ organizationUuid, organizationId, pageToken, pageSize }) {
    const { ListWarehousesRequest } = require('./src/grpc/proto/core_functionality_pb.js');

    const request = new ListWarehousesRequest();
    request.setClientrequest(this.getClientRequest());
    request.setOrganizationuuid(organizationUuid);
    request.setOrganizationid(organizationId);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listWarehouses(request)
      .then(warehousesListResponse => {
        const { convertWarehouseFromGRPC } = require('./src/convertCoreFunctionality.js');

        const warehousesList = warehousesListResponse.getWarehousesList()
          .map(warehouse => {
            return convertWarehouseFromGRPC(warehouse);
          });

        return {
          recordCount: warehousesListResponse.getRecordcount(),
          warehousesList,
          nextPageToken: warehousesListResponse.getNextPageToken(),
        };
      });
  }

  /**
   * Get languages flagged as System Language or Base Language
   * @param {string}  pageToken
   * @param {string}  pageSize
   */
  requestListLanguages({ pageToken, pageSize }) {
    const { ListLanguagesRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const request = new ListLanguagesRequest();

    request.setClientrequest(this.getClientRequest());
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listLanguages(request)
      .then(languageResponse => {
        const { convertLanguageFromGRPC } = require('./src/convertCoreFunctionality.js');

        const languagesList = languageResponse.getLanguagesList()
          .map(languageItem => {
            return convertLanguageFromGRPC(languageItem);
          });

        return {
          recordCount: languageResponse.getRecordcount(),
          languagesList,
          nextPageToken: languageResponse.getNextPageToken()
        };
      });
  }

  requestCreateBusinessPartner({
    value,
    taxId,
    duns,
    naics,
    name,
    lastName,
    description,
    contactName,
    eMail,
    phone,
    businessPartnerGroupUuid,
    // Location
    address1,
    address2,
    address3,
    address4,
    cityUuid,
    cityName,
    postalCode,
    regionUuid,
    regionName,
    countryUuid,
    posUuid
  }) {
    const { CreateBusinessPartnerRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const request = new CreateBusinessPartnerRequest();

    request.setClientrequest(this.getClientRequest());
    request.setValue(value);
    request.setTaxid(taxId);
    request.setDuns(duns);
    request.setNaics(naics);
    request.setName(name);
    request.setLastname(lastName);
    request.setDescription(description);
    request.setContactname(contactName);
    request.setEmail(eMail);
    request.setPhone(phone);
    request.setBusinesspartnergroupuuid(businessPartnerGroupUuid);

    // Location values
    request.setAddress1(address1);
    request.setAddress2(address2);
    request.setAddress3(address3);
    request.setAddress4(address4);
    request.setCityuuid(cityUuid);
    request.setCityname(cityName);
    request.setPostalcode(postalCode);
    request.setRegionuuid(regionUuid);
    request.setRegionname(regionName);
    request.setCountryuuid(countryUuid);
    request.setPosuuid(posUuid);

    return this.getCoreFunctionalityService().createBusinessPartner(request)
      .then(responseCreateBusinessPartner => {
        const { convertBusinessPartnerFromGRPC } = require('./src/convertCoreFunctionality.js');

        return convertBusinessPartnerFromGRPC(responseCreateBusinessPartner);
      });
  }

  requestGetBusinessPartner(parametersToSearch) {
    const { GetBusinessPartnerRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    let request = new GetBusinessPartnerRequest();

    request = this.setSearchBusinessPartner(parametersToSearch, request);

    return this.getCoreFunctionalityService().getBusinessPartner(request)
      .then(responseBusinessPartner => {
        const { convertBusinessPartnerFromGRPC } = require('./src/convertCoreFunctionality.js');

        return convertBusinessPartnerFromGRPC(responseBusinessPartner);
      });
  }

  setSearchBusinessPartner({
    searchValue,
    value,
    name,
    contactName,
    eMail,
    postalCode,
    phone,
    criteria
  }, request
  ) {
    request.setClientrequest(this.getClientRequest());
    request.setSearchvalue(searchValue);
    request.setValue(value);
    request.setName(name);
    request.setContactname(contactName);
    request.setEmail(eMail);
    request.setPostalcode(postalCode);
    request.setPhone(phone);

    if (!SystemCore.isEmptyValue(criteria)) {
      const { convertCriteriaToGRPC } = require('./src/convertValues.js');
      const criteriaGRPC = convertCriteriaToGRPC(criteria);

      request.setCriteria(criteriaGRPC);
    }

    return request;
  }

  requestListBusinessPartner(parametersToSearch) {
    const { ListBusinessPartnerRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    let request = new ListBusinessPartnerRequest();
    const { pageSize, pageToken } = parametersToSearch;

    request = this.setSearchBusinessPartner(parametersToSearch, request);
    request.setPageToken(pageToken);
    request.setPageSize(pageSize);

    return this.getCoreFunctionalityService().listBusinessPartner(request)
      .then(responseListBusinessPartner => {
        const { convertBusinessPartnerFromGRPC } = require('./src/convertCoreFunctionality.js');

        const businessPartnersList = responseListBusinessPartner.getBusinesspartnersList()
          .map(businessPartner => {
            return convertBusinessPartnerFromGRPC(businessPartner);
          });

        return {
          recordCount: responseListBusinessPartner.getRecordcount(),
          businessPartnersList,
          nextPageToken: responseListBusinessPartner.getNextPageToken()
        };
      });
  }

  /**
   * @param {string} conversionTypeUuid
   * @param {string} currencyFromUuid
   * @param {string} currencyToUuid
   * @param {date}   conversionDate
   * @returns {promise}
   */
  requestGetConversionRate({
    conversionTypeUuid,
    currencyFromUuid,
    currencyToUuid,
    conversionDate
  }) {
    const { GetConversionRateRequest } = require('./src/grpc/proto/core_functionality_pb.js');
    const request = new GetConversionRateRequest();

    request.setClientrequest(this.getClientRequest());
    request.setConversiontypeuuid(conversionTypeUuid);
    request.setCurrencyfromuuid(currencyFromUuid);
    request.setCurrencytouuid(currencyToUuid);

    if (SystemCore.typeOfValue(conversionDate) === 'Date') {
      conversionDate = conversionDate.getTime();
    }
    request.setConversiondate(conversionDate);

    return this.getCoreFunctionalityService().getConversionRate(request)
      .then(responseConversionRate => {
        const { convertConversionRateFromGRPC } = require('./src/convertCoreFunctionality.js');

        return convertConversionRateFromGRPC(responseConversionRate);
      })
  }

}

module.exports = SystemCore;

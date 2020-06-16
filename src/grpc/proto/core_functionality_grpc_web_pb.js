/**
 * @fileoverview gRPC-Web generated client stub for data
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var proto_base_data_type_pb = require('../proto/base_data_type_pb.js')
const proto = {};
proto.data = require('./core_functionality_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.data.CoreFunctionalityClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.data.CoreFunctionalityPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.GetCountryRequest,
 *   !proto.data.Country>}
 */
const methodDescriptor_CoreFunctionality_GetCountry = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/GetCountry',
  grpc.web.MethodType.UNARY,
  proto.data.GetCountryRequest,
  proto.data.Country,
  /**
   * @param {!proto.data.GetCountryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.Country.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.GetCountryRequest,
 *   !proto.data.Country>}
 */
const methodInfo_CoreFunctionality_GetCountry = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.Country,
  /**
   * @param {!proto.data.GetCountryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.Country.deserializeBinary
);


/**
 * @param {!proto.data.GetCountryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.Country)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.Country>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.getCountry =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/GetCountry',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_GetCountry,
      callback);
};


/**
 * @param {!proto.data.GetCountryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.Country>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.getCountry =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/GetCountry',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_GetCountry);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.ListOrganizationsRequest,
 *   !proto.data.ListOrganizationsResponse>}
 */
const methodDescriptor_CoreFunctionality_ListOrganizations = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/ListOrganizations',
  grpc.web.MethodType.UNARY,
  proto.data.ListOrganizationsRequest,
  proto.data.ListOrganizationsResponse,
  /**
   * @param {!proto.data.ListOrganizationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListOrganizationsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListOrganizationsRequest,
 *   !proto.data.ListOrganizationsResponse>}
 */
const methodInfo_CoreFunctionality_ListOrganizations = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListOrganizationsResponse,
  /**
   * @param {!proto.data.ListOrganizationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListOrganizationsResponse.deserializeBinary
);


/**
 * @param {!proto.data.ListOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.ListOrganizationsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.ListOrganizationsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.listOrganizations =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/ListOrganizations',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListOrganizations,
      callback);
};


/**
 * @param {!proto.data.ListOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.ListOrganizationsResponse>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.listOrganizations =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/ListOrganizations',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListOrganizations);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.ListWarehousesRequest,
 *   !proto.data.ListWarehousesResponse>}
 */
const methodDescriptor_CoreFunctionality_ListWarehouses = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/ListWarehouses',
  grpc.web.MethodType.UNARY,
  proto.data.ListWarehousesRequest,
  proto.data.ListWarehousesResponse,
  /**
   * @param {!proto.data.ListWarehousesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListWarehousesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListWarehousesRequest,
 *   !proto.data.ListWarehousesResponse>}
 */
const methodInfo_CoreFunctionality_ListWarehouses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListWarehousesResponse,
  /**
   * @param {!proto.data.ListWarehousesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListWarehousesResponse.deserializeBinary
);


/**
 * @param {!proto.data.ListWarehousesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.ListWarehousesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.ListWarehousesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.listWarehouses =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/ListWarehouses',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListWarehouses,
      callback);
};


/**
 * @param {!proto.data.ListWarehousesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.ListWarehousesResponse>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.listWarehouses =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/ListWarehouses',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListWarehouses);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.ListLanguagesRequest,
 *   !proto.data.ListLanguagesResponse>}
 */
const methodDescriptor_CoreFunctionality_ListLanguages = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/ListLanguages',
  grpc.web.MethodType.UNARY,
  proto.data.ListLanguagesRequest,
  proto.data.ListLanguagesResponse,
  /**
   * @param {!proto.data.ListLanguagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListLanguagesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListLanguagesRequest,
 *   !proto.data.ListLanguagesResponse>}
 */
const methodInfo_CoreFunctionality_ListLanguages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListLanguagesResponse,
  /**
   * @param {!proto.data.ListLanguagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListLanguagesResponse.deserializeBinary
);


/**
 * @param {!proto.data.ListLanguagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.ListLanguagesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.ListLanguagesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.listLanguages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/ListLanguages',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListLanguages,
      callback);
};


/**
 * @param {!proto.data.ListLanguagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.ListLanguagesResponse>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.listLanguages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/ListLanguages',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListLanguages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.GetBusinessPartnerRequest,
 *   !proto.data.BusinessPartner>}
 */
const methodDescriptor_CoreFunctionality_GetBusinessPartner = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/GetBusinessPartner',
  grpc.web.MethodType.UNARY,
  proto.data.GetBusinessPartnerRequest,
  proto.data.BusinessPartner,
  /**
   * @param {!proto.data.GetBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.BusinessPartner.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.GetBusinessPartnerRequest,
 *   !proto.data.BusinessPartner>}
 */
const methodInfo_CoreFunctionality_GetBusinessPartner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.BusinessPartner,
  /**
   * @param {!proto.data.GetBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.BusinessPartner.deserializeBinary
);


/**
 * @param {!proto.data.GetBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.BusinessPartner)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.BusinessPartner>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.getBusinessPartner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/GetBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_GetBusinessPartner,
      callback);
};


/**
 * @param {!proto.data.GetBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.BusinessPartner>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.getBusinessPartner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/GetBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_GetBusinessPartner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.CreateBusinessPartnerRequest,
 *   !proto.data.BusinessPartner>}
 */
const methodDescriptor_CoreFunctionality_CreateBusinessPartner = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/CreateBusinessPartner',
  grpc.web.MethodType.UNARY,
  proto.data.CreateBusinessPartnerRequest,
  proto.data.BusinessPartner,
  /**
   * @param {!proto.data.CreateBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.BusinessPartner.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.CreateBusinessPartnerRequest,
 *   !proto.data.BusinessPartner>}
 */
const methodInfo_CoreFunctionality_CreateBusinessPartner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.BusinessPartner,
  /**
   * @param {!proto.data.CreateBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.BusinessPartner.deserializeBinary
);


/**
 * @param {!proto.data.CreateBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.BusinessPartner)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.BusinessPartner>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.createBusinessPartner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/CreateBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_CreateBusinessPartner,
      callback);
};


/**
 * @param {!proto.data.CreateBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.BusinessPartner>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.createBusinessPartner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/CreateBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_CreateBusinessPartner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.data.ListBusinessPartnerRequest,
 *   !proto.data.ListBusinessPartnerResponse>}
 */
const methodDescriptor_CoreFunctionality_ListBusinessPartner = new grpc.web.MethodDescriptor(
  '/data.CoreFunctionality/ListBusinessPartner',
  grpc.web.MethodType.UNARY,
  proto.data.ListBusinessPartnerRequest,
  proto.data.ListBusinessPartnerResponse,
  /**
   * @param {!proto.data.ListBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListBusinessPartnerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListBusinessPartnerRequest,
 *   !proto.data.ListBusinessPartnerResponse>}
 */
const methodInfo_CoreFunctionality_ListBusinessPartner = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListBusinessPartnerResponse,
  /**
   * @param {!proto.data.ListBusinessPartnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.data.ListBusinessPartnerResponse.deserializeBinary
);


/**
 * @param {!proto.data.ListBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.data.ListBusinessPartnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.data.ListBusinessPartnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.data.CoreFunctionalityClient.prototype.listBusinessPartner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/data.CoreFunctionality/ListBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListBusinessPartner,
      callback);
};


/**
 * @param {!proto.data.ListBusinessPartnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.data.ListBusinessPartnerResponse>}
 *     A native promise that resolves to the response
 */
proto.data.CoreFunctionalityPromiseClient.prototype.listBusinessPartner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/data.CoreFunctionality/ListBusinessPartner',
      request,
      metadata || {},
      methodDescriptor_CoreFunctionality_ListBusinessPartner);
};


module.exports = proto.data;


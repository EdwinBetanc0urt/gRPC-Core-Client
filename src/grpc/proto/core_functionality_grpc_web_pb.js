/**
 * @fileoverview gRPC-Web generated client stub for data
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



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

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
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

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.GetCountryRequest,
 *   !proto.data.Country>}
 */
const methodInfo_CoreFunctionality_GetCountry = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.Country,
  /** @param {!proto.data.GetCountryRequest} request */
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
      methodInfo_CoreFunctionality_GetCountry,
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
      methodInfo_CoreFunctionality_GetCountry);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListOrganizationsRequest,
 *   !proto.data.ListOrganizationsResponse>}
 */
const methodInfo_CoreFunctionality_ListOrganizations = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListOrganizationsResponse,
  /** @param {!proto.data.ListOrganizationsRequest} request */
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
      methodInfo_CoreFunctionality_ListOrganizations,
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
      methodInfo_CoreFunctionality_ListOrganizations);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListWarehousesRequest,
 *   !proto.data.ListWarehousesResponse>}
 */
const methodInfo_CoreFunctionality_ListWarehouses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListWarehousesResponse,
  /** @param {!proto.data.ListWarehousesRequest} request */
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
      methodInfo_CoreFunctionality_ListWarehouses,
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
      methodInfo_CoreFunctionality_ListWarehouses);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.data.ListLanguagesRequest,
 *   !proto.data.ListLanguagesResponse>}
 */
const methodInfo_CoreFunctionality_ListLanguages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.data.ListLanguagesResponse,
  /** @param {!proto.data.ListLanguagesRequest} request */
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
      methodInfo_CoreFunctionality_ListLanguages,
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
      methodInfo_CoreFunctionality_ListLanguages);
};


module.exports = proto.data;


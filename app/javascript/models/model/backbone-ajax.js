import axios from 'axios';

var backboneSync = function(method, model, options) {
  console.log(method, model, options)
   var methodMap = {
    create: 'POST',
    update: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
    read: 'GET'
  };
  var type = methodMap[method],
      token = document.head.querySelector('meta[name="csrf-token"]').content;


  // Default options, unless specified.
  _.defaults(options || (options = {}), {
    emulateHTTP: false,
    emulateJSON: false
  });
  console.log(model.constructor.toString())

  // Default JSON-request options.
  var args = {method: type, responseType: 'json'};

  // Ensure that we have a URL.
  if (!options.url) {
    args.url = _.result(model, 'url') || urlError();
  }

  // Ensure that we have the appropriate request data.
  if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
    args.contentType = 'application/json';
    // console.log(model.__proto__.constructor.class_name)
    console.log(model.__proto__.class)
    args.data = {};
    args.data['authenticity_token'] = token;
    args.data[model.__proto__.class] = model.toJSON(options);
    // args.params = JSON.stringify(args.params);
  }

  // Don't process data on a non-GET request.
  if (args.type !== 'GET' && !options.emulateJSON) {
    args.processData = false;
  }

  // Pass along `textStatus` and `errorThrown` from jQuery.
  var error = options.error;
  options.error = function(xhr, textStatus, errorThrown) {
    options.textStatus = textStatus;
    options.errorThrown = errorThrown;
    if (error) error.call(options.context, xhr, textStatus, errorThrown);
  };
  // Make the request, allowing the user to override any Ajax options.
  var xhr = options.xhr = backboneAjax(_.extend(args, options));
  model.trigger('request', model, xhr, options);
  return xhr;
};
var backboneAjax = function (options) {
  console.log(options)
  var valid_opt = [
    'baseURL', 'contentType', 'data', 'responseType', 'headers', 'method', 'params', 'url'
  ]
  return axios(_.pick(options, valid_opt))
};
export default backboneSync
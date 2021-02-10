import deepHelpers from './deep-helpers.js'
import nested from './nested.js'
import backboneSync from './backbone-ajax.js'

var leapMethods = function () {

  var _ = require('lodash');
  var __ = deepHelpers;//require('./deep-helpers.js');
  // var nested = require('./nested.js');
  console.log(backboneSync)

  var setNested = nested.setNested;
  var getNested = nested.getNested;
  var deleteNested = nested.deleteNested;
  var objToPaths = nested.objToPaths;

  var keyPathSeparator = '.';

  return {

    constructor: function(attributes, options) {
      var defaults;
      var attrs = attributes || {};
      options || (options = {});
      this.cid = _.uniqueId('c');
      this.attributes = {};
      if (options.parse) attrs = this.parse(attrs, options) || {};
      if (options.collection) this.collection = options.collection;
      if ((defaults = _.result(this, 'defaults'))) {
          // <custom code>
          // Replaced the call to _.defaults with __.deepExtend.
          attrs = __.deepExtend({}, defaults, __.deepClean(attrs));
          // </custom code>
      }
      this.set(attrs, options);
      this.changed = {};
      this.initialize.apply(this, arguments);
    },

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return __.deepClone(this.attributes);
    },

    // Override get
    // Supports nested attributes via the syntax 'obj.attr' e.g. 'author.user.name'
    get: function(attr) {
        return __.deepClone(getNested(this.attributes, attr));
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      console.log(this.isNew())
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    sync: function() {
      return backboneSync.apply(this, arguments);
    },

    // Override set
    // Supports nested attributes via the syntax 'obj.attr' e.g. 'author.user.name'
    set: function(key, val, options) {
        var attr, attrs, unset, changes, silent, changing, prev, current;
        if (key == null) return this;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (typeof key === 'object') {
          attrs = key;
          options = val || {};
        } else {
          (attrs = {})[key] = val;
        }

        options || (options = {});

        // Run validation.
        if (!this._validate(attrs, options)) return false;

        // Extract attributes and options.
        unset           = options.unset;
        silent          = options.silent;
        changes         = [];
        changing        = this._changing;
        this._changing  = true;

        if (!changing) {
          // <custom>: Replaced _.clone with __.deepClone
          this._previousAttributes = __.deepClone(this.attributes);
          this.changed = {};
        }
        current = this.attributes, prev = this._previousAttributes;

        // Check for changes of `id`.
        if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

        // <custom code>
        attrs = objToPaths(attrs);
        // </custom code>

        // For each `set` attribute, update or delete the current value.
        for (attr in attrs) { // jshint ignore: line
          val = attrs[attr];

          // <custom code>: Using getNested, setNested and deleteNested
          if (!_.isEqual(getNested(current, attr), val)) changes.push(attr);
          if (!_.isEqual(getNested(prev, attr), val)) {
            setNested(this.changed, attr, val);
          } else {
            deleteNested(this.changed, attr);
          }
          unset ? deleteNested(current, attr) : setNested(current, attr, val);
          // </custom code>
        }

        // Trigger all relevant attribute changes.
        if (!silent) {
          if (changes.length) this._pending = options;

          // <custom code>
          var separator = keyPathSeparator;
          var alreadyTriggered = {}; // * @restorer

          for (var i = 0, l = changes.length; i < l; i++) {
            var key = changes[i]; // jshint ignore: line

            if (!alreadyTriggered.hasOwnProperty(key) || !alreadyTriggered[key]) { // * @restorer
              alreadyTriggered[key] = true; // * @restorer
              this.trigger('change:' + key, this, getNested(current, key), options);
            } // * @restorer

            var fields = key.split(separator);
            // Trigger change events for parent keys with wildcard (*) notation
            for (var n = fields.length - 1; n > 0; n--) {
              var parentKey = _.take(fields, n).join(separator),
                  wildcardKey = parentKey + separator + '*';

              if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) { // * @restorer
                alreadyTriggered[wildcardKey] = true; // * @restorer
                this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
              } // * @restorer

              // + @restorer
              if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
                alreadyTriggered[parentKey] = true;
                this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
              }
              // - @restorer
            }
            // </custom code>
          }
        }

        if (changing) return this;
        if (!silent) {
          while (this._pending) {
            options = this._pending;
            this._pending = false;
            this.trigger('change', this, options);
          }
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      var shallowAttributes = objToPaths(this.attributes);
      for (var key in shallowAttributes) {
        if (shallowAttributes.hasOwnProperty(key)) {
          attrs[key] = void 0;
        }
      }
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return getNested(this.changed, attr, true);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      // <custom code>: objToPaths
      if (!diff) return this.hasChanged() ? objToPaths(this.changed) : false;
      // </custom code>

      var old = this._changing ? this._previousAttributes : this.attributes;

      // <custom code>
      diff = objToPaths(diff);
      old = objToPaths(old);
      // </custom code>

      var val, changed = false;
      for (var attr in diff) {
        if (diff.hasOwnProperty(attr)) {
          if (_.isEqual(old[attr], (val = diff[attr]))) continue;
          (changed || (changed = {}))[attr] = val;
        }
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;

      // <custom code>
      return getNested(this._previousAttributes, attr);
      // </custom code>
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return __.deepClone(this._previousAttributes);
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  };

}();
var wrapError = function(model, options) {
  var error = options.error;
  options.error = function(resp) {
    if (error) error.call(options.context, model, resp, options);
    model.trigger('error', model, resp, options);
  };
};
export default leapMethods

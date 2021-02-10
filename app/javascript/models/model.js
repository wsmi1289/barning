import leapMethods from './model/leap-methods.js'
import Extend from './model/extend.js'
import backboneEvents from './model/backbone-events.js'
// console.log(backboneEvents);
var Model = function () {
  // console.log(window.BackboneEvents);
  // var backboneEvents = require('./model/backbone-events.js');
  // var leapMethods = require('./model/leap-methods.js');
  var extend = Extend;//require('./model/extend.js');
  // console.log(backboneEvents)
  // LeapBase
  // --------
  //
  // LeapBase helps with separating leapMethods into it's own module.
  // We extend Backbone.Model with leapMethods to get LeapModelCompat
  // and extend LeapBase with leapMethods to get LeapModel.

  var LeapBase = function() {};
  LeapBase.extend = Extend;
  // console.log(LeapBase.prototype)
  // LeapModel
  // ---------
  //
  // LeapModel is a Backbone.Model inspired Model with a subset of functionality
  // of the Backbone.Model + support for deeply nested objects.
  //
  // Here we extend the LeapBase (blank extendable object) with the leapMethods
  // and mixin the backbone-events-standalone. We use standalone backbone events
  // implementation to make LeapModel work without needing Backbone and Underscore.
  //
  // The reason leapMethods are in a separate module
  // is so that we could have both a standalone, lightweight, dependency free LeapModel
  // implementation, but we can reuse the leapMethods to add nested object support
  // to the real Backbone.Model in the leap-model/compat.
  var LeapModel = LeapBase.extend(leapMethods);

  // console.log(LeapModel.prototype)

  LeapModel.prototype = backboneEvents.mixin(LeapModel.prototype);
  // backboneEvents.mixin(LeapModel.prototype);
  // console.log(LeapModel.prototype)
  // console.log(LeapModel)
  return LeapModel;

}();
export default Model
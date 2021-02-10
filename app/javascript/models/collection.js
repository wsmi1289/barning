import axios from 'axios';

export default class Collection {
	constructor (attrs={}, options={}) {
		this.attributes = {};
		if(options.parse) { attrs = this.parse(attrs, options) };
		this.initialize.apply(this, arguments);
	}

	parse(resp, options) {
		return this.set(resp.data);
  }

  initialize(){}

  save(key, val, options) {
  	return _.map(this.models, function (model) {
      return model.save()
    })
  }

  get (id) {
    return _.find(this.models, ['id', id]);
  }

  fetch (options) {
  	options = _.extend({parse: true}, options);

  	return axios.get(this.url + '.json')
  }

  add (model) { return this.models.push(model); }

  remove (model) { return _.remove(this.models, model); }

  toJSON() { return _.map(this.models, function(model) { return model.toJSON(); }) }

  url () { return '/'; }
}
import Vue from 'vue/dist/vue.esm'
import axios from 'axios';

export default Vue.component('auto-complete', {
  template: require("html-loader!./../../../views/misc/_auto_complete.html.slim"),

  props: {
    ariaLabelledBy: {
      type: String,
      required: true
    },

    asyncParams: {
      type: Object,
      required: false,
      default: function () { return { resource: null, params: {}, search_term: 'query' } },
    },

    onSelectCallback: {
      type: Function,
      required: false,
      default: function (result) {
        this.search = '';
        this.$emit('selectedOption', result);
      }
    },

    filterable: {
      type: Function,
      required: false,
      default: function (item) { return item; }
    },

    staticItems: {
      type: Array,
      required: false,
      default: function () { return [] }
    }
  },

  mounted: function () {
    if (this.staticItems.length) { this.items = this.staticItems; }
    document.addEventListener('click', this.handleClickOutside)
  },

	data: function () {
    return {
      isOpen: false,
      results: [],
      search: '',
      items: [],
      loading: false,
      arrowCounter: 0,
      activedescendant: ''
    };
  },

  methods: {
    closeResults: function () {
      this.isOpen = false;
      this.arrowCounter = 0;
    },

    filterResults: function () {
      this.results = this.items.filter(function (item) {
        return this.filterable(item).toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      }.bind(this));
      this.isOpen = true;
    },

    getId: function (index) { return `result-item-${index}`; },

    handleClickOutside: function (evt) {
      if (!this.$el.contains(evt.target)) { this.closeResults(); }
    },

    isSelected: function (i) { return i === this.arrowCounter; },

    loadResource: function () {
      this.loading = true;
      this.asyncParams.params[this.asyncParams.search_term] = this.search;
      axios.get(this.asyncParams.resource, this.asyncParams.params).then(function (response) {
        this.items = response.data;
      }.bind(this))
    },

    onArrowDown: function (evt) {
      if (this.isOpen && (this.arrowCounter < this.results.length)) {
        this.arrowCounter = this.arrowCounter + 1;
        this.setActiveDescendent();
      }
    },

    onArrowUp: function () {
      if (this.isOpen && (this.arrowCounter > 0)) {
        this.arrowCounter = this.arrowCounter - 1;
        this.setActiveDescendent();
      }
    },

    onChange: function () {
      (this.asyncParams && !this.items.length) ? this.loadResource() : this.filterResults();
    },

    setActiveDescendent: function () { this.activedescendant = this.getId(this.arrowCounter); },

    setResult: function (result) {
      this.closeResults();
      this.search = this.filterable(result);
      this.onSelectCallback(result);
    }
  },

  watch: {
    items: function (val, oldValue) {
      if (val.length !== oldValue.length) {
        this.loading = false;
        this.filterResults();
      }
    },
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
});

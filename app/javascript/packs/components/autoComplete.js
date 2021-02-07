import Vue from 'vue/dist/vue.esm'

export default Vue.component('auto-complete', {
  template: require("html-loader!./../../../views/misc/_auto_complete.html.slim"),

  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    ariaLabelledBy: {
      type: String,
      required: true
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

	data: function () {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      activedescendant: ''
    };
  },

  methods: {
    onChange() {
      this.$emit('input', this.search);
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
      }
    },

    filterResults() {
      this.results = this.items.filter((item) => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
    },
    onArrowDown(evt) {
      if (this.isOpen) {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1;
          this.setActiveDescendent();
        }
      }
    },
    onArrowUp() {
      if (this.isOpen) {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter -1;
          this.setActiveDescendent();
        }
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    setActiveDescendant() {
      this.activedescendant = this.getId(this.arrowCounter);
    },
    getId(index) {
      return `result-item-${index}`;
    },
    isSelected(i) {
      return i === this.arrowCounter;
    },
  },

  watch: {
    items: function (val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    },
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
});

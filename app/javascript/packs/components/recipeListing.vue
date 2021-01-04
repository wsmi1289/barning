import template from '../../views/recipes/_recipe_listing.html.slim'

export const RecipeListing = {
  name: 'recipe-listing',
  mixins: [template],
  props: [recipes],
  mounted () {}
}

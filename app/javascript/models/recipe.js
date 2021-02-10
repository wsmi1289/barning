import Model from './model.js'
console.log(new Model)
var Recipe = Model.extend({ urlRoot: '/recipes', class: 'recipe' });
export default Recipe;
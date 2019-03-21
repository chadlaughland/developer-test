
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
  el: '#app',
  data: {
  	currentUser: { id: null, name: '', notes: [], },
  	newNote: '',
  	disableAddNote: true,
  },
  watch: {
  	newNote: function(newVal, oldVal){
  		this.disableAddNote = newVal.length > 1 ? false : true;
  	},
  },
  methods: {
    // open the user notes modal, set the currentUser and get the notes
    openModal: function(userName, userId){
    	this.currentUser.name = userName;
    	this.currentUser.id = userId;
    	this.getNotes(userId);
    },
    // get the currentUser's notes
    getNotes: function(userId){
      axios.get('/user_notes', {
        params: {
          user_id: userId
        }
      }).then(function(resp){
        app.currentUser.notes = resp.data.notes;
      }).catch(function(err){
        console.log(err);
        app.currentUser.notes = [];
      });
    },
    //add a user note
    addUserNote: function(note, userId){
    	axios.post('/add_user_note', {
        note: note,
        user_id: userId,
      }).then(function(resp){
        app.newNote = '';
        app.currentUser.notes.splice(0,0,{id: resp.data.note_id, note: note, created_on: resp.data.created_on})
      }).catch(function(err){
        console.log(err);
      });
    },
  },
});

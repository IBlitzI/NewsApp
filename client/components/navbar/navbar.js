import { Template } from 'meteor/templating';
import './navbar.html';
import './navbar.css';

Template.navbar.events({
  'click .nav-item'(event) {
    const tag = event.currentTarget.getAttribute('data-tag');
    Meteor.call('fetchNews', tag, (error, result) => {
      if (error) {
        console.error('Error fetching news:', error);
      } else {
        Session.set('newsData', result);
      }
    });
  }
});
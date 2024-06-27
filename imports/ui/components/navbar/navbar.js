import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './navbar.html';
import './navbar.css';

Template.navbar.events({
  'click .nav-link'(event) {
    event.preventDefault();
    const tag = event.currentTarget.getAttribute('data-tag');
    
    if (tag) {
      Meteor.call('fetchNews', tag, (error, result) => {
        if (error) {
          console.error('Error fetching news:', error);
        } else {
          console.log(result)
          Session.set('newsData', result);
        }
      });
    } else {
      console.error('Tag is null or undefined');
    }
  }
});
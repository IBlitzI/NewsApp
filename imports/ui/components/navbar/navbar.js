import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './navbar.html';
import './navbar.css';

Template.navbar.onCreated(function() {
  Meteor.call('fetchNews', 'general', 0, (error, result) => {
    if (error) {
      console.error('Error fetching news:', error);
    } else {
      Session.set('newsData', result);
    }
  });

  this.autorun(() => {
    const tag = Session.get('currentTag');
    if (tag) {
      Session.set('isNavbarLoading', true);
      Meteor.call('fetchNews', tag, 0, (error, result) => {
        if (error) {
          console.error('Error fetching news:', error);
        } else {
          Session.set('newsData', result);
        }
        Session.set('isNavbarLoading', false);
      });
    }
  });
});

Template.navbar.events({
  'click .nav-link'(event) {
    event.preventDefault();
    const tag = event.currentTarget.getAttribute('data-tag');
    if (tag) {
      Session.set('currentTag', tag);
    } else {
      console.error('Tag is null or undefined');
    }
  }
});

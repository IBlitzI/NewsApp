import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './locationFilter.html';

Template.locationFilter.events({
  'submit #locationForm'(event) {
    event.preventDefault();
    const location = event.target.locationInput.value;

    Meteor.call('getNewsByLocation', location, (error, result) => {
      if (error) {
        console.error('Error fetching location news:', error);
      } else {
        Session.set('newsData', result);
      }
    });
  },
});
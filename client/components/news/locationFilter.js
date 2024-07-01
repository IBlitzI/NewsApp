import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './locationFilter.html';

Template.locationFilter.events({
  'submit #location-form'(event) {
    event.preventDefault(); // Prevent the default form submission behavior// This will pause the execution if the developer tools are open
    console.log('Form submission prevented');
    const location = event.target.locationInput.value.trim();
    console.log('Location entered:', location);

    Meteor.call('getNewsByLocation', location, (error, result) => {
      if (error) {
        console.error('Error:', error);
        alert('Error: ' + error.reason);
      } else {
        console.log('API result:', result);
        Session.set('newsData', result);
      }
    });
  }
});


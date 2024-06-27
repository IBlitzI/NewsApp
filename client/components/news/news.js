import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './news.html';
import './news.css';
import './locationFilter.html';


Template.registerHelper('truncate', function(text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
});

Template.news.helpers({
  newsItems() {
    const newsData = Session.get('newsData');
    console.log('Session newsData:', newsData); 
    return Array.isArray(newsData) ? newsData : []; 
  }
});

Template.locationFilter.events({
  'submit #location-form'(event) {
    event.preventDefault();
    const location = event.target.location.value.trim();
    
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

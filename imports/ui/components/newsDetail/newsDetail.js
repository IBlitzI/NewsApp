import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './newsDetail.html';

Template.newsDetail.helpers({
  selectedNewsItem() {
    return Session.get('selectedNewsItem');
  }
});

Template.newsDetail.events({
  'click .back-to-news'(event) {
    event.preventDefault();
    Session.set('isDetailView', false);
  }
});

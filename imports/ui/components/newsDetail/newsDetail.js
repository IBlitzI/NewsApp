import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './newsDetail.html';

Template.newsDetail.helpers({
  selectedNewsItem() {
    return Session.get('selectedNewsItem');
  },
});

Template.newsDetail.events({
  'click .back-to-news'(event) {
    event.preventDefault();
    FlowRouter.go('home');
  }
});

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../newsDetail/newsDetail.html'
import '../newsDetail/newsDetail'
Template.mainContent.helpers({
  isDetailView() {
    return Session.get('isDetailView');
  }
});
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../newsDetail/newsDetail.html'
import '../newsDetail/newsDetail'
import '../dummyVariable/newsLetter/newsLetter.html'
import '../dummyVariable/relatedTopics/relatedTopics.html'
import '../dummyVariable/relatedTopics/relatedTopics.js'
Template.mainContent.helpers({
  isDetailView() {
    return Session.get('isDetailView');
  }
});
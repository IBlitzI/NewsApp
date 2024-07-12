import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './detailPage.html';
import '../../components/newsDetail/newsDetail.html';
import '../../components/newsDetail/newsDetail.js';
import '../../components/newsDetail/newsDetail.css';
import '../../components/dummyVariable/newsLetter/newsLetter.html'
import '../../components/dummyVariable/relatedTopics/relatedTopics.html'

Template.detailPage.onCreated(function () {
  this.autorun(() => {
    const newsId = FlowRouter.getParam('id');
    const newsData = Session.get('newsData');
    const selectedNewsItem = newsData ? newsData.find(item => item.key === newsId) : null;

    if (selectedNewsItem) {
      Session.set('selectedNewsItem', selectedNewsItem);
    }
  });
});

Template.detailPage.helpers({
  selectedNewsItem() {
    return Session.get('selectedNewsItem');
  },
});
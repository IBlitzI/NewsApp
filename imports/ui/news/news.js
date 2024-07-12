import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './news.html';
import './news.css';
import '../components/locationFilter/locationFilter.html';
import '../components/locationFilter/locationFilter.js';
import '../components/loading/loading.html';
import moment from 'moment';

Template.registerHelper('truncate', function (text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
});

Template.registerHelper('formatDate', function (date) {
  return moment(date).fromNow();
});

Template.news.onCreated(function () {
  Session.setDefault('isDetailView', false);
  this.viewMore = new ReactiveVar(false);
  this.paging = new ReactiveVar(1);
  this.isLoading = new ReactiveVar(true);

  this.autorun(() => {
    const paging = this.paging.get();
    this.isLoading.set(true);
    Meteor.call('fetchNews', 'general', paging, (error, result) => {
      if (!error) {
        let currentNewsData = Session.get('newsData') || [];

        currentNewsData = currentNewsData.concat(result); 
        Session.set('newsData', currentNewsData);
      }
      this.isLoading.set(false);
    });
  });
});

Template.news.helpers({
  isLoading() {
    return Template.instance().isLoading.get() || Session.get('isNavbarLoading');
  },
  newsItems() {
    const newsData = Session.get('newsData');
    const viewMore = Template.instance().viewMore.get();
    if (Array.isArray(newsData)) {
      return viewMore ? newsData : newsData.slice(0, 4);
    }
    return [];
  },
  isViewMoreVisible() {
    const newsData = Session.get('newsData');
    return Array.isArray(newsData) && newsData.length > 4;
  },
});

Template.news.events({
  'click #view-more'(event, templateInstance) {
    event.preventDefault();
    const currentPaging = templateInstance.paging.get();
    templateInstance.paging.set(currentPaging + 1);
    templateInstance.viewMore.set(true);
  },
  'click .news-card'(event) {
    event.preventDefault();
    const newsKey = event.currentTarget.dataset.id;
    console.log(newsKey)
    FlowRouter.go('detail', { id: newsKey });
  }
});
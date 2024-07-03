import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './news.html';
import './news.css';
import '../components/locationFilter/locationFilter.html';
import '../components/locationFilter/locationFilter.js'

Template.registerHelper('truncate', function (text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
});

Template.news.onCreated(function () {
  Session.setDefault('isDetailView', false)
  this.viewMore = new ReactiveVar(false);
  this.paging = new ReactiveVar(1);

  this.autorun(() => {
    const paging = this.paging.get();
    Meteor.call('fetchNews', 'general', paging, (error, result) => {
      if (!error) {
        let currentNewsData = Session.get('newsData') || [];
        currentNewsData = currentNewsData.concat(result);
        Session.set('newsData', currentNewsData);
      }
    });
  });
});

Template.news.helpers({
  newsItems() {
    const newsData = Session.get('newsData');
    const viewMore = Template.instance().viewMore.get();
    if (Array.isArray(newsData)) {
      return viewMore ? newsData : newsData.slice(0, 5);
    }
    return [];
  },
  isViewMoreVisible() {
    const newsData = Session.get('newsData');
    return Array.isArray(newsData) && newsData.length > 4;
  },
  viewMoreText() {
    return Template.instance().viewMore.get() ? 'View Less' : 'View More';
  }
});

Template.news.events({
  'click #view-more'(event, templateInstance) {
    event.preventDefault();
    const viewMore = templateInstance.viewMore.get();
    if (!viewMore) {
      const currentPaging = templateInstance.paging.get();
      templateInstance.paging.set(currentPaging + 1); 
    }
    templateInstance.viewMore.set(!viewMore);
  },
  'click .read-more'(event) {
    event.preventDefault();
    const newsKey = event.currentTarget.dataset.id;
    const newsData = Session.get('newsData');
    const selectedNewsItem = newsData.find(item => item.key === newsKey);
    if (selectedNewsItem) {
      Session.set('selectedNewsItem', selectedNewsItem);
      Session.set('isDetailView', true);
    }
  }
});

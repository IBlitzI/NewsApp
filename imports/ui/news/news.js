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
  this.viewMore = new ReactiveVar(false);
  this.paging = new ReactiveVar(1);
  console.log(Session.get('newsData'))
  this.autorun(() => {
    const paging = this.paging.get();
    Meteor.call('fetchNews', 'general', paging, (error, result) => {
      if (!error) {
        let currentNewsData = Session.get('newsData') || [];
        currentNewsData = currentNewsData.concat(result); // Concatenate new data
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
  'click .read-more'(event) {
  event.preventDefault();
  const newsId = $(event.currentTarget).data('id');
  console.log(Session.equals(key,newsId))
},
  'click #view-more'(event, templateInstance) {
    event.preventDefault();
    const viewMore = templateInstance.viewMore.get();
    if (!viewMore) {
      const currentPaging = templateInstance.paging.get();
      templateInstance.paging.set(currentPaging + 1); 
    }
    templateInstance.viewMore.set(!viewMore);
  }
});

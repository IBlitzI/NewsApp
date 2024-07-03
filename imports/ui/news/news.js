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

Template.news.onCreated(function() {
  this.viewMore = new ReactiveVar(false); 
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
    templateInstance.viewMore.set(!viewMore); 
  }
});

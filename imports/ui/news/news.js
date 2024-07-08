import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './news.html';
import './news.css';
import '../components/locationFilter/locationFilter.html';
import '../components/locationFilter/locationFilter.js';
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

  this.autorun(() => {
    const paging = this.paging.get();
    Meteor.call('fetchNews', 'general', paging, (error, result) => {
      if (!error) {
        let currentNewsData = Session.get('newsData') || [];
        //paging arttığında key'ler tekrar 0 dan başladığı için detay sayfasına yönlendirmek için unique key veriyorum.
        const uniqueResult = result.map(item => ({
          ...item,
          uniqueKey: `${item.key}-${paging}-${Math.random().toString(36).substr(2, 9)}` 
        }));
        currentNewsData = currentNewsData.concat(uniqueResult);
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
    const newsData = Session.get('newsData');
    const selectedNewsItem = newsData.find(item => item.uniqueKey === newsKey); 
    if (selectedNewsItem) {
      Session.set('selectedNewsItem', selectedNewsItem);
      Session.set('isDetailView', true);
    }
  }
});

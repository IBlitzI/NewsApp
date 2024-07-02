import { Template } from 'meteor/templating';
import './newsDetail.html';
import './newsDetail.css';

Template.newsDetail.onCreated(function() {
  this.autorun(() => {
    const newsId = Router.current().params._id;
    Meteor.call('fetchSingleNews', newsId, (error, result) => {
      if (!error) {
        this.data.set(result);
      }
    });
  });
});

Template.newsDetail.helpers({
  title() {
    return Template.instance().data.get().title;
  },
  image() {
    return Template.instance().data.get().image;
  },
  content() {
    return Template.instance().data.get().content;
  }
});

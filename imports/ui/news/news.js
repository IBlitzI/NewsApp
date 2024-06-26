import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import './news.html';
import './news.css';
import './locationFilter.html';

const API_KEY = '1Noer8MT9AohiaGWe56pbk:77xWoDbR7HQvo4Dtfb2bNJ';
const BASE_URL = 'https://api.collectapi.com/news/getNews';
const NEWS_PER_PAGE = 4;

Template.registerHelper('truncate', function(text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
});

Template.news.onCreated(function () {
  this.newsItems = new ReactiveVar([]);
  this.page = new ReactiveVar(1);

  this.loadNews = (page = 1) => {
    const offset = (page - 1) * NEWS_PER_PAGE;

    HTTP.call('GET', BASE_URL, {
      headers: {
        'content-type': 'application/json',
        'authorization': `apikey ${API_KEY}`
      },
      params: {
        country: 'tr',
        tag: 'general',
        offset: offset,
        limit: NEWS_PER_PAGE
      }
    }, (error, response) => {
      if (error) {
        console.error('Error fetching news data:', error);
      } else {
        if (page === 1) {
          this.newsItems.set(response.data.result);
        } else {
          const currentNews = this.newsItems.get();
          this.newsItems.set(currentNews.concat(response.data.result));
        }
      }
    });
  };

  this.loadNews();
});

Template.news.helpers({
  newsItems() {
    return Template.instance().newsItems.get();
  }
});

Template.news.events({
  'click #view-more'(event, instance) {
    event.preventDefault();
    const nextPage = instance.page.get() + 1;
    instance.page.set(nextPage);
    instance.loadNews(nextPage);
  }
});
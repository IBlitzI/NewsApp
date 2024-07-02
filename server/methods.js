import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { getNewsData, getNewsByLocation, NewsCollection } from '../imports/api/newsApi.js';

Meteor.methods({
  'fetchNews'(tag, paging) {
    check(tag, String);
    check(paging, Number);  // Paging'in sayı olduğunu kontrol edelim

    try {
      const newsData = getNewsData(tag, paging);
      return newsData;
    } catch (error) {
      throw new Meteor.Error('api-fetch-failed', `Failed to fetch news data for tag: ${tag}`);
    }
  },

  'getNewsByLocation'(location) {
    check(location, String);
    try {
      const newsData = getNewsByLocation(location);
      return newsData;
    } catch (error) {
      console.log(error);
      throw new Meteor.Error('api-fetch-failed', `Failed to fetch news for location: ${location}`);
    }
  },

  'fetchSingleNews'(newsId) {
  check(newsId, Number);

  if (!newsId) {
    throw new Meteor.Error('invalid-parameter', 'News ID cannot be null or undefined');
  }

  try {
    const newsData = Session.get('key') === newsId
    if (!newsData) {
      throw new Meteor.Error('not-found', 'News item not found');
    }
    return newsData;
  } catch (error) {
    throw new Meteor.Error('fetch-single-news-failed', `Failed to fetch news with id: ${newsId}`);
  }
}
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { getNewsData,getNewsByLocation } from '../imports/api/newsApi.js';

Meteor.methods({
  'fetchNews'(tag) {
    check(tag, String);  

    try {
      const newsData = getNewsData(tag);
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
      console.log(error)
      throw new Meteor.Error('api-fetch-failed', `Failed to fetch news for location: ${location}`);
    }
  }
});
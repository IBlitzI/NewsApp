import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

const API_KEY = Meteor.settings.private.apiKey;
const BASE_URL = Meteor.settings.private.apiUrl;

export const getNewsData = async (tag, paging) => {
  try {
    const response = await fetch(`${BASE_URL}/getNews?country=tr&tag=${tag}&paging=${paging}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw new Meteor.Error('api-fetch-failed', 'Failed to fetch news data');
  }
};

export const getNewsByLocation = async (location) => {
  
  try {
    const response = await fetch(`${BASE_URL}/getNewsLocal?city=${location}&country=tr&tag=general`, {
      method: 'GET',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API response status code: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('API error:', error);
    throw new Meteor.Error('api-fetch-failed', error.message);
  }
};
import { HTTP } from 'meteor/http';

const API_KEY = '1Noer8MT9AohiaGWe56pbk:77xWoDbR7HQvo4Dtfb2bNJ';
const BASE_URL = 'https://api.collectapi.com/news/getNews';

export const getNewsData = (tag) => {
  try {
    const response = HTTP.call('GET', BASE_URL, {
      headers: {
        'content-type': 'application/json',
        'authorization': `apikey ${API_KEY}`
      },
      params: {
        country: 'tr',
        tag: tag
        
        
      }
    });

    if (response.statusCode !== 200) {
      throw new Error(`API returned status code ${response.statusCode}`);
    }

    // Sadece result dizisini döndür
    return response.data.result;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw new Meteor.Error('api-fetch-failed', 'Failed to fetch news data');
  }
};

export const getNewsByLocation = (location) => {
  const url = `https://api.collectapi.com/news/getNewsLocal?city=${location}`;
  const headers = {
    'Authorization': `apikey ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = HTTP.get(url, { headers });
    if (response.statusCode === 200) {
      return response.data.result;  
    } else {
      throw new Error(`API response status code: ${response.statusCode}`);
    }
  } catch (error) {
    console.error('API error:', error);
    throw new Meteor.Error('api-fetch-failed', error.message);
  }
};

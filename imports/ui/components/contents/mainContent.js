import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../dummyVariable/dummySlider/dummySlider.html'
import '../dummyVariable/dummySlider/dummySlider.css'
import '../newsDetail/newsDetail.html'
import '../newsDetail/newsDetail.css'
import '../newsDetail/newsDetail'
import '../dummyVariable/newsLetter/newsLetter.html'
import '../dummyVariable/relatedTopics/relatedTopics.js'
import '../dummyVariable/relatedTopics/relatedTopics.html'
import '../loading/loading.html'


Template.mainContent.helpers({
  isDetailView() {
    return Session.get('isDetailView');
  }
});
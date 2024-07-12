import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../ui/layouts/mainLayout.html';
import '../ui/pages/homePage/homePage.html';
import '../ui/pages/detailPage/detailPage.html';
import '../ui/pages/detailPage/detailPage.js';



FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('mainLayout', { main: 'homePage' });
  },
});


FlowRouter.route('/detail/:id', {
  name: 'detail',
  action(params) {
    BlazeLayout.render('mainLayout', { main: 'detailPage' });
  },
});
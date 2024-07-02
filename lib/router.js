import { NewsCollection } from '..//imports/api/newsApi';

Router.route('/', function () {
  this.render('home'); // Ana sayfa için template adınız 'home' olmalı
});

Router.route('/news/:_id', function () {
  this.render('newsDetail', {
    data: function () {
      const newsId = parseInt(this.params._id, 10); // newsId'yi tam sayı olarak alın
      return NewsCollection.findOne({ key: newsId }); // Haber verisini koleksiyondan alın
    }
  });
});
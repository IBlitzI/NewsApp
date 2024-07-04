import { Template } from 'meteor/templating';
import './relatedTopics.html'
Template.relatedTopics.helpers({
    topics() {
        return [
            {
                image: '/assets/newsDetail1.png',
                title: 'India & Its Magnetic Charm For Foreign Investments',
                description: '',
                likes: 28,
                comments: 72,
            },
            {
                image: '/assets/newsDetail2.png',
                title: 'Hill Republicans begin jockeying for power in a possible post-Trump world',
                description: '',
                likes: 28,
                comments: 72,
            },
            {
                image: '/assets/newsDetail3.png',
                title: 'Twitter \'walkout\' planned after rapper\'s anti-Semitic tirade',
                description: '',
                likes: 28,
                comments: 72,
            },
            {
                image: '/assets/newsDetail4.png',
                title: 'Fleetwood Mac co-founder Peter Green dies at 73',
                description: '',
                likes: 28,
                comments: 72,
            },
            {
                image: '/assets/dummyNews2.png',
                title: 'The ADA is turning 30. It’s time that it included digital accessibility.',
                description: '',
                likes: 28,
                comments: 72,
            }
        ];
    }
});
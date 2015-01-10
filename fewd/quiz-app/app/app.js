// For more information on IIFE, read here: http://gregfranko.com/blog/i-love-my-iife/
(function($) {
  'use strict';

  var questions = [{
    text: 'Question 1',
    answers: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ],
    correctAnswer: 0,
    userAnswer: null
  },{
    text: 'Question 2',
    answers: [
      'Answer 5',
      'Answer 6',
      'Answer 7',
      'Answer 8'
    ],
    correctAnswer: 1,
    userAnswer: null
  },{
    text: 'Question 3',
    answers: [
      'Answer 9',
      'Answer 10',
      'Answer 11',
      'Answer 12'
    ],
    correctAnswer: 2,
    userAnswer: null
  },{
    text: 'Question 4',
    answers: [
      'Answer 13',
      'Answer 14',
      'Answer 15',
      'Answer 16'
    ],
    correctAnswer: 3,
    userAnswer: null
  },{
    text: 'Question 5',
    answers: [
      'Answer 17',
      'Answer 18',
      'Answer 19',
      'Answer 20'
    ],
    correctAnswer: 0,
    userAnswer: null
  }];

  $('.start-quiz-button').on('click', function() {
    //$('.splash').transition({perspective: '100px', rotateY: '180deg'}, function() {
    //  console.log('done');
    //});

    $('.question-template').removeClass('hidden').transition({ x: -40 })
  .transition({ y: 40 })
  .transition({ x: 0 })
  .transition({ y: 0 });
  });

})(jQuery);
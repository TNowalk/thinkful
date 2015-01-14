'use strict';

angular.module('ThinkfulProjects', []);
angular.module('ThinkfulProjects')
  .controller('ProjectsCtrl', ['$scope', function($scope) {

  $scope.courses = {
    ang: {code: 'ANG-001', name: 'Learn AngularJS'},
    fewdv4: {code: 'FEWD-001', name: 'Front-End Web Development v4'},
    fewd: {code: 'FEWD-001', name: 'Front-End Web Development v1'},
    //ios: {code: 'IOS-001', name: 'iOS Development'},
    pip: {code: 'PIP-001', name: 'Programming in Python'},
    //ror: {code: 'ROR-001', name: 'Ruby on Rails'}
    node: {code: 'NODE-001', name: 'Learn NodeJS'}
  };

  $scope.projects = {
    ang: [
      {
        name: 'Adder / Subtractor',
        type: 'git',
        filename: 'adder/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/adder/index.html'
      },
      {
        name: 'Challenge One: Sorting Months',
        type: 'cssdeck',
        url: 'http://cssdeck.com/labs/0elctcsp'
      },
      {
        name: 'Challenge Two: Fizz Buzz',
        type: 'cssdeck',
        url: 'http://cssdeck.com/labs/uuho5nal'
      },
      {
        name: 'Challenge Three: Countries Data',
        type: 'cssdeck',
        url: 'http://cssdeck.com/labs/hzsebbkc'
      },
      {
        name: 'ngMadLibs Version 1',
        type: 'git',
        filename: 'ngMadLibs/v1/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/ngMadLibs/v1/index.html'
      },
      {
        name: 'ngMadLibs Version 2',
        type: 'git',
        filename: 'ngMadLibs/v2/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/ngMadLibs/v2/index.html'
      },
      {
        name: 'ngMadLibs Version 3',
        type: 'git',
        filename: 'ngMadLibs/v3/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/ngMadLibs/v3/index.html'
      },
      {
        name: 'Multiplication Table Version 1',
        type: 'git',
        filename: 'multiply/v1/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/multiply/v1/index.html'
      },
      {
        name: 'Multiplication Table Version 2',
        type: 'git',
        filename: 'multiply/v2/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/multiply/v2/index.html'
      },
      {
        name: 'Waitstaff Calculator',
        type: 'git',
        filename: 'waitstaff/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/ang/waitstaff/index.html'
      }
    ],
    fewdv4: [
      {
        name: '1.1.1 - Introducing HTML',
        type: 'git',
        filename: '1.1.1/freshprince.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/1.1.1/freshprince.html'
      },
      {
        name: '1.1.2 - Introducing CSS',
        type: 'git',
        filename: '1.1.2/freshprince.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/1.1.2/freshprince.html'
      },
      {
        name: '1.2 - Build an About Me Page',
        type: 'codepen',
        url: 'http://codepen.io/TNowalk/full/RNKMdY'
      },
      {
        name: '1.3.2 - Hack the New York Times',
        type: 'image',
        src:  'fewdv4/1.3.2/1.3.2 - NYT Hack.png'
      },
      {
        name: '1.4 - Build a Landing Page from Scratch',
        type: 'git',
        filename: '1.4/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/1.4/index.html'
      },
      {
        name: '1.5.2 - Create a Responsive Web Page',
        type: 'git',
        filename: '1.5.2/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/1.5.2/index.html'
      },
      {
        name: '1.5.3 - Submitting Your Portfolio',
        type: 'git',
        filename: '1.5.3/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/1.5.3/index.html'
      },
      {
        name: '2.1.1 - Hello World with jQuery',
        type: 'git',
        filename: '2.1.1/',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/2.1.1/'
      },
      {
        name: '2.1.2 - Introducing the DOM',
        type: 'git',
        filename: '2.1.2/',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/2.1.2/'
      },
      {
        name: '2.2 - Street Fighter',
        type: 'git',
        filename: '2.2/main.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewdv4/2.2/'
      }
    ],
    fewd: [
      {
        name: 'HTML Resume',
        type: 'git',
        filename: 'resume_v1/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewd/resume_v1/index.html'
      },
      {
        name: 'Style Your Resume',
        type: 'git',
        filename: 'resume_v2/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewd/resume_v2/index.html'
      },
      {
        name: 'Google Clone',
        type: 'git',
        filename: 'google-clone/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/fewd/google-clone/index.html'
      }
    ],
    ios: [],
    pip: [
      {
        name: 'Exercise 1: A Good First Program',
        type: 'git',
        filename: 'lpthw_ex_1.py',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_1.py'
      },
      {
        name: 'Exercise 2: Comments and Pound Characters',
        type: 'git',
        filename: 'lpthw_ex_2.py',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_2.py'
      },
      {
        name: 'Exercise 11: Asking Questions',
        type: 'git',
        filename: 'lpthw_ex_11.py',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_11.py'
      },
      {
        name: 'Exercise 12: Prompting People',
        type: 'git',
        filename: 'lpthw_ex_12.py',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_12.py'
      },
      {
        name: 'Unit 1, Lesson 5: Tip Calculator',
        type: 'git',
        filename: 'tip_calculator/tip_calculator.py',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/pip/tip_calculator/tip_calculator.py'
      }
    ],
    ror: [],
    node: [{
        name: 'Build a Tip Calculator from Scratch',
        type: 'git',
        filename: 'tipCalculator/index.html',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/node/tipCalculator/index.html'
      },{
        name: 'Hello World Server',
        type: 'git',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/node/helloWorld/server.js'
      },{
        name: 'Getting Started With Our Shopping List App',
        type: 'git',
        gitHubUrl: 'https://github.com/TNowalk/thinkful/blob/gh-pages/node/shopping-list/server.js'
      }
    ]
  };
}]);
function ProjectsCtrl($scope) {
  $scope.courses = {
    fewd: {code: 'FEWD-001', name: 'Front-End Web Development'},
    //ios: {code: 'IOS-001', name: 'iOS Development'},
    pip: {code: 'PIP-001', name: 'Programming in Python'},
    //ror: {code: 'ROR-001', name: 'Ruby on Rails'}
  };

  $scope.projects = {
    fewd: [
      {
        name: "HTML Resume",
        filename: "resume_v1/index.html",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/fewd/resume_v1/index.html"
      },
      {
        name: "Style Your Resume",
        filename: "resume_v2/index.html",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/fewd/resume_v2/index.html"
      }
    ],
    ios: [],
    pip: [
      {
        name: "Exercise 1: A Good First Program",
        filename: "lpthw_ex_1.py",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_1.py"
      },
      {
        name: "Exercise 2: Comments and Pound Characters",
        filename: "lpthw_ex_2.py",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_2.py"
      },
      {
        name: "Exercise 11: Asking Questions",
        filename: "lpthw_ex_11.py",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_11.py"
      },
      {
        name: "Exercise 12: Prompting People",
        filename: "lpthw_ex_12.py",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/pip/lpthw_ex_12.py"
      },
      {
        name: "Unit 1, Lesson 5: Tip Calculator",
        filename: "tip_calculator/tip_calculator.py",
        gitHubUrl: "https://github.com/TNowalk/thinkful/blob/gh-pages/pip/tip_calculator/tip_calculator.py"
      }
    ],
    ror: []
  };
}
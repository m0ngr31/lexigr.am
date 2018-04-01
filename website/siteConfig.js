/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [];

const siteConfig = {
  title: 'Lexigram' /* title for your website */,
  tagline: 'A suite of tools for combining Kodi and Alexa',
  url: 'https://lexigr.am' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'lexigram',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {page: 'help', label: 'Help'},
    // {blog: false, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/lexigram.svg',
  footerIcon: 'img/lexigram.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#25b3e8',
    secondaryColor: '#4d4d4d',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Joe Ipson',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  editUrl: 'https://github.com/m0ngr31/lexigr.am/edit/master/docs/',
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/m0ngr31/kanzi',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
};

module.exports = siteConfig;

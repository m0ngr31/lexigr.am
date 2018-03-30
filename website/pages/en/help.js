/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content: 'The first place you should look when you are running into issues. There is a good chance that someone has run into the same thing that you have and there is already an answer ready for you. Check it out [here](https://forum.kodi.tv/showthread.php?tid=254502)!',
        title: 'Kodi Forum',
      },
      {
        content: 'If your find that your problem lies in the source code, feel free to open up an issue on Github. Just browse to my [account](https://github.com/m0ngr31), and find the project that ails you. Go ahead and open up an issue there and we\'ll do our best to fix it in a timely manner.'
        ,
        title: 'Github',
      },
      {
        content:
          'Don\'t forget to double-check the [documentation on this site.](/docs/getting-started.html)',
        title: 'Browse Docs',
      }
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>It's understandable. There is a plethora of things that could go wrong. We're happy to help. Here are the best ways to get help with whatever your problem is:</p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;

import { markdownToDraft, draftToMarkdown } from '../src/index';
import { ContentBlock, convertToRaw, convertFromHTML, ContentState } from 'draft-js';

describe('draftToMarkdown', function () {
  it('renders links correctly', function () {
    /* eslint-disable */
    var rawObject = {"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.com"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://facebook.github.io/draft-js/"}}},"blocks":[{"key":"58spd","text":"This is a test of a link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":18,"length":6,"key":0}],"data":{}},{"key":"9ln6g","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3euar","text":"And perhaps we should test once more.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":4,"length":7,"key":1}],"data":{}}]};
    /* eslint-enable */
    var markdown = draftToMarkdown(rawObject);
    expect(markdown).toEqual('This is a test of [a link](https://google.com)\n\n\n\nAnd [perhaps](https://facebook.github.io/draft-js/) we should test once more.');
  });

  it('renders "the kitchen sink" correctly', function () {
    /* eslint-disable */
    var rawObject = {"entityMap":{},"blocks":[{"key":"2uvch","text":"Hello!","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"gcip","text":"My name is Rose :) \nToday, I'm here to talk to you about how great markdown is!\n","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":11,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"eu8ak","text":"First, here's a few bullet points:","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fiti6","text":"One","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d8amu","text":"Two","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7r62d","text":"Three","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3n7hc","text":"A codeblock","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9o0hn","text":"And then... some monospace text?\nOr... italics?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":19,"style":"CODE"},{"offset":39,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}}]};
    /* eslint-enable */
    var markdown = draftToMarkdown(rawObject);
    expect(markdown).toEqual('# Hello!\n\nMy name is **Rose** :) \nToday, I\'m here to talk to you about how great markdown is!\n\n\n## First, here\'s a few bullet points:\n\n- One\n- Two\n- Three\n\n```\nA codeblock\n```\n\nAnd then... `some monospace text`?\nOr... _italics?_');
  });

  it('renders custom items correctly', function () {
    /* eslint-disable */
    var rawObject = {"entityMap":{},"blocks":[{"key":"f2bpj","text":"OneTwoThree","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"red"},{"offset":3,"length":3,"style":"orange"},{"offset":6,"length":5,"style":"yellow"}],"entityRanges":[],"data":{}}]};
    /* eslint-enable */
    var markdown = draftToMarkdown(rawObject, {
      styleItems: {
        red: {
          open: function () {
            return '<span style="color: red">';
          },

          close: function () {
            return '</span>';
          }
        },

        orange: {
          open: function () {
            return '<span style="color: orange">';
          },

          close: function () {
            return '</span>';
          }
        },

        yellow: {
          open: function () {
            return '<span style="color: yellow">';
          },

          close: function () {
            return '</span>';
          }
        }
      }
    });

    expect(markdown).toEqual('<span style="color: red">One</span><span style="color: orange">Two</span><span style="color: yellow">Three</span>')
  });
});
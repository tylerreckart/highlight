import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';

import $ from 'jquery';

const Glance = React.createClass({
  handleGlance(e) {
    e.preventDefault();
    var buttonEl = document.querySelector('#start');
    var commentEl = document.querySelector('.glance-content');
    var wpmEl = document.querySelector('#wpm');
    var readerEl = document.querySelector('.reader');
    var currentTimer = null;

    function processWord(word){
      var center = Math.floor(word.length / 2);
      var letters = word.split('');
      var result = [];
      return letters.map(function(letter, idx){
        if (idx === center){
          return '<span class="highlight">' + letter + '</span>';
        }
        return letter;
      }).join('');
    }

    function positionWord(){
      var wordEl = readerEl.firstElementChild;
      var highlight = wordEl.firstElementChild;

      var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
      var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

      wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
      wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
    }

    buttonEl.addEventListener('click', function(){
        var words = commentEl.textContent.split(/\s+/).map(processWord);
        var currentWord = 0;
        var delay = 60000 / parseInt(wpmEl.value, 10);

        clearTimeout(currentTimer);

        var displayNextWord = function(){
            var word = words[currentWord++];
            // WTB> nlp.js...
            var hasPause = /^\(|[,\.\)]$/.test(word);

            // XSS?! :(.
            readerEl.firstElementChild.innerHTML = word;
            positionWord();

            if (currentWord !== words.length){
                currentTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1));
            }
        };
        displayNextWord();
    });
  },

  render() {
    return (
      <div className="glance clearfix">
        <p className="glance-content">Simulation is a great way to design a product for users who don’t share the same context as you do. This is what Facebook aims to drill through to its staff by slowing down the site for one hour on Tuesdays.

Through the initiative—dubbed “2G Tuesdays”—the company hopes its staff will better understand what its like to access the platform via a 2G connection, a reality for many of its users living in the developing world. In Africa, Facebook has over 120 million active users, 57% of which access the platform using a feature phone with a 2G connection.

“They’re going to see the places that we need to improve our product, but they’re also going to see the places where we have made a lot of progress,” said Tom Alison, Facebook’s engineering director.</p>
        <div className="reader">
          <div className="word-display" />
        </div>
        <div className="glance-options">
        <label className="select-label"><i className="fa fa-chevron-down"></i></label>
        <select id="wpm">
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
          <option value="1000">1000</option>
        </select>
        <button id="start" onClick={this.handleGlance}>Start</button>
        </div>
      </div>
    )
  }
});

export default Glance;

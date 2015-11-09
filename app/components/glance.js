import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';

import $ from 'jquery';

const Glance = React.createClass({

  handleGlance(e) {
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

    buttonEl.addEventListener('click', function(el){
        var glanceContent = commentEl.innerText;
        var stringContent = glanceContent.replace(/(<([^>]+)>)/ig,"");
        console.log(stringContent);
        var words = stringContent.split(/\s+/).map(processWord);
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
    });
      displayNextWord();
  },

  render() {
    return (
      <div className="glance clearfix">
        <p className="glance-content">{this.props.result.content}</p>
        <div className="reader">
          <div className="word-display" />
        </div>
        <div className="glance-options">
        <button id="start" onClick={this.handleGlance.bind(this, this.props.result)}>Start</button>
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
        </div>
      </div>
    )
  }
});

export default Glance;

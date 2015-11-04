import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options){
    if(options.url.match(/api.parse.com/)){
      xhr.setRequestHeader('X-Parse-Application-Id', 'T18NZkl5qhtTITW96Z6BedCBNhYQb8xhUzngPUU2');
      xhr.setRequestHeader('X-Parse-REST-API-Key', '0salgfrO3JAPBy5gUBllx9ZvJ12o9HLKmrXdw6lp');
      if(localStorage.getItem('parse-session-token')) {
        xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
      }
    }
  }
});

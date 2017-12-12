
app.directive('fbComments', function() {
    function createHTML(href, numposts, colorscheme, width) {
      return '<div class="fb-comments" ' +
        'data-href="' + href + '" ' +
        'data-numposts="' + numposts + '" ' +
        'data-colorsheme="' + colorscheme + '" ' +
        'data-width="' + width + '">' +
        '</div>';
    }
    return {
      restrict: 'E',
      scope: {},
      link: function postLink(scope, elem, attrs) {
        attrs.$observe('pageHref', function(newValue) {
          var href = newValue;
          var numposts = attrs.numposts || 5;
          var colorscheme = attrs.colorscheme || 'light';
          var width = attrs.width || '100%';
          elem.html(createHTML(href, numposts, colorscheme, width));
        });
      }
    };
  });


  
app.directive('fbLikes', function() {
  function createHTML(href) {
    return  '<div class="fb-like"'+ 
    'data-href="' + href + '" ' +
    'data-layout="button_count"' +
    'data-action="like" data-size="small"'+
    'data-show-faces="true"'+
    'data-share="true">'+
    '</div>';
  }
  return {
    restrict: 'E',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        elem.html(createHTML(href));
      });
    }
  };
});



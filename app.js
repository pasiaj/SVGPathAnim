var $ = require('jquery-browserify'),
    __ = require('underscore'),
    $d = $(document),
    $p, p, a, pageHeight, pathLength, prevOffset;

$d.ready(function(){
    a           = false;
    $p          = $('#path');
    p           = $p[0];
    pathLength  = p.getTotalLength();
    pageHeight  = document.height - window.innerHeight;
    prevOffset  = pathLength;

    $p.attr('stroke-dashArray', '' + pathLength + ',' + pathLength);
    $p.attr('stroke-dashoffset', pathLength);
    $p.attr('stroke', '#000000');

    a = document.createElementNS(
          'http://www.w3.org/2000/svg', 'animate');
      // set its attributes
      a.setAttributeNS(null, 'attributeName', 'stroke-dashoffset');
      a.setAttributeNS(null, 'dur', 0.1);
      a.setAttributeNS(null, 'to', pathLength);
      a.setAttributeNS(null, 'from', pathLength);
      a.setAttributeNS(null, 'fill', 'freeze');

      // link the a to the target
    p.appendChild(a);

    $(window).scroll( onScroll );
});

function onScroll(event){
    var scrollHeight = $d.scrollTop(),
        scrollPercentage = scrollHeight/pageHeight;
        offset = pathLength * (1 - scrollPercentage);

    a.setAttributeNS(null, 'from', prevOffset);
    a.setAttributeNS(null, 'to', offset);

    a.beginElement();

    prevOffset = offset;
}

var $ = require('jquery-browserify'),
    __ = require('underscore'),
    $d = $(document),
    $p, p, a, pageHeight, pathLength, prevOffset;

$d.ready(function(){
    a           = false;
    $p          = $('path');
    p           = $p[0];
    pathLength  = p.getTotalLength();
    pageHeight  = document.body.clientHeight - window.innerHeight;
    prevOffset  = pathLength;

    $p.attr('stroke-dashArray', [pathLength, pathLength]);
    $p.attr('stroke-dashoffset', pathLength);
    $p.attr('stroke', '#000000');

    a = document.createElementNS(
          'http://www.w3.org/2000/svg', 'animate');
      // set its attributes
      a.setAttributeNS(null, 'attributeName', 'stroke-dashoffset');
      a.setAttributeNS(null, 'dur', 1);
      a.setAttributeNS(null, 'to', pathLength);
      a.setAttributeNS(null, 'from', pathLength);
      a.setAttributeNS(null, 'fill', 'freeze');

      // link the a to the target
    p.appendChild(a);

    $('#path2').attr('stroke-dashArray', [pathLength/3,  pathLength/3*5])
               .attr('stroke-dashoffset', pathLength/3);

    var b = document.createElementNS(
          'http://www.w3.org/2000/svg', 'animate');
      // set its attributes
      b.setAttributeNS(null, 'attributeName', 'stroke-dashoffset');
      b.setAttributeNS(null, 'dur', 4);
      b.setAttributeNS(null, 'to',   -pathLength/3*5);
      b.setAttributeNS(null, 'from', pathLength/3);
      b.setAttributeNS(null, 'fill', 'freeze');

    $('#path2')[0].appendChild(b);

    $(window).scroll( onScroll );
});

function onScroll(event){
    var scrollHeight = $d.scrollTop(),
        scrollPercentage = scrollHeight/pageHeight;
        offset = pathLength * (1 - scrollPercentage);

    console.log(scrollHeight, pageHeight);

    a.setAttributeNS(null, 'from', prevOffset);
    a.setAttributeNS(null, 'to', offset);

    a.beginElement();

    prevOffset = offset;
}

/*
 * Return outerHTML for the first element in a jQuery object,
 * or an empty string if the jQuery object is empty;
 */
jQuery.fn.outerHTML = function() {
   return (this[0]) ? this[0].outerHTML : '';
};

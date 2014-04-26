/* 
 * Aggiunta alla classe "Element" di Prototype per clonare elementi, vedi post
 * "Cloning elements" URL: http://groups.google.com/group/prototype-core/browse_thread/thread/9e943e4b54780d97/4d8f2844eddddaf7?lnk=gst&q=cloning+elements#4d8f2844eddddaf7
 * 
 * Test:
 * alert( $('test_div').toHTML() );
 * $('container').appendChild( $('test_div').clone() );
 * $('container').appendChild( $('test_div').clone() );
 * $('container').appendChild( $('test_div').clone() ); 
 */
Element.addMethods( {

toHTML: function(element) {
  if (typeof element=='string') element = $(element);  // IE needs that check with XML
  return Try.these(
    function() {
      var xmlSerializer = new XMLSerializer();
      return  element.nodeType == 4 ? element.nodeValue :
xmlSerializer.serializeToString(element);
    },
    function() {
      return element.xml || element.outerHTML || $
(element).clone().wrap().up().innerHTML;
    }
  ) || '';

},

getStyles: function(element) {
  element = $(element);
  return $A(element.style).inject({}, function(styles, styleName) {
    styles[styleName.camelize()] = element.getStyle( styleName );
    return styles;
  } );

},

clone: function(element) {
  var clone = new Element(element.tagName);
  $A(element.attributes).each(function(attribute) { if
( attribute.name != 'style' ) clone[attribute.name] =
attribute.value; });

  clone.setStyle( element.getStyles() );
  clone.update(element.innerHTML);

  return clone;

} } );

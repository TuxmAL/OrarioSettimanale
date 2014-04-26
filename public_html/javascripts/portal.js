/*
  Javascript per evidenziare le novità/modifiche sul portale.
  author: Antonio Liccardo
*/
function hilite(el, ico_style)
{
  el.morph(ico_style);
  el.highlight({startcolor:'#a10000', endcolor:'#4c4c4c',keepBackgroundImage: true});
}

function fade_mark() {
  var time_frame = 15 * (24 * 60 * 60 * 1000); //days *(hours_in_day * minutes_in_hour * seconds_in_minute * hundreds_of_seconds)
  var today = new Date();
  var last_mod = Date.parse(document.lastModified);
  var date_lapse = today - last_mod;
  if ( date_lapse <  time_frame) {
    Effect.multiple($$('#sidebar li.nuovo'),function(el){hilite(el, 'ico_nuovo')});
    Effect.multiple($$('#sidebar li.aggiornato'),function(el){hilite(el, 'ico_aggiornato')});
    Effect.multiple($$('#centerbar li.nuovo'),function(el){hilite(el, 'ico_nuovo');});
    Effect.multiple($$('#centerbar li.aggiornato'),function(el){hilite(el, 'ico_aggiornato')});
  }
  return false;
}
 

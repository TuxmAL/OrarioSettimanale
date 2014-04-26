/* 
 * Javascript dell'applicazione OPTA
 */

function reset_form(frm) { frm.reset(); }

function clear_table(id) {
  cells = document.getElementById(id);
  cells.style.visibility = 'hidden';
}

function clear_tables(id_list) { for (idx = 0; idx < id_list.length; idx++) { clear_table(id_list[idx]); } }

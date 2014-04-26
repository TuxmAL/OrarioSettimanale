// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function first_focus() {
    frm =  document.forms[0];
    if (frm) {
        Form.focusFirstElement(frm);
    } else {
        return null;
    }
}
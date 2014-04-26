/* 
 * Javascript dell'applicazione ODeMa
 */

function reset_form(frm) {
    frm.reset()
}

function show_message(msg) {
    $('message').innerHTML= ""
    $('decurtazione_submit').enable()
    if (msg != "") {
        $('decurtazione_submit').disable()
        if (($('message').select(".error")).length == 0) {
            adiv = document.createElement("div")
            adiv.setAttribute("class", "error")
            adiv.innerHTML = msg.replace("\n", "<br/>")
            $('message').appendChild(adiv)
        }
    }
}

function date_valid(date, year, month, day)
{
    if (date.getDate() == day) {
        if (date.getMonth() == month) {
            if (date.getFullYear() == year) {
                return true
            }
        }
    }
    return false
}

function days_between(from, to) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Calculate the difference in milliseconds
    // Convert back to days and return
    var diff_day = Math.abs(Math.floor((to.getTime() - from.getTime()) / ONE_DAY)) + 1
    return diff_day
}

function show_tot_gg() {
    var msg = "", gg, mm, aaaa

    try {
        aaaa = $('decurtazione_dal_1i').value
        mm = $('decurtazione_dal_2i').value - 1
        gg = $('decurtazione_dal_3i').value
        dal = new Date(aaaa, mm, gg)
        if (! date_valid(dal, aaaa, mm, gg)) {
           msg += "La data di inizio del periodo (" + gg + "/" + (mm + 1)+ "/" +
               aaaa + ") non è valida!\n"
        }
        aaaa = $('decurtazione_al_1i').value
        mm = $('decurtazione_al_2i').value - 1
        gg = $('decurtazione_al_3i').value
        al = new Date(aaaa, mm, gg)
        if (! date_valid(al, aaaa, mm, gg)) {
           msg += "La data di fine del periodo (" + gg + "/" + (mm + 1) + "/" +
               aaaa + ") non è valida!\n"
        }

        if (dal > al) {
            msg += "Attenzione, l'inizio del periodo è posteriore alla sua fine."
            show_message(msg)
            diff = ''
        } else {
            diff = days_between (dal, al)
        }
        show_message(msg)
    } catch (err)  {
        alert('errore in show_gg_tot(): ' + err)
    }
    $('decurtazione_tot_gg').value = diff
    $('decurtazione_dec_gg').value = (diff > 10)? 10: diff
}

function imposta_ruolo_po(cb_ruolo_po) {
    var sel_item, ret_val = ''
    try {
        sel_item = cb_ruolo_po.selectedIndex
        switch (sel_item) {
            case -1:
            case 0:
                ret_val = ''
                break;
            default:
                ret_val = cb_ruolo_po.options[sel_item].text
                break;
        }
        $('anagrafica_ruolo_po').value = ret_val
    } catch (err)  {
        $('anagrafica_ruolo_po').value = '?'
        alert('errore in imposta_ruolo_po(this): ' + err)
    }
}
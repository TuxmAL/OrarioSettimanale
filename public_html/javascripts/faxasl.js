/* 
 * Javascript dell'applicazione FaxASL
 */

function days_between(from, to) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Calculate the difference in milliseconds
    // Convert back to days and return
    var diff_day = Math.abs(Math.floor((to.getTime() - from.getTime()) / ONE_DAY)) + 1
    return diff_day
}

function show_gg_tot() {
    try {
        dal = new Date($('data_dal_malattia_dal_1i').value,
                       $('data_dal_malattia_dal_2i').value - 1,
                       $('data_dal_malattia_dal_3i').value)
        al = new Date($('data_al_malattia_al_1i').value, 
                      $('data_al_malattia_al_2i').value - 1,
                      $('data_al_malattia_al_3i').value)
        if (dal > al) {
            if (($('message').select(".error")).length == 0) {
                adiv = document.createElement("div")
                adiv.setAttribute("class", "error")
                adiv.innerHTML = "Attenzione, l'inizio della malattia è posteriore alla sua fine."
                $('message').appendChild(adiv)
                }
            diff = '?'
        } else {
            $('message').innerHTML= ""
            diff = days_between (dal, al)
        }

    } catch (err)  {
        alert('errore in show_gg_tot(): ' + err)
    }
    $('giorni_tot').value = diff
}

function disabilita_malattia_al(checkbox) {
    enabled = $(checkbox).checked
    $('data_al_malattia_al_1i').disabled = ! enabled
    $('data_al_malattia_al_2i').disabled = ! enabled
    $('data_al_malattia_al_3i').disabled = ! enabled
    $('giorni_tot').disabled = ! enabled
}

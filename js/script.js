'use strict';

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.locale('es');

const form_edad=document.getElementById("form-edad")
const nacimiento=document.getElementById("nacimiento")
const error_edad=document.getElementById("error-edad")

const resultado_edad=document.getElementById("resultado-edad")
const dias_edad=document.getElementById("dias-edad")
const horas_edad=document.getElementById("horas-edad")
const segundos_edad=document.getElementById("segundos-edad")
const dia_semana=document.getElementById("dia-semana")
const viernes=document.getElementById("viernes")

const fecha_evento=document.getElementById("fecha-evento")
const contador=document.getElementById("contador")
const estado_evento=document.getElementById("estado-evento")

const hora_local=document.getElementById("hora-local")
const hora_tokio=document.getElementById("hora-tokio")
const hora_nueva_york=document.getElementById("hora-nueva-york")
const hora_sidney=document.getElementById("hora-sidney")

form_edad.addEventListener("submit",(evento)=>{
  evento.preventDefault()
  const ahora=dayjs()
  const fecha_nacimiento=dayjs(nacimiento.value.replaceAll("/","-"),'YYYY-MM-DD','es')
  if (!isNaN(ahora.diff(fecha_nacimiento,"second")) && ahora.diff(fecha_nacimiento,"second")>0){
    dias_edad.textContent=ahora.diff(fecha_nacimiento,"day")
    horas_edad.textContent=ahora.diff(fecha_nacimiento,"hour")
    segundos_edad.textContent=ahora.diff(fecha_nacimiento,"second")
    dia_semana.textContent=fecha_nacimiento.format("dddd")
    viernes.textContent="???"

    resultado_edad.hidden=false
    error_edad.hidden=true
  } else {
    error_edad.hidden=false
    error_edad.textContent="ERROR: Fecha invalida"
    resultado_edad.hidden=true
  }
})

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13() {
  
}

function calcularEdad() {

}

function mostrarEdad() {

}

function procesarFormularioEdad() {

}

function iniciarEdad() {

}

// ==================================================
// PUNTO 2: CUENTA ATRÁS
// ==================================================

function descomponerDuracion() {

}

function actualizarCuentaAtras() {

}

function iniciarCuentaAtras() {

}

// ==================================================
// PUNTO 3: ZONAS HORARIAS
// ==================================================

function actualizarZonasHorarias() {

}

// ==================================================
// INICIO Y ACTUALIZACIÓN COMÚN
// ==================================================

function actualizarRelojes() {
  actualizarCuentaAtras();
  actualizarZonasHorarias();
}

iniciarEdad();
iniciarCuentaAtras();

// Ejecutamos la función nada más empezar y creamos un intervalo
actualizarRelojes();
// Un intervalo permite ejecutar una función cada x segundos (1000ms == 1seg)
setInterval(actualizarRelojes, 1000);


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
const proximo_year=dayjs("2000-01-01").add(Number(dayjs().format("YYYY"))+1-2000,"year")

const hora_local=document.getElementById("hora-local")
const hora_tokio=document.getElementById("hora-tokio")
const hora_nueva_york=document.getElementById("hora-nueva-york")
const hora_sidney=document.getElementById("hora-sidney")

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13(fecha,ahora){
  let contador=0

  for (let anio=fecha.year(); anio<=ahora.year(); anio++) {
    for (let mes=0; mes<12; mes++) {
      const dia13 = dayjs(anio+"-"+mes+"-13");
      if (dia13.format("dddd")==="viernes" && !dia13.isBefore(fecha, "day") && !dia13.isAfter(ahora, "day")) {
        contador++;
      }
    }
  }

  return contador;
}

form_edad.addEventListener("submit",(evento)=>{
  evento.preventDefault()
  const ahora=dayjs()
  const fecha_nacimiento=dayjs(nacimiento.value.replaceAll("/","-"),'YYYY-MM-DD','es',true)
  if (fecha_nacimiento.isValid() && ahora.diff(fecha_nacimiento,"second")>0){
    dias_edad.textContent=ahora.diff(fecha_nacimiento,"day")
    horas_edad.textContent=ahora.diff(fecha_nacimiento,"hour")
    segundos_edad.textContent=ahora.diff(fecha_nacimiento,"second")
    dia_semana.textContent=fecha_nacimiento.format("dddd")
    viernes.textContent=contarViernes13(fecha_nacimiento,ahora)

    resultado_edad.hidden=false
    error_edad.hidden=true
  } else {
    error_edad.hidden=false
    error_edad.textContent="ERROR: Fecha invalida"
    resultado_edad.hidden=true
  }
})

// ==================================================
// PUNTO 2: CUENTA ATRÁS
// ==================================================

function actualizarCuentaAtras() {
  let cuenta_atras=dayjs.duration(proximo_year.diff(dayjs()))
  if (Number(cuenta_atras.format("s"))<0){
    contador.textContent=""
    estado_evento.textContent="¡El evento ha llegado!"
  } else {
    contador.textContent="Faltan "+cuenta_atras.format("M")+" meses, "+cuenta_atras.format("D")+" días, "+cuenta_atras.format("H")+" horas, "+cuenta_atras.format("m")+" minutos y "+cuenta_atras.format("s")+" segundos"
  }
}

// ==================================================
// PUNTO 3: ZONAS HORARIAS
// ==================================================

function actualizarZonasHorarias() {
  let local=dayjs()
  let utc=local.utc()

  hora_local.textContent=local.format("DD/MM/YYYY HH:mm:ss")
  hora_tokio.textContent=utc.tz("Asia/Tokyo").format("DD/MM/YYYY HH:mm:ss")
  hora_nueva_york.textContent=utc.tz("America/New_York").format("DD/MM/YYYY HH:mm:ss")
  hora_sidney.textContent=utc.tz("Australia/Sydney").format("DD/MM/YYYY HH:mm:ss")
}

// ==================================================
// INICIO Y ACTUALIZACIÓN COMÚN
// ==================================================

function actualizarRelojes() {
  actualizarCuentaAtras();
  actualizarZonasHorarias();
}

fecha_evento.textContent=proximo_year.format("dddd, D [de] MMMM [de] YYYY, HH:mm")
actualizarCuentaAtras();

// Ejecutamos la función nada más empezar y creamos un intervalo
actualizarRelojes();
// Un intervalo permite ejecutar una función cada x segundos (1000ms == 1seg)
setInterval(actualizarRelojes, 1000);


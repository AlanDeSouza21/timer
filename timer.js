// DOM H1
var seg = document.getElementById('segundo')
var min = document.getElementById('minnuto')
var hora = document.getElementById('hora')
// VARIAVEL INTERVAL
var interval = ''
// DOM IMPUT
var idSeg = document.getElementById('segun')
var idMin = document.getElementById('minu')
var idHora = document.getElementById('horas')
// PARAMETRO PARA FUNÇÃO PARA VARIAVEL LOCALIZADA EM TRATAMENTO
var exporta_para = ''
// DOM ICONES 
var botao_play = document.querySelector('.fa-play')
var botao_pause = document.querySelector('.fa-pause')
var botao_redef = document.getElementById('btn_Redefi')
var botao_defini = document.getElementById('btn_Defi')
// CSS ICONES
botao_pause.style.display = 'none'
botao_redef.style.display = 'none'
// VARIAVEL LOCALIZADA NA FUNÇÃO DEFINIR PARA ATIVAR O PLAY
var ativaPlay = 0
// DOM MUSICAS
let musicas = document.querySelector('audio')
// MODIFICADORES DO H1 QUE MOSTRA O TEMPO REAL DECORRIDO
var exp_PARAseg = ''
var exp_PARAmin = ''
var exp_PARAhora = ''
var velocidade = 1000

document.addEventListener("keyup", function(e){
    if(e.key === "i" && botao_pause.style.display == 'none'){
        cronometra()
        interval = setInterval(cronometra, velocidade)
    }
    else if(e.key === "p"){
        pausa()
    }
})

botao_redef.addEventListener("click", () => {
    location.reload()
})

function inicia(){
    cronometra()
    interval = setInterval(cronometra, velocidade)
}

function pausa(){
    botao_play.style.display = 'block'
    botao_pause.style.display = 'none'

    clearInterval(interval)
}

function para(B){
    clearInterval(interval)
    idHora = 0
    idMin = 0
    idSeg = 0
    hora.innerText = idHora < 10 ? '0'+idHora : idHora 
    min.innerText = idMin < 10 ? '0'+idMin : idMin
    seg.innerText = idSeg < 10 ? '0'+idSeg : idSeg

    let aviso_Cancela = document.createElement("h2")
    aviso_Cancela.innerHTML = `${B}`
    document.getElementById('avisoCancela').appendChild(aviso_Cancela)
}

function definir(){
    ativaPlay = 1

    botao_redef.style.display = 'block'
    botao_defini.style.display = 'none'

    if(idHora.value <= 0 && idMin.value <= 0 && idSeg.value <= 0){
        alert('nenhum valor detectado')
        botao_redef.style.display = 'none'
        botao_defini.style.display = 'block'
        throw new Error('nenhum valor detectado') 
    }  

    if(idSeg.value > 60 || idMin.value > 60 ){
        window.alert('segundos ou minutos devem ser nenor que 60')
        botao_redef.style.display = 'none'
        botao_defini.style.display = 'block'
        throw new Error('segundos ou minutos maior que o permitido')
    }
    
    let var_HORARIO = hora.innerText = Number(idHora.value) < 10 ? '0'+Number(idHora.value) : Number(idHora.value)
    let var_MINUTOS = min.innerText = Number(idMin.value) < 10 ? '0'+Number(idMin.value) : Number(idMin.value) 
    let var_SEGUNDOS = seg.innerText = Number(idSeg.value) < 10 ? '0'+Number(idSeg.value) : Number(idSeg.value)

    document.getElementById('nave_div').remove()

    let cria_Let = document.createElement("h2")
    cria_Let.innerHTML = `Tempo definido: ${var_HORARIO}:${var_MINUTOS}:${var_SEGUNDOS}`
    document.getElementById('nave').appendChild(cria_Let)
}

function cronometra(){
    
    botao_play.style.display = 'none'
    botao_pause.style.display = 'block'

    if(ativaPlay == 0){
        alert('valor não definido')
        botao_play.style.display = 'block'
        botao_pause.style.display = 'none'
        clearInterval(interval)
        throw new Error('valor não definido')
    }

    if(idHora.value == 0 && idMin.value == 0 && idSeg.value == 0){
        alert('valor inexistente')
        botao_play.style.display = 'block'
        botao_pause.style.display = 'none'
        clearInterval(interval)
        throw new Error('valor não definido')
    }

    if(idHora.value > 0 && idMin.value == 0 && idSeg.value == 0){
        idMin.value = 59
        idSeg.value = 60
        idHora.value--        
    }
    if(idHora.value > 0 && idMin.value > 0 && idSeg.value == 0 || idHora.value == 0 && idMin.value > 0 && idSeg.value == 0){
        idSeg.value = 60
        idMin.value--
    }

    if(idMin.value == 0){
        idMin.value = 60
    }
    if(idSeg.value == 0){
        idSeg.value = 60
    }

    idSeg.value--
    if(idSeg.value == 60){
        idMin.value--
    }
    if(idMin.value == 59 && idSeg.value == 60){
        idHora.value--
    }

    if(idHora.value == 0 && idSeg.value == 0 && idMin.value == 60){
        idSeg.value--

        let Cont_Final = document.createElement("h2")
        Cont_Final.innerHTML = 'CONTAGEM FINALIZADA'
        document.getElementById('avisoCancela').appendChild(Cont_Final)
            
        clearInterval(interval)
        musicas.play()
    }
    if(idSeg.value < 0){
        idSeg.value = 0
    }
    tratamento(idHora.value)
    tratamento(idMin.value)
    tratamento(idSeg.value)
    
}

function tratamento(){
    
    if(idMin.value == 60){
        idMin.value = 0
    }
    if(idSeg.value == 60){
        idSeg.value = 0
    }

    exp_PARAseg = document.getElementById('segundo').innerText = idSeg.value < 10 ? '0'+idSeg.value : idSeg.value
    exp_PARAmin = document.getElementById('minnuto').innerText = idMin.value < 10 ? '0'+idMin.value : idMin.value
    exp_PARAhora = document.getElementById('hora').innerText = idHora.value < 10 ? '0'+idHora.value : idHora.value

    exporta_para = `contagem interrompida em: ${exp_PARAhora}:${exp_PARAmin}:${exp_PARAseg}`

}
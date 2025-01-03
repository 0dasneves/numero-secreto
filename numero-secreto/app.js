//var numJaSorteados = [1,2,3,4,5,6,7,8,9,10]
let numJaSorteados = [];
let numLimite = 100;
let numSecreto = numAleatorio();
let tentavias = 1;

// let titulo = document.querySelector(`h1`);
// titulo.innerHTML = `Jogo do Numero Secreto`;

// let paragrafo = document.querySelector(`p`);
// paragrafo.innerHTML =  `Escolha um numero entre 1 e 10`;

function exibirTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
//  responsiveVoice.speak(texto, `Brazilian Portuguese Female`, {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exibirMsgInicial();

function exibirMsgInicial() {
    exibirTela(`h1`,`Jogo do numero secreto`);
    exibirTela(`p`,`Escolha um numero de 1 a 10`);    
}

function verificarChute() {
    let chute = document.querySelector(`input`).value;

    if (chute == numSecreto) {
       exibirTela(`h1`, `Acertou!`); 
       let palavraTentativa = tentavias > 1 ? `tentativas`: `tentativa`;
       let msgTentativas = `Voce descobriu o numero secreto, com ${tentavias} ${palavraTentativa}!`;
       exibirTela(`p`, msgTentativas);
       document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else {
        if (chute > numSecreto) {
            exibirTela(`p`, `O numero secreto e menor`);
        } else {
            exibirTela(`p`, `O numero secreto e maior`);
        }
        tentavias++;
        limparCampo();
    }
}

function numAleatorio() {
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantidadeDeElementosNalista = numJaSorteados.length;

    if (quantidadeDeElementosNalista == numLimite) {
        numJaSorteados = [];
    }
    if (numJaSorteados.includes(numEscolhido)) {
        return numAleatorio();
    } else {
        numJaSorteados.push(numEscolhido);
        console.log(numJaSorteados);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector(`input`);
    chute.value = ``;
}

function reiniciarJogo() {
    numSecreto = numAleatorio();
    limparCampo();
    tentavias = 1;
    exibirMsgInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`,true);
}
const senhaInput = document.getElementById("senha");
const tamanhoInput = document.getElementById("tamanho");
const tamanhoValor = document.getElementById("tamanhoValor");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const textoForca = document.getElementById("textoForca");
const nivel = document.getElementById("nivel");

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const sims = "!@#$%&*()-_=+[]{}<>?";

tamanhoInput.addEventListener("input", () => {
    tamanhoValor.textContent = tamanhoInput.value;
});

function numeroSeguro(max){
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function gerarSenha(){

    let caracteres = "";

    if(maiusculas.checked) caracteres += letrasMaiusculas;
    if(minusculas.checked) caracteres += letrasMinusculas;
    if(numeros.checked) caracteres += nums;
    if(simbolos.checked) caracteres += sims;

    if(caracteres.length === 0){
        alert("Selecione ao menos uma opção.");
        return;
    }

    let senha = "";

    for(let i=0;i<tamanhoInput.value;i++){
        senha += caracteres[numeroSeguro(caracteres.length)];
    }

    senhaInput.value = senha;
    avaliarForca(senha);
}

function avaliarForca(senha){

    let score = 0;

    if(senha.length >= 12) score++;
    if(senha.length >= 16) score++;
    if(/[A-Z]/.test(senha)) score++;
    if(/[a-z]/.test(senha)) score++;
    if(/[0-9]/.test(senha)) score++;
    if(/[^A-Za-z0-9]/.test(senha)) score++;

    if(score <= 2){
        textoForca.textContent = "Força: Fraca";
        nivel.style.width = "30%";
        nivel.style.background = "#ef4444";
    }
    else if(score <= 4){
        textoForca.textContent = "Força: Média";
        nivel.style.width = "70%";
        nivel.style.background = "#f59e0b";
    }
    else{
        textoForca.textContent = "Força: Forte";
        nivel.style.width = "100%";
        nivel.style.background = "#22c55e";
    }
}

document.getElementById("copiar").addEventListener("click", async () => {
    await navigator.clipboard.writeText(senhaInput.value);
    alert("Senha copiada!");
});

document.getElementById("gerar").addEventListener("click", gerarSenha);

gerarSenha();

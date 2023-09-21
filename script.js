//criando classe tempo
class Tempo {

    //setando segundos e minutos
    constructor(minutos,segundos) {
        this.minutos = Number(minutos);
        this.segundos = Number(segundos);
    }

    //metodo para exibir o tempo atualizado na tela
    exibeTempo(){
        var minutos = document.querySelector(".minutos");
        var segundos = document.querySelector(".segundos");
        if (this.minutos >= 0 && this.minutos <= 9){
            minutos.textContent="0" + String(this.minutos);
        } else {
            minutos.textContent=String(this.minutos);
        }
        if (this.segundos >= 0 && this.segundos <= 9){
            segundos.textContent="0" + String(this.segundos);
        } else {
            segundos.textContent =String(this.segundos);
        }
    }

    //metodo para subtrair um segundo do tempo atual 
    alteraTempo() {
        if(this.minutos === 0 && this.segundos===0){
            return false;
        } else {
            this.segundos--;
            if(this.segundos < 0 && this.minutos >= 0) {
                this.segundos = 59;
                this.minutos--;
                this.exibeTempo();
            } else {
                this.exibeTempo(); 
            }
            return true;
        }     
    }

    //metodo para adicionar minutos no tempo total 
    adicionarMinutos(minutos) {
        this.minutos = Math.round(minutos);
        this.exibeTempo();
    }
}

//instanciando Tempo, setando variaveis
const contador = new Tempo(20,0);
contador.exibeTempo();
const inicio = document.querySelector(".iniciar");
const fim = document.querySelector(".fim");
let executouPrimeira = false;

//evento de click no botão inicio
inicio.addEventListener("click", () => {

    if(!executouPrimeira){
        //inicia a contagem
        const timer = setInterval(() => {
            //se o tempo chegar a zero, o metodo ALTERA TEMPO retrona false 
            if(contador.alteraTempo() === false) {
                clearInterval(timer);
                let campoAlteraTempo = document.querySelector(".campoAlteraTempo").value;
                contador.adicionarMinutos(Number(campoAlteraTempo));
                contador.exibeTempo();
            }
        },"1000");
        executouPrimeira = true;
   
        //adiciona evento de cancelar pausar a contagem no botao Pausar
        fim.addEventListener("click", () => {
            clearInterval(timer);
            executouPrimeira = false;
        });

        //pega o valor do campo input como o novo valor da contagem
        const confirmaAlt = document.querySelector(".confirmaAlt");
        confirmaAlt.addEventListener("click", () => {
            let campoAlteraTempo = document.querySelector(".campoAlteraTempo").value;
            contador.adicionarMinutos(Number(campoAlteraTempo)); 
            clearInterval(timer);
            contador.segundos = 0;
            contador.exibeTempo();
            executouPrimeira = false;
        });
    }

})

//pega o valor do campo input como o novo valor da contagem, mesmo nos casos em que o usuário não clica em iniciar
const confirmaAlt = document.querySelector(".confirmaAlt");
confirmaAlt.addEventListener("click", () => {
    let campoAlteraTempo = document.querySelector(".campoAlteraTempo").value;
    contador.adicionarMinutos(Number(campoAlteraTempo)); 
});


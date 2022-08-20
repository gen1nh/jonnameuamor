confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "7/12": titulo = "06 de Dezembro de 2021"; mensagem = "<p>Esse foi o dia que nos conhecemos! Ou pelo menos, o dia que nos conhecemos já sabendo que dali pra frente poderiamos ter alguma coisa juntos.</p><p>Foi bem rápido, começamos a conversar o dia todo, mas já foi o suficiente para eu entender naquele momento que você era diferente, e que todo o tempo que eu dedicava em escrever minhas mensanges pra você, estavam valendo a pena. Eu quis de verdade, a partir desse dia, te conhecer mesmo que eu estivesse morrendo de medo.</p><p>E eu estava certo, você é incrível!</p>";break;
            case "12/12": titulo = "12 de Dezembro de 2021"; mensagem = "<p>Foi a primeira vez que eu fui na porta da sua casa.<br>Você estava linda, com aquele cabelo enorme e lindo.</p><p>Sentamos em sua calçada e a todo momento eu ainda não conseguia acreditar que estava ali com você, pois foi um feito enorme seu, em me tirar de casa... você estava incrível e aquele momento foi mágico pra mim, confesso que fiquei com um pouco de medo, mas logo após conversarmos, eu me senti extremamente confortável!</p>";break;
            case "16/12": titulo = "16 de Dezembro de 2021"; mensagem = "<p>Foi quando eu decidi a pedir pra você me ensinar a instalar o minecraft para podermos jogarmos via radmin, nesse dia passamos várias horas só para tentarmos conectar o radmin, no final era apenas um problema simples envolvendo o firewall, mas logo após consertamos, jogamos o resto da noite toda, até de madrugada.</p>";break;
            case "20/12": titulo = "20 de Dezembro de 2021"; mensagem = "<p> Repetimos o mesmo processo da semana anterior. Você me convenceu novamente a ir na sua casa, mas dessa vez com o intuito de algo a mais, por conta de uma aposta proposital para conserguimos o nosso primeiro beijo, o beijo, o ínicio. Na calçada, ao redos do seu irmão e amigos, em um momento repentino, acabamos que dando nosso primeiro beijo.</p>";break;
            case "4/2": titulo = "04 de Fevereiro de 2022"; mensagem = "<p>Essa foi a vez em que começamos a criar a nossa rotina de sair para a praça no meio da semana, falar nisso, que saudades. E nesse dia você estava linda, como todos os outros. Com um cropped e um short jeans, sem mencionar aquele lindo cabelão enorme.</p>";break;
            case "7/2": titulo = "7 de Fevereiro de 2022"; mensagem = "<p>A minha ideia de nos vermos mais alguma vez na semana foi ótima!</p><p>Foi uma tarde sensacional com você. Sentamos nos banco da praça e ficamos por ali até anoitecer, conversando, brincando e rindo. Me dá uma ansiedade muito grande em pensar que podemos fazer isso de novo tantas e tantas vezes ainda...</p>";break;
            case "12/2": titulo = "12 de Fevereiro de 2022"; mensagem = "<p>Acho que esse dia foi um pequeno marco no nosso relacionamento, pois antes saíamos para ficar por aí a sós, mas dessa vez o combinado foi de nos encontramos e ficar na sua casa, sem sairmos. Parece algo bobo, mas isso pra mim é muito significado, isso demonstra que você me queria ali, e que já não importava mais que seu irmão estivesse por lá ou não. Esse dia me senti muito bem estando com você.</p>";break;
            case "21/2": titulo = "21 de Fevererio de 2022"; mensagem = "<p>Ai ai... o que dizer desse dia? Acho que foi tão intenso e sensacional, que reciprocamente eu nem precisaria escrever mais nada aqui, você saberia exatamente o momento único que tivemos juntos.</p><p>Nesse dia, foi o exato dia em que pedi sua mão oficialmente, eu confesso que estava muito nervoso, mas, decidido e no final das contas, voltamos para sua casa e deitamos no chão da sua garagem e começamos a obeservar as estrelas no céu, e eu ao olhar para o lado, me deparei com os brilhos dos seus olhos, que brilhava mais que uma estrela.</p>";break;
            case "13/6": titulo = "13 de Junho de 2021"; mensagem = "<p>p</p>";break;
            case "19/6": titulo = "19 de Junho de 2021"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong></strong></p></section>";break;
            case "final": titulo = "21 de Agosto de 2022"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}
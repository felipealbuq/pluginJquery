(function($){
    $.fn.temporizador = function(opcoes){
        const opcoes_finais = $.extend({
            mensagem:'Em breve!',
            nova_mensagem:'Bem vindo!',
            horario:'23:59:59'
        },opcoes)
        
        const hora_dezena = $('<span class="digito">').html('0')
        const hora_unidade = $('<span class="digito">').html('0')
        const minuto_dezena = $('<span class ="digito">').html('0')
        const minuto_unidade = $('<span class="digito">').html('0')
        const segundo_dezena = $('<span class="digito">').html('0')
        const segundo_unidade = $('<span class="digito">').html('0')

        const separador_hora = $('<span class="separador">').html(':')
        const separador_minuto = $('<span class="separador">').html(':')
        const mensagem = $('<div class="mensagem">').html(opcoes_finais.mensagem)
        const nova_mensagem = $('<div class="nova_mensagem">').html(opcoes_finais.nova_mensagem)

        $(this).addClass('temporizador')
        $(this).append(hora_dezena,hora_unidade,separador_hora,minuto_dezena,minuto_unidade,
            separador_minuto,segundo_dezena,segundo_unidade,mensagem)
        
        const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/)
        const horario_alvo = regex.exec(opcoes_finais.horario)
        
        let temporizador = setInterval(()=>{
            const agora =  new Date()
            const alvo = new Date()
            alvo.setHours(horario_alvo[1])
            alvo.setMinutes(horario_alvo[2])
            alvo.setSeconds(horario_alvo[3])

            const difrenca_em_mili = alvo.getTime() - agora.getTime()
            if(difrenca_em_mili>=0){
                const diferenca = regex.exec(new Date(difrenca_em_mili).toISOString())
                //console.log(diferenca)

                hora_dezena.html(diferenca[1][0])
                hora_unidade.html(diferenca[1][1])
                minuto_dezena.html(diferenca[2][0])
                minuto_unidade.html(diferenca[2][1])
                segundo_dezena.html(diferenca[3][0])
                segundo_unidade.html(diferenca[3][1])
            }else{
                clearInterval(temporizador)
                //$('.mensagem').remove()   
                //$(this).append(nova_mensagem)
                $('.mensagem').hide(500)
                $(this).append(nova_mensagem)
                $('.nova_mensagem').fadeOut(0)
                $('.nova_mensagem').fadeIn(1000)
            }
            //$(this).append(nova_mensagem)
        },1000)
      
        return this
    }
})(jQuery)
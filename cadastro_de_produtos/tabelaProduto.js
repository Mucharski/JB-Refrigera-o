$(document).ready(function () {

    $("#btCadastrar").click(function () {
        var id = Math.random() * (50000 - 1) + 1; // gera um id aleatório entre 1 e 50000
        var nome = $("#inNome").val();
        var produto = $("#inProduto").val();
        var entrada = $("#inEntrada").val();
        var descricao = $("#inDescricao").val();

        // todos atributos da página e seus valores já estão sendo pegos

        if (nome == "" || (produto == "" || (entrada == "" || (descricao == "")))) {
            $("#algoErrado").text("* Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;

        } else {
            $("#algoErrado").text("Cadastrado com sucesso!").css({ 'color': 'green', 'opacity': '1.0', 'font-size': '14px' });

        } // verificação caso algum dado esteja incorreto

        // criação da coluna

        const coluna = document.createElement("tr"); // cria a linha inteira

        $("#tabelaProduto").append(coluna); // apensa a linha criada ao id "aqui"

        var id1 = document.createElement("td"); // cria a linha para o id
        id1.innerHTML = id.toFixed(0); // escreve o id randomico gerado na variavel id
        $(coluna).append(id1) // apensa o id à coluna

        const linha = document.createElement("td"); // cria uma coluna
        linha.innerHTML = nome // coluna coloca o nome
        $(coluna).append(linha); // apensa a coluna do nome a linha criada

        const linha2 = document.createElement("td");
        linha2.innerHTML = produto
        $(coluna).append(linha2);

        const linha3 = document.createElement("td");
        linha3.innerHTML = entrada
        $(coluna).append(linha3);

        const linha4 = document.createElement("td"); // mesmo raciocinio dos comentarios acima
        linha4.innerHTML = descricao
        $(coluna).append(linha4);

        const linha5 = document.createElement("td"); // essa td é criada especialmente para o botão
        const botao = document.createElement("button"); // aqui cria o botão
        botao.className = "btn btn-danger" // aqui é a classe do botão para ele ficar vermelho (bootstrap)
        botao.innerHTML = "Finalizado &#10007;" // aqui o texto que ficará dentro dele
        botao.onclick = function () {

            var certeza = confirm("Tem certeza que deseja finalizar o serviço?")
            if (certeza === true) {
                $(this).parent().parent().remove();
            } else {
                return;
            }
        }
        
        const botao2 = document.createElement("button");  // aqui cria o botão da impressão
        botao2.className = "btn btn-primary ml-2"
        botao2.innerHTML = "&#9993;"
        botao2.onclick = function () {
            var impressao = new jsPDF()

            impressao.setFontSize(20)
            impressao.text("ID: " + id.toFixed(0)
                + "\nNome: " + nome + "\nProduto: " + produto + "\nData de Entrada: " + entrada, 10, 10)
            impressao.save("imprimirID.pdf")

        }

        $(linha5).append(botao); // apensando o botão a nova td
        $(linha5).append(botao2);
        $(coluna).append(linha5); // apensando a nova linha a coluna

        $(this).attr("disabled", true);
        setTimeout(function () {
            $("#btCadastrar").removeAttr("disabled");
        }, 4000);

    }); // fim dessa função

    $("#btSair").click(function(){
        window.location.href = "file:///F:/Desenvolvimento_github/pagina_inicial/início/index.html"
    })
}); // sempre escrever acima desses simbolos, eles são do document.ready

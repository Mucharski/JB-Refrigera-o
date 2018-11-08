$(document).ready(function () {

    $("#btCadastrarC").click(function () {

        var nome = $("#inNome").val();
        var servicoS = $("#inServico").val();
        var produto = $("#inProduto").val();
        var orcamento = $("#inOrcamento").val();
        var OS = Math.random() * (50000 - 1) + 1;

        // todos atributos da página e seus valores já estão sendo pegos

        if (nome == "" || (servicoS == "" || (produto == "" || (orcamento == "")))) {
            $("#algoErrado").text("* Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;

        } else {
            $("#algoErrado").text("Cadastrado com sucesso!").css({ 'color': 'green', 'opacity': '1.0', 'font-size': '14px' });

        } // verificação caso algum dado esteja incorreto

        // criação da coluna

        const coluna = document.createElement("tr"); // cria a linha inteira

        $("#tabelaOrcamento").append(coluna); // apensa a linha criada ao id tabelaCliente

        const linha = document.createElement("td"); // cria uma coluna
        linha.innerHTML = nome // coluna coloca o nome
        $(coluna).append(linha); // apensa a coluna do nome a linha criada

        const linha2 = document.createElement("td");
        linha2.innerHTML = servicoS
        $(coluna).append(linha2);

        const linha3 = document.createElement("td");
        linha3.innerHTML = produto
        $(coluna).append(linha3);

        const linha4 = document.createElement("td"); // mesmo raciocinio dos comentarios acima
        linha4.innerHTML = orcamento
        $(coluna).append(linha4);

        const linhaExtra = document.createElement("td")
        linhaExtra.innerHTML = OS.toFixed(0)
        $(coluna).append(linhaExtra)

        const linha5 = document.createElement("td"); // essa td é criada especialmente para o botão
        const botao = document.createElement("button"); // aqui cria o botão
        botao.className = "btn btn-danger" // aqui é a classe do botão para ele ficar vermelho (bootstrap)
        botao.innerHTML = "Excluir &#10007;" // aqui o texto que ficará dentro dele
        botao.onclick = function () {

            var certeza = confirm("Tem certeza que deseja excluir o serviço?")
            if (certeza === true) {
                $(this).parent().parent().remove();
            } else {
                return;
            }
        }

        $(linha5).append(botao); // apensando o botão a nova td
        $(coluna).append(linha5); // apensando a nova linha a coluna

        $(this).attr("disabled", true);
        setTimeout(function () {
            $("#btCadastrarC").removeAttr("disabled");
        }, 4000);

    }); // fim dessa função

    $("#btSair").click(function () {
        window.location.href = "../index.html"
    })
});
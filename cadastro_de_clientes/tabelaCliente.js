$(document).ready(function () {

    $("#btCadastrarC").click(function () {
        var nome = $("#inNome").val();
        var CPF = $("#inCPF").val();
        var telefone = $("#inTelefone").val();
        var email = $("#inEmail").val();
        var endereco = $("#inEndereco").val();
        var numeroCasa = $("#inNumero").val();

        // todos atributos da página e seus valores já estão sendo pegos

        if (nome == "" || (CPF == "" || (telefone == "" || (email == "")))) {
            $("#algoErrado").text("* Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;

        } else {
            $("#algoErrado").text("Cadastrado com sucesso!").css({ 'color': 'green', 'opacity': '1.0', 'font-size': '14px' });

        } // verificação caso algum dado esteja incorreto

        // criação da coluna

        const coluna = document.createElement("tr"); // cria a linha inteira

        $("#tabelaCliente").append(coluna); // apensa a linha criada ao id tabelaCliente

        const linha = document.createElement("td"); // cria uma coluna
        linha.innerHTML = nome // coluna coloca o nome
        $(coluna).append(linha); // apensa a coluna do nome a linha criada

        const linha2 = document.createElement("td");
        linha2.innerHTML = CPF
        $(coluna).append(linha2);

        const linha3 = document.createElement("td");
        linha3.innerHTML = telefone
        $(coluna).append(linha3);

        const linha4 = document.createElement("td"); // mesmo raciocinio dos comentarios acima
        linha4.innerHTML = email
        $(coluna).append(linha4);

        const linhaExtra = document.createElement("td")
        linhaExtra.innerHTML = endereco + " nº: " + numeroCasa
        $(coluna).append(linhaExtra)

        const linha5 = document.createElement("td"); // essa td é criada especialmente para o botão
        const botao = document.createElement("button"); // aqui cria o botão
        botao.className = "btn btn-danger" // aqui é a classe do botão para ele ficar vermelho (bootstrap)
        botao.innerHTML = "Excluir &#10007;" // aqui o texto que ficará dentro dele
        botao.onclick = function () {

            var certeza = confirm("Tem certeza que deseja excluir o cadastro?")
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

    $("#btSair").click(function(){
        window.location.href = "../index.html"
    })
});
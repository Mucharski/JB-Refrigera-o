$(function () {
    var operacao = "A"; //"A"=Adição; "E"=Edição
    var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

    // Caso não haja conteúdo, iniciamos um vetor vazio
    if (tbClientes == null)
        tbClientes = [];

    tbClientes = tbClientes.map(c => JSON.parse(c));
    Listar(tbClientes);

    $("#btCadastrarC").on("click", function () {
        if ($("#inNome").val() === "" || ($("#inCPF").val() === "" || ($("#inTelefone").val() === ""))) {
            $("#algoErrado").text("Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;
        } else if (operacao == "A") {
            if (Adicionar(tbClientes))
                alert("Cadastrado com sucesso!")
        }
    });


    $("#tabelaCliente").on("click", "button", function () {
        var certeza = confirm("Tem certeza que deseja excluir?")
        if (certeza === true) {
            Excluir(tbClientes, this.id);
            Listar(tbClientes);
        } else {
            return
        }
    });

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function Adicionar(tbClientes) {

        var cliente = JSON.stringify({
            Id: guid(),
            Nome: $("#inNome").val(),
            CPF: $("#inCPF").val(),
            Telefone: $("#inTelefone").val(),
            Email: $("#inEmail").val(),
            Endereço: $("#inEndereco").val(),
            Numero: $("#inNumero").val()
        });
        tbClientes.push(cliente);
        console.log("tbClientes - " + tbClientes);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        return true;
    }

    function Excluir(tbClientes, id) {
        var indice_selecionado = tbClientes
            .findIndex(c => c.Id === id);

        if (indice_selecionado === -1)
            return;

        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Cadastro excluído");
    }

    function Listar(tbClientes) {
        $("#tabelaCliente").html(
            "<thead>" +
            "   <tr>" +
            "   <th>Nome</th>" +
            "   <th>CPF</th>" +
            "   <th>Telefone</th>" +
            "   <th>Email</th>" +
            "   <th>Endereço</th>" +
            "   <th>Opções</th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tbClientes) {
            var cli = tbClientes[i];
            $("#tabelaCliente tbody").append("<tr>");
            $("#tabelaCliente tbody").append("<td>" + cli.Nome + "</td>");
            $("#tabelaCliente tbody").append("<td>" + cli.CPF + "</td>");
            $("#tabelaCliente tbody").append("<td>" + cli.Telefone + "</td>");
            $("#tabelaCliente tbody").append("<td>" + cli.Email + "</td>");
            $("#tabelaCliente tbody").append("<td>" + cli.Endereço + " nº " + cli.Numero + "</td>");
            $("#tabelaCliente tbody").append("<td><button type='button' class='btn btn-danger' id='" + cli.Id + "' >Excluir</button></td>");
            $("#tabelaCliente tbody").append("</tr>");
        }
    }

    $(".recarregar").click(function () {
        location.reload();
    })

    $(document).keypress(function (e) {
        if (e.which == 13) $("#btCadastrarC").click();
    });

    $("#btSair").click(function(){
        window.location.href = "https://mucharski.github.io/JB-Refrigera-o/"
})

});







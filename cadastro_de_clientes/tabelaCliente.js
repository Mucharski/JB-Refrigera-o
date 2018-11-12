$(function () {
    var operacao = "A"; //"A"=Adição; "E"=Edição
    var indice_selecionado = -1; //Índice do item selecionado na lista
    var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

    if (tbClientes == null) { // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];
    }

    $("#btCadastrarC").on("click", function () {
        if (operacao == "A") {
            return Adicionar(tbClientes);
        } 
    });

    Listar(tbClientes);

    $("#tabelaCliente").on("click", "#btnExcluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir(tbClientes, indice_selecionado);
        Listar(tbClientes);
    });
});

function Adicionar(tbClientes) {

    var cliente = JSON.stringify({
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

function Excluir(tbClientes, indice_selecionado) {
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
        var cli = JSON.parse(tbClientes[i]);
        $("#tabelaCliente tbody").append("<tr>");
        $("#tabelaCliente tbody").append("<td>" + cli.Nome + "</td>");
        $("#tabelaCliente tbody").append("<td>" + cli.CPF + "</td>");
        $("#tabelaCliente tbody").append("<td>" + cli.Telefone + "</td>");
        $("#tabelaCliente tbody").append("<td>" + cli.Email + "</td>");
        $("#tabelaCliente tbody").append("<td>" + cli.Endereço + " nº " + cli.Numero + "</td>");
        $("#tabelaCliente tbody").append("<td><button type='button' class='btn btn-danger' id='btnExcluir'>Excluir</button></td>");
        $("#tabelaCliente tbody").append("</tr>");
    }
}

$(".recarregar").click(function () {
    location.reload();
})







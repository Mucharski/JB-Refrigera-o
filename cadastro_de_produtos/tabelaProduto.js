$(function () {
    var operacao = "A"; //"A"=Adição; "E"=Edição
    var tbProduto = localStorage.getItem("tbProduto");// Recupera os dados armazenados
    tbProduto = JSON.parse(tbProduto); // Converte string para objeto

    // Caso não haja conteúdo, iniciamos um vetor vazio
    if (tbProduto == null)
        tbProduto = [];

    tbProduto = tbProduto.map(c => JSON.parse(c));
    Listar(tbProduto);

    $("#btCadastrar").on("click", function () {
        if ($("#inNome").val() === "" || ($("#inProduto").val() === "" || ($("#inEntrada").val() === ""))) {
            $("#algoErrado").text("Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;
        } else if (operacao == "A") {
            if (Adicionar(tbProduto))
                alert("Cadastrado com sucesso!")
        }
    });


    $("#tabelaProduto").on("click", "button", function () {
        var certeza = confirm("Tem certeza que deseja excluir?")
        if (certeza === true) {
            Excluir(tbProduto, this.id);
            Listar(tbProduto);
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

    function menor(){
        return Math.random () * (50000 - 1) + 1;
    }

    function Adicionar(tbProduto) {

        var produto = JSON.stringify({
            Id: guid(),
            IdMenor: menor(),
            Nome: $("#inNome").val(),
            Produto: $("#inProduto").val(),
            Entrada: $("#inEntrada").val(),
            Descrição: $("#inDescricao").val(),
        });
        tbProduto.push(produto);
        console.log("tbProduto - " + tbProduto);
        localStorage.setItem("tbProduto", JSON.stringify(tbProduto));
        return true;
    }

    function Excluir(tbProduto, id) {
        var indice_selecionado = tbProduto
            .findIndex(c => c.Id === id);

        if (indice_selecionado === -1)
            return;

        tbProduto.splice(indice_selecionado, 1);
        localStorage.setItem("tbProduto", JSON.stringify(tbProduto));
        alert("Cadastro excluído");
    }

    function Listar(tbProduto) {
        $("#tabelaProduto").html(
            "<thead>" +
            "   <tr>" +
            "   <th>ID</th>" +
            "   <th>Nome do Cliente</th>" +
            "   <th>Produto</th>" +
            "   <th>Data de Entrada</th>" +
            "   <th>Problema</th>" +
            "   <th>Opções</th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tbProduto) {
            var cli = tbProduto[i];
            $("#tabelaProduto tbody").append("<tr>");
            $("#tabelaProduto tbody").append("<td>" + cli.IdMenor.toFixed(0) + "</td>");
            $("#tabelaProduto tbody").append("<td>" + cli.Nome + "</td>");
            $("#tabelaProduto tbody").append("<td>" + cli.Produto + "</td>");
            $("#tabelaProduto tbody").append("<td>" + cli.Entrada + "</td>");
            $("#tabelaProduto tbody").append("<td>" + cli.Descrição + "</td>");
            $("#tabelaProduto tbody").append("<td><button type='button' class='btn btn-danger' id='" + cli.Id + "' >Excluir</button></td>");
            $("#tabelaProduto tbody").append("</tr>");
        }
    }

    $(".recarregar").click(function () {
        location.reload();
    })

    $(document).keypress(function (e) {
        if (e.which == 13) $("#btCadastrar").click();
    });

    $("#btSair").click(function(){
        window.location.href = "https://mucharski.github.io/JB-Refrigera-o/"
})

});
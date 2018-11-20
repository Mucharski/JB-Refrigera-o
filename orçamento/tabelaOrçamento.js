$(function () {
    var operacao = "A"; //"A"=Adição; "E"=Edição
    var tbOrcamento = localStorage.getItem("tbOrcamento");// Recupera os dados armazenados
    tbOrcamento = JSON.parse(tbOrcamento); // Converte string para objeto

    // Caso não haja conteúdo, iniciamos um vetor vazio
    if (tbOrcamento == null)
        tbOrcamento = [];

    // tbOrcamento = tbOrcamento.map(c => JSON.parse(c));
    Listar(tbOrcamento);

    $("#btCadastrarC").on("click", function () {
        if ($("#inNome").val() === "" || ($("#inServico").val() === "" || ($("#inOrcamento").val() === ""))) {
            $("#algoErrado").text("Preencha os campos corretamente").css({ 'color': 'red', 'opacity': '0.5', 'font-size': '12px' });
            return;
        } else if (operacao == "A") {
            if (Adicionar(tbOrcamento))
                alert("Cadastrado com sucesso!")
        }
    });


    $("#tabelaOrcamento").on("click", "button", function () {
        var certeza = confirm("Tem certeza que deseja excluir?")
        if (certeza === true) {
            Excluir(tbOrcamento, this.id);
            Listar(tbOrcamento);
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

    function Adicionar(tbOrcamento) {

        var orcamento = {
            Id: guid(),
            OS: menor(),
            Nome: $("#inNome").val(),
            ServiçoS: $("#inServico").val(),
            Produto: $("#inProduto").val(),
            Orçamento: $("#inOrcamento").val(),
        };
        tbOrcamento.push(orcamento);
        console.log("tbOrcamento - " + tbOrcamento);
        localStorage.setItem("tbOrcamento", JSON.stringify(tbOrcamento));
        return true;
    }

    function Excluir(tbOrcamento, id) {
        var indice_selecionado = tbOrcamento
            .findIndex(c => c.Id === id);

        if (indice_selecionado === -1)
            return;

        tbOrcamento.splice(indice_selecionado, 1);
        localStorage.setItem("tbOrcamento", JSON.stringify(tbOrcamento));
        alert("Cadastro excluído");
    }

    function Listar(tbOrcamento) {
        $("#tabelaOrcamento").html(
            "<thead>" +
            "   <tr>" +
            "   <th>Nome</th>" +
            "   <th>Serviço Solicitado</th>" +
            "   <th>Produto</th>" +
            "   <th>Orçamento</th>" +
            "   <th>OS</th>" +
            "   <th>Opções</th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tbOrcamento) {
            var cli = tbOrcamento[i];
            $("#tabelaOrcamento tbody").append("<tr>");
            $("#tabelaOrcamento tbody").append("<td>" + cli.Nome + "</td>");
            $("#tabelaOrcamento tbody").append("<td>" + cli.ServiçoS + "</td>");
            $("#tabelaOrcamento tbody").append("<td>" + cli.Produto + "</td>");
            $("#tabelaOrcamento tbody").append("<td>" + cli.Orçamento + "</td>");
            $("#tabelaOrcamento tbody").append("<td>" + cli.OS.toFixed(0) + "</td>");
            $("#tabelaOrcamento tbody").append("<td><button type='button' class='btn btn-danger' id='" + cli.Id + "' >Excluir</button></td>");
            $("#tabelaOrcamento tbody").append("</tr>");
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
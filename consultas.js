function formatarData(data) {
  var partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function calcularMediaConsumo(consumos) {
  if (consumos.length === 0) {
    return 0;
  }

  var soma = 0;
  for (var i = 0; i < consumos.length; i++) {
    soma += parseFloat(consumos[i].valor);
  }

  var media = soma / consumos.length;
  return media.toFixed(2);
}

function calcularComparativoConsumo(consumos, index) {
  if (index === 0) {
    return "-";
  }

  var consumoAtual = parseFloat(consumos[index].valor);
  var consumoAnterior = parseFloat(consumos[index - 1].valor);
  var diferenca = consumoAtual - consumoAnterior;

  if (diferenca > 0) {
    return "+" + diferenca.toFixed(2);
  } else if (diferenca < 0) {
    return diferenca.toFixed(2);
  } else {
    return "0.00";
  }
}

function calcularTotalGastos(consumos) {
  var soma = 0;
  for (var i = 0; i < consumos.length; i++) {
    soma += parseFloat(consumos[i].valor);
  }
  return soma.toFixed(2);
}

function filtrarDados(consumos, filtro, busca) {
  return consumos.filter(function(consumo) {
    var valor = consumo[filtro].toLowerCase();
    var termoBusca = busca.toLowerCase();
    return valor.includes(termoBusca);
  });
}

function exibirDados() {
  var dadosArmazenados = localStorage.getItem("consumos");
  var consumos = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

  consumos.sort(function(a, b) {
    var dataA = new Date(a.data);
    var dataB = new Date(b.data);
    return dataA - dataB;
  });

  var campoBusca = document.getElementById("campoBusca").value;
  var filtro = document.getElementById("filtro").value;

  var consumosFiltrados = filtrarDados(consumos, filtro, campoBusca);

  var tabela = "<table><tr><th>Data</th><th>Valor (m³)</th><th>Descrição</th><th>Comparativo</th><th>Ações</th></tr>";

  for (var i = 0; i < consumosFiltrados.length; i++) {
    tabela += "<tr>";
    tabela += "<td>" + formatarData(consumosFiltrados[i].data) + "</td>";
    tabela += "<td>" + consumosFiltrados[i].valor + "</td>";
    tabela += "<td>" + consumosFiltrados[i].descricao + "</td>";
    tabela += "<td>" + calcularComparativoConsumo(consumosFiltrados, i) + "</td>";
    tabela += "<td>";
    tabela += "<button class='delete' onclick='excluirConsumo(" + i + ")'>Excluir</button>";
    tabela += "<button class='edit' onclick='editarConsumo(" + i + ")'>Editar</button>";
    tabela += "</td>";
    tabela += "</tr>";
  }

  var media = calcularMediaConsumo(consumosFiltrados);
  var totalGastos = calcularTotalGastos(consumosFiltrados);

  tabela += "<tr><td colspan='2'>Total Gastos: " + totalGastos + "</td><td colspan='3'>Média: " + media + "</td></tr>";

  tabela += "</table>";

  document.getElementById("dados").innerHTML = tabela;
}

function excluirConsumo(index) {
  var dadosArmazenados = localStorage.getItem("consumos");
  var consumos = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

  consumos.splice(index, 1);

  localStorage.setItem("consumos", JSON.stringify(consumos));

  exibirDados();
}

function editarConsumo(index) {
  var dadosArmazenados = localStorage.getItem("consumos");
  var consumos = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

  var consumoEditado = prompt("Editar valor do consumo:", consumos[index].valor);

  if (consumoEditado !== null) {
    consumos[index].valor = consumoEditado;
    localStorage.setItem("consumos", JSON.stringify(consumos));
  }

  exibirDados();
}

document.getElementById("campoBusca").addEventListener("keyup", exibirDados);
document.getElementById("filtro").addEventListener("change", exibirDados);
document.getElementById("filtrar").addEventListener("click", exibirDados);

exibirDados();

document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();
  cadastrar();
});

function cadastrar() {
  var data = document.getElementById("data").value;
  var valor = document.getElementById("valor").value;
  var descricao = document.getElementById("descricao").value;

  if (parseFloat(valor) <= 0) {
    alert("O valor do consumo deve ser maior que zero.");
    return;
  }

  if (descricao.length === 0) {
    alert("A descrição é obrigatória.");
    return;
  }

  if (descricao.length > 50) {
    alert("A descrição deve ter no máximo 50 caracteres.");
    return;
  }

  var consumo = {
    data: data,
    valor: valor,
    descricao: descricao
  };

  var dadosArmazenados = localStorage.getItem("consumos");
  var consumos = dadosArmazenados ? JSON.parse(dadosArmazenados) : [];

  consumos.push(consumo);

  localStorage.setItem("consumos", JSON.stringify(consumos));

  document.getElementById("formulario").reset();

  alert("Consumo cadastrado com sucesso!");
}

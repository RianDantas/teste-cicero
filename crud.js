let forms = JSON.parse(localStorage.getItem("forms")) || [];

// Renderiza tabela
function renderTable() {
  const tableBody = document.getElementById("formTableBody");
  tableBody.innerHTML = "";

  forms.forEach((form) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${form.id}</td>
      <td>
        <span class="form-link text-primary" style="cursor:pointer;" onclick="editForm(${form.id})">
          ${form.title}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteForm(${form.id})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Criar novo formulário → vai para tela de criação
document.getElementById("createFormBtn").addEventListener("click", () => {
  localStorage.removeItem("currentFormId"); // novo formulário
  window.location.href = "criar-formularios.html";
});

// Editar formulário existente
function editForm(id) {
  localStorage.setItem("currentFormId", id); 
  window.location.href = "criar-formularios.html";
}

// Atualiza localStorage
function saveToStorage() {
  localStorage.setItem("forms", JSON.stringify(forms));
}

// Excluir formulário
function deleteForm(id) {
  forms = forms.filter(f => f.id !== id);
  saveToStorage();
  renderTable();
}

// Carregar ao abrir
renderTable();



let groupCount = 0;
let editingFormId = localStorage.getItem("currentFormId");
let forms = JSON.parse(localStorage.getItem("forms")) || [];

// ---------- Carregar formulário existente (se houver) ----------
if (editingFormId) {
  const formToEdit = forms.find(f => f.id == editingFormId);
  if (formToEdit) {
    document.querySelector(".form-title").innerText = formToEdit.title;

    formToEdit.groups.forEach((g) => {
      createGroup(g.title, g.fields);
    });
  }
}

// ---------- Criar novo grupo ----------
document.getElementById("add-group-btn").addEventListener("click", () => {
  createGroup();
});

// ---------- Salvar formulário ----------
document.getElementById("save-form-btn").addEventListener("click", () => {
  const formTitle = document.querySelector(".form-title").innerText;
  const groups = [];

  document.querySelectorAll("#groups-container .card").forEach((groupEl) => {
    const groupTitle = groupEl.querySelector(".group-title").innerText;
    const fields = [];
    groupEl.querySelectorAll(".fields-container input").forEach((input) => {
      fields.push({ placeholder: input.placeholder, value: input.value });
    });

    groups.push({ title: groupTitle, fields });
  });

  if (editingFormId) {
    // Atualizar existente
    const index = forms.findIndex(f => f.id == editingFormId);
    if (index > -1) {
      forms[index] = { ...forms[index], title: formTitle, groups };
    }
  } else {
    // Criar novo
    const newForm = {
      id: Date.now(),
      title: formTitle,
      groups
    };
    forms.push(newForm);
  }

  localStorage.setItem("forms", JSON.stringify(forms));
  localStorage.removeItem("currentFormId");

  alert("Formulário salvo com sucesso!");
  window.location.href = "crud.html";
});

// ---------- Função para criar grupo ----------
function createGroup(title = `Grupo ${++groupCount}`, fieldsData = []) {
  const group = document.createElement("div");
  group.className = "card border-secondary";
  group.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 contenteditable="true" class="group-title mb-0">${title}</h2>
        <button class="btn btn-sm btn-danger delete-group-btn">Excluir Grupo</button>
      </div>
      <button class="btn btn-outline-primary btn-sm mb-3 add-field-btn">Criar Campo</button>
      <div class="fields-container d-flex flex-column gap-2"></div>
    </div>
  `;

  const fieldsContainer = group.querySelector(".fields-container");

  // Preenche campos existentes (se houver)
  fieldsData.forEach((f) => {
    const field = document.createElement("input");
    field.type = "text";
    field.placeholder = f.placeholder;
    field.value = f.value;
    field.className = "form-control";
    fieldsContainer.appendChild(field);
  });

  // Evento criar campo
  group.querySelector(".add-field-btn").addEventListener("click", () => {
    const field = document.createElement("input");
    field.type = "text";
    field.placeholder = "Digite algo...";
    field.className = "form-control";
    fieldsContainer.appendChild(field);
  });

  // Evento excluir grupo
  group.querySelector(".delete-group-btn").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir este grupo?")) {
      group.remove();
    }
  });

  document.getElementById("groups-container").appendChild(group);
}

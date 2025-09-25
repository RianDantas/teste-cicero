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
document.getElementById("add-group-btn1").addEventListener("click", () => {
  createGroup();
});

// ---------- Salvar formulário ----------
document.getElementById("save-form-btn").addEventListener("click", () => {
  const formTitle = document.querySelector(".form-title").innerText;
  const groups = [];

  document.querySelectorAll("#groups-container .card").forEach((groupEl) => {
    const groupTitle = groupEl.querySelector(".group-title").innerText;
    const fields = [];
    groupEl.querySelectorAll(".fields-container .field-wrapper input").forEach((input) => {
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


function createGroup(title = `Grupo ${++groupCount}`, fieldsData = []) {
  const group = document.createElement("div");
  group.className = "card border-secondary";
  group.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 contenteditable="true" class="group-title mb-0">${title}</h2>
        <button class="btn btn-sm btn-danger delete-group-btn">Excluir Grupo</button>
      </div>
      <button class="btn btn-outline-primary1 btn-sm mb-3 add-field-btn">Criar Campo</button>
      <div class="fields-container d-flex flex-column gap-2"></div>
    </div>
  `;

  const fieldsContainer = group.querySelector(".fields-container");

  // Preenche campos existentes (com botão de excluir)
  fieldsData.forEach((f) => {
    addField(fieldsContainer, f.placeholder, f.value);
  });

  // Evento criar campo
  group.querySelector(".add-field-btn").addEventListener("click", () => {
    addField(fieldsContainer);
  });

  // Evento excluir grupo
  group.querySelector(".delete-group-btn").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir este grupo?")) {
      group.remove();
    }
  });

  document.getElementById("groups-container").appendChild(group);
}

// ---------- Criar campo com botão de excluir ----------
function addField(container, placeholder = "Digite algo...", value = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "field-wrapper d-flex align-items-center gap-2";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.value = value;
  input.className = "form-control";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.innerText = "Excluir";
  deleteBtn.addEventListener("click", () => {
    if (confirm("Deseja excluir este campo?")) {
      wrapper.remove();
    }
  });

  wrapper.appendChild(input);
  wrapper.appendChild(deleteBtn);
  container.appendChild(wrapper);
}

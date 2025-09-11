let groupCount = 0;

document.getElementById("add-group-btn").addEventListener("click", () => {
  groupCount++;
  const group = document.createElement("div");
  group.className = "card border-secondary";
  group.innerHTML = `
    <div class="card-body">
      <h2 contenteditable="true" class="group-title mb-3">Grupo ${groupCount}</h2>
      <button class="btn btn-outline-primary btn-sm mb-3 add-field-btn">Criar Campo</button>
      <div class="fields-container d-flex flex-column gap-2"></div>
    </div>
  `;

  // Evento do botão "Criar Campo"
  group.querySelector(".add-field-btn").addEventListener("click", () => {
    const field = document.createElement("input");
    field.type = "text";
    field.placeholder = "Digite algo...";
    field.className = "form-control";
    group.querySelector(".fields-container").appendChild(field);
  });

  document.getElementById("groups-container").appendChild(group);
});

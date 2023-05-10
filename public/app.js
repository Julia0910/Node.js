document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const newValue = prompt(
      "Введите новое значение",
      event.target.dataset.title
    );

    edit(id, newValue).then(() => {
      event.target.dataset.title = newValue;
      event.target.closest("li").querySelector(".item-content").textContent = newValue;
    });
  }
});

async function edit(id, value) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({title: value}),
  });
}

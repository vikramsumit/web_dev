 async function generateData() {
    const res = await fetch("http://localhost:3000/generate", { method: "POST" });
    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  }

  async function getEmployees() {
    const res = await fetch("http://localhost:3000/employees");
    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  }
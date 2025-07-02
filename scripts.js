const users = [
  { username: "admin", password: "123456" }
];

let quotes = [];

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'dashboard.html';
  } else {
    errorMessage.textContent = 'Usuário ou senha inválidos!';
    errorMessage.classList.remove('hidden');
  }
}

function handleLogout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}

function addQuote(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const price = parseFloat(document.getElementById('price').value);

  quotes.push({ product, price });
  updateQuoteTable();
  document.getElementById('quoteForm').reset();
}

function updateQuoteTable() {
  const quoteTable = document.getElementById('quoteTable');
  quoteTable.innerHTML = '';
  quotes.forEach(quote => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2">${quote.product}</td>
      <td class="border px-4 py-2">R$ ${quote.price.toFixed(2)}</td>
    `;
    quoteTable.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('dashboard.html')) {
    if (!localStorage.getItem('loggedIn')) {
      window.location.href = 'index.html';
    } else {
      updateQuoteTable();
    }
  }
});

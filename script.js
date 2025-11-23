// Simple client-side search and filter
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const focusSelect = document.getElementById('focus');
const resetBtn = document.getElementById('resetFilters');

const allCards = Array.from(document.querySelectorAll('.card'));

function matchesSearch(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const focus = focusSelect.value;

  allCards.forEach(card => {
    const title = card.querySelector('h3').textContent;
    const bodyText = card.textContent.toLowerCase();
    const cardCategory = card.dataset.category;
    const cardFocus = card.dataset.focus.split(' ');

    const searchOk = query === '' || matchesSearch(title, query) || matchesSearch(bodyText, query);
    const categoryOk = category === 'all' || cardCategory === category;
    const focusOk = focus === 'all' || cardFocus.includes(focus);

    card.style.display = (searchOk && categoryOk && focusOk) ? '' : 'none';
  });
}

searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
focusSelect.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  focusSelect.value = 'all';
  applyFilters();
});

// Initial run
applyFilters();
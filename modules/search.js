document.addEventListener('DOMContentLoaded', () => {
	const searchForm = document.getElementById('search_form');
	if (!searchForm) return;

	const input = searchForm.querySelector('.search-form__input');
	const allBooks = Array.from(document.querySelectorAll('.book-card'));

	if (!input || allBooks.length === 0) {
		return
	};

	function normalize(text) {
		return (text || '').toString().toLowerCase().trim();
	}

	function getBookData(card) {
		return {
			title: card.querySelector('.book-title')?.textContent,
			author: card.querySelector('.book-author')?.textContent,
			desc: card.querySelector('.book-desc')?.textContent
		};
	}

	function applyFilter(queryRaw) {
		const query = normalize(queryRaw);
		const hasQuery = query.length > 0;

		allBooks.forEach(card => {
			if (!hasQuery) {
				card.style.display = '';
				return;
			}
			const data = getBookData(card);
			const option = `${data.title} ${data.author} ${data.desc}`.toLowerCase();
			const isMatch = option.includes(query);
			card.style.display = isMatch ? '' : 'none';
		});
	}

	input.addEventListener('input', (event) => {
		applyFilter(event.target.value);
	});
});

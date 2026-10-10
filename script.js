const form = document.getElementById('bookmarkForm');
const nameInput = document.getElementById('bookmarkName');
const urlInput = document.getElementById('bookmarkUrl');
const list = document.getElementById('bookmarkList');
const emptyState = document.getElementById('emptyState');
const clearButton = document.getElementById('clearBookmarks');
const searchInput = document.getElementById('bookmarkSearch');
const bookmarkCount = document.getElementById('bookmarkCount');
const noResults = document.getElementById('noResults');

const defaultBookmarks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' }
];

function loadBookmarks() {
    try {
        const saved = JSON.parse(localStorage.getItem('bookmarks'));
        if (Array.isArray(saved)) {
            return saved.filter((item) =>
                item && typeof item.name === 'string' &&
                typeof item.url === 'string' &&
                /^https?:\/\//i.test(item.url)
            );
        }
    } catch (error) {
        console.warn('Saved bookmarks could not be read; using defaults.', error);
    }
    return defaultBookmarks;
}

let bookmarks = loadBookmarks();

function saveBookmarks() {
    try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Bookmarks could not be saved in this browser.', error);
        alert('Unable to save bookmarks. Check your browser storage settings.');
    }
}

function renderBookmarks() {
    list.innerHTML = '';
    const query = searchInput.value.trim().toLowerCase();
    const filteredBookmarks = bookmarks
        .map((bookmark, index) => ({ bookmark, index }))
        .filter(({ bookmark }) =>
            bookmark.name.toLowerCase().includes(query) || bookmark.url.toLowerCase().includes(query)
        );

    bookmarkCount.textContent = `${bookmarks.length} ${bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}`;
    emptyState.hidden = bookmarks.length > 0;
    noResults.hidden = bookmarks.length === 0 || filteredBookmarks.length > 0;

    filteredBookmarks.forEach(({ bookmark, index }) => {
        const card = document.createElement('article');
        card.className = 'bookmark-card';

        const title = document.createElement('h3');
        title.textContent = bookmark.name;

        const link = document.createElement('a');
        link.href = bookmark.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = bookmark.url;

        const remove = document.createElement('button');
        remove.className = 'remove';
        remove.type = 'button';
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
            bookmarks.splice(index, 1);
            saveBookmarks();
            renderBookmarks();
        });

        card.append(title, link, remove);
        list.appendChild(card);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (!name || !url || !/^https?:\/\//i.test(url)) {
        alert('Enter a name and a valid HTTP or HTTPS URL.');
        return;
    }

    bookmarks.unshift({ name, url });
    saveBookmarks();
    renderBookmarks();
    form.reset();
    nameInput.focus();
});

searchInput.addEventListener('input', renderBookmarks);

clearButton.addEventListener('click', () => {
    if (bookmarks.length === 0) return;
    if (!confirm('Remove all saved bookmarks?')) return;

    bookmarks = [];
    saveBookmarks();
    renderBookmarks();
});

renderBookmarks();

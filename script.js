const form = document.getElementById('bookmarkForm');
const nameInput = document.getElementById('bookmarkName');
const urlInput = document.getElementById('bookmarkUrl');
const list = document.getElementById('bookmarkList');
const emptyState = document.getElementById('emptyState');
const clearButton = document.getElementById('clearBookmarks');
const exportButton = document.getElementById('exportBookmarks');
const searchInput = document.getElementById('bookmarkSearch');
const bookmarkCount = document.getElementById('bookmarkCount');
const noResults = document.getElementById('noResults');

const defaultBookmarks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' }
];

function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value);
        return (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
            Boolean(parsed.hostname);
    } catch {
        return false;
    }
}

function normalizeUrl(value) {
    return new URL(value).href;
}

function loadBookmarks() {
    try {
        const saved = JSON.parse(localStorage.getItem('bookmarks'));
        if (Array.isArray(saved)) {
            return saved.filter((item) =>
                item && typeof item.name === 'string' &&
                item.name.trim().length > 0 &&
                typeof item.url === 'string' &&
                isValidHttpUrl(item.url)
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
    exportButton.disabled = bookmarks.length === 0;

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
        remove.setAttribute('aria-label', `Remove ${bookmark.name}`);
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

    if (!name || !url || !isValidHttpUrl(url)) {
        alert('Enter a name and a valid HTTP or HTTPS URL.');
        return;
    }

    const normalizedUrl = normalizeUrl(url);
    const duplicateExists = bookmarks.some((bookmark) => {
        try {
            return normalizeUrl(bookmark.url) === normalizedUrl;
        } catch {
            return false;
        }
    });

    if (duplicateExists) {
        alert('This URL is already saved in your bookmarks.');
        urlInput.focus();
        return;
    }

    bookmarks.unshift({ name, url: normalizedUrl });
    saveBookmarks();
    renderBookmarks();
    form.reset();
    nameInput.focus();
});

searchInput.addEventListener('input', renderBookmarks);

exportButton.addEventListener('click', () => {
    if (bookmarks.length === 0) return;

    const backup = JSON.stringify(bookmarks, null, 2);
    const file = new Blob([backup], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);

    downloadLink.href = downloadUrl;
    downloadLink.download = `bookmarks-${date}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);
});

clearButton.addEventListener('click', () => {
    if (bookmarks.length === 0) return;
    if (!confirm('Remove all saved bookmarks?')) return;

    bookmarks = [];
    saveBookmarks();
    renderBookmarks();
});

renderBookmarks();

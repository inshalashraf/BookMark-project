# Bookmark Manager

A lightweight bookmark manager built with **HTML, CSS, and JavaScript**. Bookmarks are stored in the browser using `localStorage`, so the list remains available after refreshing the page.

## Features

- Add bookmarks with a name and URL
- Open saved links in a new tab
- Remove individual bookmarks
- Clear the complete bookmark list
- Persistent browser storage with `localStorage`
- Responsive layout for desktop and mobile
- Accessible form labels and live updates

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage API

## Project Structure

```text
BookMark-project/
├── index.html              # Main application page
├── bookmarkmanager.html    # Original bookmark-list page
├── script.js               # Bookmark logic and persistence
├── style.css               # Responsive styling
└── README.md
```

## Run Locally

No installation or build tools are required.

1. Clone the repository.
2. Open `index.html` in a browser.
3. Add and manage bookmarks directly in the page.

For the best local development experience, use a simple static server such as the VS Code Live Server extension.

## Data & Privacy

Bookmarks are stored only in the browser's local storage for the current site. The application does not use a backend database or send the saved bookmark list to a server.

## Deployment

This is a static website and can be hosted on GitHub Pages or any static web-hosting service.

## Future Improvements

- Bookmark categories and tags
- Search and filtering
- Import/export bookmarks as JSON
- Drag-and-drop ordering
- Favicon previews
## Testing Notes

Check adding a valid URL, opening a saved bookmark, deleting one item, clearing all items, refreshing the page, and verifying that saved bookmarks persist through local storage.

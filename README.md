# Bookmark Manager

A lightweight bookmark manager built with **HTML, CSS, and JavaScript**. Bookmarks are stored in the browser using `localStorage`, so the list remains available after refreshing the page.

## Features

- Add bookmarks with a name and a validated HTTP or HTTPS URL
- Prevent duplicate URLs using normalized URL comparison
- Open saved links safely in a new tab
- Search bookmarks by name or URL with live result counts
- Export saved bookmarks to a dated JSON backup file
- Remove individual bookmarks or clear the complete list
- Persistent browser storage with defensive handling of invalid saved data
- Responsive layout for desktop and mobile
- Accessible form labels, keyboard focus indicators, and live updates

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage API
- Blob and URL APIs for client-side JSON export

## Project Structure

```text
BookMark-project/
├── index.html              # Main application page
├── bookmarkmanager.html    # Original bookmark-list page
├── script.js               # Bookmark logic, validation, search, export, and persistence
├── style.css               # Responsive styling
└── README.md
```

## Run Locally

No installation or build tools are required.

1. Clone the repository.
2. Open `index.html` in a browser.
3. Add, search, export, and manage bookmarks directly in the page.

For the best local development experience, use a simple static server such as the VS Code Live Server extension.

## Data & Privacy

Bookmarks are stored in the browser's local storage for the current site. The application does not use a backend database or send the saved bookmark list to a server. Use **Export JSON** to download a backup of saved links. Clearing browser site data may remove bookmarks, so keep backups somewhere safe.

## Deployment

This is a static website and can be hosted on GitHub Pages or any static web-hosting service.

## Future Improvements

- Import bookmarks from a JSON backup
- Bookmark categories and tags
- Drag-and-drop ordering
- Favicon previews

## Testing Notes

Check adding valid HTTP and HTTPS URLs, rejecting malformed or unsupported URLs, preventing duplicate links, searching by name and URL, exporting a JSON backup, opening a saved bookmark, deleting one item, clearing all items, refreshing the page, and verifying that saved bookmarks persist through local storage.

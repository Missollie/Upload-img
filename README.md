Project: SmartUploader
This project is a client-side file uploader application with two main pages: a file upload interface and a gallery page to view and manage uploaded files. The entire application runs in the browser, using localStorage to persist file information between pages.
Multiple Upload Methods: Supports both traditional file selection via a button and modern drag-and-drop functionality.
File Validation: Automatically validates files on the client-side for allowed types (JPG, PNG, GIF) and size (max 5MB).
Dynamic UI: The interface provides immediate feedback, including updating a "Current Upload" link, enabling a copy-to-clipboard button, and changing tab styles based on application state.
Keyboard Shortcuts: Implements intuitive navigation using Escape and F5 keys.
How It Works
A user lands on the index.html page, which displays a dynamic hero image and a button to enter the application.
Clicking the button navigates them to form/upload.html.
On the upload page, the user can select files. The upload.js script validates these files and saves their data to localStorage. The UI updates to show a link for the most recently selected file.
The user can then navigate to form/images.html to see a list of all uploaded files.
On the images page, images.js reads from localStorage to display the file list. The user can delete files, which updates both localStorage and the displayed list.
Keyboard shortcuts are available throughout the app for quick navigation.
Scripts Breakdown
The project's logic is handled by three main JavaScript files:
1. index.js - Main Page Logic
This script controls the functionality of the main landing page (index.html). Its purpose is to create an engaging entry point and guide the user to the uploader.
Random Hero Image: On each page load, the script randomly selects one of several hero images and makes it visible, creating a varied visual experience.
Navigation: Adds a click listener to the main call-to-action button that redirects the user to the file upload page.
2. upload.js - File Upload & Management
This is the core script for the upload page (upload.html). It handles all aspects of file selection, validation, and storage.
File Selection: Manages file selection from both a button click and drag-and-drop.
Validation: Checks files against predefined type and size rules, alerting the user if they are invalid.
Local Storage: Converts valid files to a DataURL and saves them as objects in localStorage under the key uploadedImages.
UI Feedback & Copy:
Updates an input field with a mock URL of the last selected file.
Enables a "COPY" button that copies the URL to the user's clipboard and provides visual feedback ("COPIED!").
Dynamic Styling: Changes the color of the "Upload" and "Images" tabs to reflect whether files are currently stored.
Navigation: Handles clicks on the "Images" tab to redirect to the gallery page.
Keyboard Shortcuts: Pressing Escape or F5 redirects the user back to the main index.html page.
3. images.js - Image Gallery Logic
This script powers the images.html page, which acts as a gallery for the uploaded files.
Dynamic List Rendering: Reads the uploadedImages array from localStorage and dynamically builds an HTML list to display the files. It shows the file name, an icon, a placeholder URL, and a delete button for each.
Empty State: If no files are found in storage, it displays a user-friendly message.
File Deletion: Handles clicks on the "Delete" button by removing the file from localStorage and instantly re-rendering the list.
Keyboard Shortcuts: Pressing Escape or F5 redirects the user back to the upload.html page, providing a seamless workflow.
Robust Logic: The script safely checks if navigation elements exist on the page before trying to interact with them, preventing errors on minimal HTML layouts.

# React Native News App

This is a React Native news app that fetches and displays articles from an API. It supports offline caching, bookmarks, pull-to-refresh functionality, and adapts to dark and light themes. The app uses React Navigation for screen transitions and Context API for theming.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Folder Structure](#folder-structure)  
- [Setup Instructions](#setup-instructions)  
- [Assumptions / Known Issues](#assumptions--known-issues)  
- [Improvements Planned](#improvements-planned)  
- [Learn More](#learn-more)  

---

## Project Overview

This project is a React Native news app built with the following key features:

- Fetches news articles from a remote API  
- Offline caching of articles using AsyncStorage  
- Bookmarks for saving favorite articles  
- Pull-to-refresh to update news feed  
- Dark and light theme support using Context API and system preferences  
- Navigation between screens using React Navigation  

---

## Folder Structure

/src
/screens/components # Reusable UI components
/screens # Screen components (Home, Detailed, Splash, etc.)
/services # API calls and data fetching logic
/context # Context providers (e.g., ThemeProvider)
/utils # Utility functions/helpers
/App.tsx # Root component with navigation setup

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```
# Install dependencies
npm install
# or
yarn install

# Start Metro bundler

npm start
# or
yarn start
# Run the app Android

npm run android
# or
yarn android

# Run the app iOS

npm run ios
# or
yarn ios

# Assumptions / Known Issues
* The news API is assumed to be reliable; error handling for API failures is basic.
* Offline caching uses AsyncStorage, which may have limitations on storage size.
* Theme changes are automatic based on system preferences; no manual toggle yet.
* Some platform-specific quirks might exist with dependencies.


# Improvements Planned
* Add manual theme toggle to override system theme.
* Implement pagination/infinite scrolling for better performance.
* Switch offline storage to a more robust database (Realm/SQLite).
* Increase test coverage for integration and UI testing.
* Add localization/multi-language support.
* Optimize image loading and caching strategies.
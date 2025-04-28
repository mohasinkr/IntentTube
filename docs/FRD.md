# IntentTube - Functional Requirements Document (FRD)

## Introduction
### Project Purpose
This web application aims to empower users to take control of their YouTube viewing habits by reducing unplanned and excessive consumption. The core idea is to create a focused environment where users can only access a curated selection of YouTube channels or private playlists they have explicitly chosen or created. By stripping away YouTube’s recommendation algorithms and infinite scrolling, the app encourages intentional viewing, helping users avoid mindless browsing and stay aligned with their personal goals or interests.

### Project Context
YouTube’s default experience often leads users down rabbit holes of unrelated content via auto-playing videos and personalized recommendations. This app counters that by acting as a gatekeeper, leveraging the YouTube Data API to fetch only user-specified content. It’s designed for individuals who want to use YouTube as a tool for learning, entertainment, or specific hobbies without the distractions of the broader platform.

### Key Features Overview
The application includes the following core features:
- **Google Sign-In**: Users authenticate with their Google account to access their YouTube data securely.
- **Channels Listing Page**: Displays a user-curated list of YouTube channels as interactive cards.
- **Channel Details Page**: Provides a deeper view into a channel’s videos and playlists.
- **Playlist Viewing**: Allows users to explore and watch videos from their own YouTube playlists or channel-specific playlists.
- **Video Playback**: Offers a distraction-free video player in a popup format.
- **General Playlist Page**: Presents the user’s YouTube playlists in an organized, accessible layout.

### Feature Flow
The application follows a logical user journey:
1. **Login**: Users sign in with their Google account on the login page.
2. **Channels Listing**: Post-login, users land on the Channels Listing Page, where they see their selected channels or can add new ones from their YouTube subscriptions.
3. **Channel Management**: Users add channels via a popup or remove them using a trash bin icon on channel cards.
4. **Channel Exploration**: Clicking a channel card takes users to the Channel Details Page, where they can switch between videos and playlists tabs.
5. **Video Watching**: Selecting a video opens a popup player with the default YouTube interface, keeping the experience simple and focused.
6. **Playlist Navigation**: Users can view playlist contents and play videos from either the Channel Details Page or the General Playlist Page, which lists all their YouTube playlists.
7. **Logout**: Users can log out via the sidebar, ending their session securely.

### Tech Stack
- **Frontend**: Vite (build tool), ReactJS with TypeScript (UI framework), Shadcn UI (component library)
- **Backend**: ExpressJS with TypeScript (REST API server)
- **Database**: MongoDB (for storing user preferences like selected channels)
- **Authentication**: Google OAuth 2.0
- **External API**: YouTube Data API (for fetching channel, video, and playlist data)

### Development Notes
- **Pagination**: Required for all list views (channels, videos, playlists) to manage large datasets.
- **URL State Management**: Frontend states (e.g., current page, selected tab) must be reflected in the URL.
- **Protected Routes**: Restrict access to authenticated users only.
- **YouTube API Rate Limits**: Optimize API calls and handle limits gracefully.
- **Token Security**: Securely manage Google access and refresh tokens.
- **Future Enhancements**: Plan for a search bar to be added later.

---

## 1. Authentication Module
Handles user authentication and session management, ensuring secure access to YouTube data.

### 1.1 Google Sign-In
- **Purpose**: Authenticate users via their Google account to access YouTube data.
- **Details**:
  - Displays a "Sign in with Google" button on the login page.
  - Uses OAuth 2.0 to redirect users to Google’s authentication page.
  - Requests scopes for user profile, email, and YouTube data access.
  - Backend exchanges the authorization code for access and refresh tokens.
  - Redirects to the Channels Listing Page upon success.

### 1.2 Logout
- **Purpose**: End the user’s session securely.
- **Details**:
  - Accessible via a logout button in the sidebar.
  - Clears tokens from storage and revokes the session.
  - Redirects to the login page.

### 1.3 Token Management
- **Purpose**: Securely handle access and refresh tokens.
- **Details**:
  - Stores tokens in HTTP-only cookies or encrypted local storage.
  - Refreshes tokens automatically before expiration.
  - Gracefully handles refresh failures by prompting re-login.

---

## 2. User Interface Module
Covers all frontend components and their interactions, providing a cohesive user experience.

### 2.1 Main Sidebar
- **Purpose**: Provide consistent navigation across the app.
- **Details**:
  - Fixed sidebar with buttons for Channels Listing, General Playlist, and Logout.
  - Built with Shadcn UI for a clean, modern look.

### 2.2 Channels Listing Page
- **Purpose**: Display and manage the user’s selected YouTube channels.
- **Details**:
  - Shows channel cards with thumbnails and names.
  - Includes an "Add Channel" button and pagination controls.
  - Clicking a card navigates to the Channel Details Page.
  - URL reflects pagination state (e.g., `/channels?page=2`).

### 2.3 Add Channel Popup
- **Purpose**: Allow users to select and add subscribed channels.
- **Details**:
  - Triggered by the "Add Channel" button.
  - Features a multi-select dropdown of subscribed channels.
  - Selected channels appear as removable "pills."
  - Submit button adds channels to the user’s list.

### 2.4 Channel Card Interactions
- **Purpose**: Enable channel removal from the list.
- **Details**:
  - Hovering over a card shows a trash bin icon.
  - Clicking the icon opens a confirmation popup ("Are you sure?").
  - Confirming removes the channel from the list.

### 2.5 Channel Details Page
- **Purpose**: Display a channel’s videos and playlists.
- **Details**:
  - Features two tabs: "Videos" (list of videos) and "Playlists" (list of playlists).
  - Both tabs include pagination.
  - URL tracks tab and page (e.g., `/channel/{id}?tab=playlists&page=1`).

### 2.6 Video Playback
- **Purpose**: Play videos in a focused, distraction-free manner.
- **Details**:
  - Opens a popup with the default YouTube player when a video is clicked.
  - Supports full-screen mode within the player.

### 2.7 Playlist Details
- **Purpose**: Show videos within a selected playlist.
- **Details**:
  - Lists videos with pagination.
  - Clicking a video opens the popup player.
  - URL tracks playlist and page (e.g., `/playlist/{id}?page=1`).

### 2.8 General Playlist Page
- **Purpose**: Provide an overview of the user’s YouTube playlists.
- **Details**:
  - Displays playlists with thumbnails and names.
  - Includes pagination.
  - Clicking a playlist navigates to Playlist Details.

---

## 3. API Module
Defines backend REST API endpoints to support frontend functionality.

### 3.1 Authentication API
- **Endpoints**:
  - `GET /auth/google`: Initiates Google Sign-In.
  - `GET /auth/google/callback`: Handles callback, stores tokens.

### 3.2 Channels API
- **Endpoints**:
  - `GET /channels/subscribed?page={page}&limit={limit}`: Fetches subscribed channels.
  - `POST /channels/add`: Adds channels to the user’s list (body: `{ channelIds: [] }`).
  - `DELETE /channels/remove`: Removes a channel (body: `{ channelId: string }`).

### 3.3 Videos API
- **Endpoints**:
  - `GET /channels/{id}/videos?page={page}&limit={limit}`: Fetches channel videos.
  - `GET /playlists/{id}/videos?page={page}&limit={limit}`: Fetches playlist videos.

### 3.4 Playlists API
- **Endpoints**:
  - `GET /playlists?page={page}&limit={limit}`: Fetches user’s playlists.
  - `GET /channels/{id}/playlists?page={page}&limit={limit}`: Fetches channel playlists.

### 3.5 Pagination
- **Details**:
  - All list endpoints support `page` and `limit` query parameters.
  - Responses include `{ totalPages, currentPage, items }`.

---

## 4. State Management Module
Ensures frontend states are manageable and secure.

### 4.1 URL State Management
- **Purpose**: Enable bookmarking and sharing via URL.
- **Details**:
  - Uses query parameters to track states (e.g., `?tab=videos&page=2`).
  - Managed with React Router.

### 4.2 Protected Routes
- **Purpose**: Restrict access to authenticated users.
- **Details**:
  - Checks authentication status before rendering pages.
  - Redirects unauthenticated users to the login page.

---

## 5. Security Module
Addresses security concerns for tokens and API usage.

### 5.1 Token Security
- **Purpose**: Protect access and refresh tokens.
- **Details**:
  - Uses HTTP-only cookies or encrypted storage.
  - Implements automatic token refresh.

### 5.2 API Rate Limiting
- **Purpose**: Manage YouTube API quotas.
- **Details**:
  - Caches responses to reduce API calls.
  - Uses retry logic with backoff for rate limit errors.

---

## 6. Future Enhancements
### 6.1 Search Functionality
- **Purpose**: Allow searching across channels, videos, and playlists.
- **Details**:
  - Planned integration with YouTube Data API’s search endpoint.
  - Filters results to user-selected content.

---

## Conclusion
This FRD provides a detailed roadmap for building an application that helps users manage their YouTube consumption intentionally. Its modular structure supports development and future scalability, including AI integration, while ensuring clarity for all stakeholders.
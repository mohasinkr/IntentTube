# IntentTube Monorepo Folder Structure and Coding Standards

## Introduction
IntentTube is a web application designed to reduce unplanned YouTube consumption by allowing users to access only selected channels or private playlists. The project is structured as a monorepo with three main folders: `frontend` (ReactJS with TypeScript and Vite), `backend` (ExpressJS with TypeScript and MongoDB), and `docs` (project documentation). This document outlines the folder structure and coding standards for both frontend and backend, ensuring consistency, maintainability, and scalability. It also reviews the user’s proposed backend structure and provides a recommended frontend structure based on research.

## Monorepo Structure
The monorepo is organized as follows:
- **`frontend`**: Contains the ReactJS application code.
- **`backend`**: Contains the ExpressJS REST API code.
- **`docs`**: Stores project-related documentation, such as the Functional Requirements Document (FRD) and architecture overviews.
- **`README.md`**: Root-level overview of the monorepo, including setup instructions and project goals.

Each subfolder (`frontend`, `backend`) includes its own `README.md` for specific setup and development guidelines.

## Backend Folder Structure and Coding Standards

### Folder Structure
The backend follows a feature-based modular structure, aligning with best practices for ExpressJS with TypeScript. The structure separates concerns and ensures scalability.

| **Folder**         | **Purpose**                                                                 | **Naming Convention**                     |
|--------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| `configs`          | Configuration files for environment variables, middleware, and server settings | Descriptive names (e.g., `cors.config.ts`) |
| `errors`           | Custom error-handling logic (e.g., API errors)                               | Singular, descriptive (e.g., `api-error.ts`) |
| `features`         | Modularized features, each with its own folder                               | Singular, lowercase (e.g., `authentication`) |
| `middlewares`      | Middleware functions used across the application                             | Descriptive (e.g., `error-handler.middleware.ts`) |
| `models`           | Database schema definitions for MongoDB                                      | PascalCase (e.g., `User.model.ts`)        |
| `repositories`     | Database interaction logic (e.g., queries)                                   | Singular, descriptive (e.g., `user.repository.ts`) |
| `routers`          | High-level route definitions, grouping feature-specific routes               | Versioned (e.g., `v1.router.ts`)          |
| `servers`          | Server initialization logic                                                 | Descriptive (e.g., `express.server.ts`)   |
| `types`            | Custom TypeScript type definitions                                           | PascalCase (e.g., `RequestWithUser.ts`)   |
| `utils`            | Reusable utility functions                                                  | Snake_case with `.util.ts` (e.g., `date.util.ts`) |
| `tests` (Suggested)| Unit and integration tests                                                  | Descriptive (e.g., `user.controller.test.ts`) |

#### Feature Folder Structure
Each feature folder (e.g., `users`, `authentication`, `channels`) is self-contained, including:
- **`<feature-name>.controller.ts`**: Handles HTTP requests and business logic.
- **`<feature-name>.router.ts`**: Defines routes for the feature.
- **`<feature-name>.validator.ts`**: Validates request payloads.
- **`<feature-name>.service.ts`**: Integrates with third-party services (e.g., YouTube Data API).
- **`<feature-name>.trigger.ts` (optional)**: Handles event triggers for event-driven features.

Example for the `users` feature:
```
backend/src/features/users/
├── user.controller.ts
├── user.router.ts
├── user.service.ts
├── user.validator.ts
├── user.trigger.ts
```

### Coding Standards
The backend adheres to strict coding standards to ensure consistency and readability.

#### Naming Conventions
| **Element**       | **Convention**         | **Example**                     |
|-------------------|------------------------|---------------------------------|
| Folders           | Plural, lowercase      | `features`, `configs`           |
| Files             | Lowercase, dot-separated | `user.controller.ts`            |
| Variables         | camelCase              | `userName`, `nameList`          |
| Classes           | PascalCase             | `UserController`, `UserService` |
| Functions         | camelCase              | `getUserById`, `validateInput`  |
| Constants         | UPPER_SNAKE_CASE       | `DEFAULT_TIMEOUT`, `MAX_RETRIES` |
| Interfaces        | PascalCase with "I" prefix | `IUser`, `IUserRepository`      |

#### Best Practices
- **Feature Modularity**: Each feature folder is self-contained, encapsulating all related logic.
- **Error Handling**: Centralize error handling in `middlewares/error-handler.middleware.ts`.
- **Environment Configuration**: Store environment variables in `configs/env.config.ts`.
- **Code Reusability**: Use `utils` for reusable functions and `services` for complex logic.
- **Route Versioning**: Group routes in `routers/v1.router.ts` for API versioning.
- **Validation**: Validate all request payloads using validators before processing.
- **Documentation**: Document API endpoints using comments or tools like Swagger.
- **Testing**: Include unit and integration tests in a `tests` folder (suggested addition).
- **Linting**: Use ESLint or TSLint to enforce coding standards.

### Review of Proposed Backend Structure
The proposed backend structure is robust and aligns with modern best practices, particularly the feature-based modular approach recommended by sources like [Folder Structure for NodeJS & ExpressJS project](https://mr-alien.medium.com/folder-structure-for-nodejs-expressjs-project-56be9ec35548) and [A future-proof Node.js express file/folder structure](https://www.codemzy.com/blog/nodejs-file-folder-structure). The separation of concerns (e.g., `repositories` for database logic, `services` for third-party integrations) enhances maintainability. The inclusion of optional `trigger.ts` files supports potential event-driven features, such as notifications or webhooks.

**Suggestions**:
- **Add a `tests` Folder**: Include a `tests` folder at the top level or within each feature folder for unit and integration tests, using a framework like Jest. This ensures reliability and is a common practice noted in [Organizing your Express.js project structure for better productivity](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/).
- **Consider Subfolders for Large Features**: If a feature grows complex, consider organizing files into subfolders (e.g., `controllers`, `services`) within the feature folder, as suggested in [Project structure for an Express REST API](https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way).
- **Type Management**: Ensure types in the `types` folder are not duplicated. Feature-specific types can be defined within the feature folder if not reused.

## Frontend Folder Structure and Coding Standards

### Folder Structure
The frontend uses Vite, ReactJS with TypeScript, and Shadcn UI. A feature-based structure is proposed to mirror the backend, ensuring consistency across the monorepo. This structure is informed by best practices from sources like [React Folder Structure in 5 Steps](https://www.robinwieruch.de/react-folder-structure/) and [Vite template with opinionated folder structure](https://github.com/jonybekov/vite-template).

| **Folder**         | **Purpose**                                                                 | **Naming Convention**                     |
|--------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| `app`              | Main application component and routing logic                                | Descriptive (e.g., `App.tsx`, `router.tsx`) |
| `features`         | Feature-specific components, hooks, and services                            | Singular, lowercase (e.g., `auth`, `channels`) |
| `shared`           | Reusable components, hooks, and utilities                                   | Descriptive (e.g., `components/Button.tsx`) |
| `assets`           | Static assets (e.g., images, fonts)                                         | Descriptive (e.g., `logo.png`)            |
| `types`            | Custom TypeScript type definitions                                          | PascalCase (e.g., `ChannelProps.ts`)      |
| `tests` (Suggested)| Unit and integration tests                                                 | Descriptive (e.g., `ChannelsList.test.tsx`) |

#### Feature Folder Structure
Each feature folder (e.g., `auth`, `channels`, `playlists`) contains:
- **Components**: React components specific to the feature (e.g., `ChannelsList.tsx`).
- **Hooks**: Custom hooks for feature-specific logic (e.g., `channels.hooks.ts`).
- **Services**: API call logic (e.g., `channels.service.ts`).

Example for the `channels` feature:
```
frontend/src/features/channels/
├── ChannelsList.tsx
├── ChannelCard.tsx
├── AddChannelPopup.tsx
├── channels.service.ts
├── channels.hooks.ts
```

### Coding Standards
The frontend follows standard React and TypeScript conventions, tailored for Shadcn UI.

#### Naming Conventions
| **Element**       | **Convention**         | **Example**                     |
|-------------------|------------------------|---------------------------------|
| Folders           | Singular, lowercase    | `channels`, `shared`            |
| Files             | PascalCase for components, camelCase for others | `ChannelsList.tsx`, `channels.service.ts` |
| Components        | PascalCase             | `ChannelCard`, `AddChannelPopup` |
| Variables         | camelCase              | `channelName`, `handleClick`    |
| Functions/Hooks   | camelCase              | `useChannels`, `fetchChannels`  |
| Types/Interfaces  | PascalCase             | `ChannelProps`, `IChannel`      |

#### Best Practices
- **Functional Components**: Use functional components with hooks.
- **Colocated Styles**: Use CSS modules or Tailwind CSS (if integrated with Shadcn UI) colocated with components.
- **Type Safety**: Define props and state with TypeScript interfaces or types.
- **Shadcn UI**: Follow Shadcn UI’s component usage guidelines for consistency.
- **State Management**: Use React’s built-in state or context for simplicity; consider React Query for API data.
- **Testing**: Include unit tests for components and hooks using Jest or React Testing Library.
- **Linting**: Use ESLint with React and TypeScript plugins to enforce standards.
- **Routing**: Use React Router for URL state management, reflecting frontend states in the URL.

## Monorepo Considerations
- **Documentation**:
  - The `docs` folder centralizes project documentation, including:
    - `FRD.md`: Functional Requirements Document.
    - `architecture.md`: High-level architecture overview.
    - `api.md`: API endpoint documentation.
  - Each subfolder (`frontend`, `backend`) includes a `README.md` with setup instructions.
- **Build Processes**:
  - Manage frontend and backend builds separately using their respective `package.json` files.
  - Use Vite for the frontend and `ts-node` or `tsc` for the backend.
- **Testing**:
  - Use Jest for both frontend and backend testing.
  - Include test suites in `tests` folders to ensure reliability.
- **Monorepo Tools**:
  - For a simple monorepo with two packages, tools like Lerna or Nx are unnecessary. Use npm or Yarn workspaces if shared dependencies arise.

## Conclusion
The IntentTube monorepo is well-structured with `frontend`, `backend`, and `docs` folders. The backend’s feature-based approach is robust, with minor suggestions for testing and type management. The proposed frontend structure mirrors this approach, ensuring consistency and scalability. Adhering to the outlined coding standards will maintain code quality across both frontend and backend, supporting the project’s goal of reducing unplanned YouTube consumption.
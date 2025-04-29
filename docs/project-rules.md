# IntentTube Project Rules

## General Project Information
- Project Name: IntentTube
- Purpose: Reduce unplanned YouTube consumption by allowing users to access only selected channels or private playlists.
- Tech Stack:
  - Frontend: Vite, ReactJS with TypeScript, Shadcn UI
  - Backend: ExpressJS with TypeScript, MongoDB
- Authentication: Google Sign-In using OAuth 2.0

## Project Documentation
- Functional Requirements: @file docs/FRD.md
- Folder Structure and Coding Standards: @file docs/folder-structure-and-coding-standard.md

## Coding Standards
- Follow the folder structure and naming conventions as defined in the project documentation.
- Use TypeScript for all code.
- Adhere to naming conventions:
  - Variables: camelCase
  - Classes: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Interfaces: PascalCase with "I" prefix (e.g., IUser)
- For backend:
  - Organize features in `features` folder, each with controller, router, service, validator, etc.
  - Example: `features/users/user.controller.ts`
- For frontend:
  - Use feature folders under `src/features`, e.g., `src/features/channels`
  - Components in PascalCase, e.g., `ChannelsList.tsx`
- Use Shadcn UI components where possible.

## Security Guidelines
- Do not hardcode sensitive information; use environment variables for secrets.
- In backend:
  - Use `helmet` middleware for Express.
  - Implement rate limiting using `express-rate-limit`.
  - Use Mongoose for MongoDB interactions to prevent injection attacks.
- In frontend:
  - Ensure user inputs are handled safely to prevent XSS attacks.
  - Use React's built-in features to avoid direct DOM manipulation.

## Testing Requirements
- Before implementing a new module or feature, generate a set of test cases that define the expected behavior and edge cases.
- Follow test-driven development (TDD) practices: write tests first, then implement the code to pass those tests.
- For backend:
  - Use Jest for unit and integration tests.
  - Test controllers, services, and repositories.
- For frontend:
  - Use React Testing Library or Jest for component tests.
  - Test user interactions and component rendering.

## Commit Message Conventions
- When generating commit messages, use the conventional commits format:
  - feat: for new features
  - fix: for bug fixes
  - chore: for maintenance tasks
  - docs: for documentation changes
  - style: for code style changes
  - refactor: for code refactoring
  - test: for adding or modifying tests
- Include a descriptive message, e.g., "feat: implement user authentication"
- Reference relevant issues or tickets if applicable.
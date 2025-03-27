# Dog Search App - Developer Setup

Welcome to the Dog Search App project! This document will guide you through the setup process for local development.

## Project Overview

This React application allows users to search for dogs based on various criteria, including breed, age, and name. It includes features for favoriting dogs and displaying match results.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** (Recommended version 14 or higher) [https://nodejs.org/](https://nodejs.org/)
* **npm (Node Package Manager) or Yarn:** (Usually installed with Node.js)
* **Git:** (If you plan to use version control) [https://git-scm.com/](https://git-scm.com/)

## Getting Started

1.  **Clone the Repository (if applicable):**

    If you are working with a Git repository, clone it to your local machine using GitHub CLI:

    ```
    gh repo clone himaChhag/dog-adoption
    cd fetch-dog-adoption
    ```

2.  **Install Dependencies:**

    Navigate to the project directory and install the required npm packages:

    ```bash
    npm install
    ```

    or if you're using Yarn:

    ```bash
    yarn install
    ```

3.  **Start the Development Server:**

    Run the following command to start the development server:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

    This will launch the app in your default browser at `http://localhost:3000`. The app will automatically reload whenever you make changes to the code.

## Available Scripts

* **`npm start` or `yarn start`:** Runs the app in development mode.
* **`npm run build` or `yarn build`:** Builds the app for production into the `build` folder.

## Code Structure

* `src/`: Contains the React application's source code.
    * `components/`: React components.
    * `api.ts`: API interaction files.
    * `types.ts`: TypeScript type definitions.
    * `contexts/`: React context files.
    * `Util/`: utility components.
* `public/`: Contains static assets.
* `build/`: (Generated) Contains the production build.

## API Usage

* The application interacts with an external API.
* See the `src/api.ts` file for details on API endpoints and data handling.
* If you need to make changes to the API calls, ensure that the api that is being called is running, and that you have the correct endpoints.

Happy coding!
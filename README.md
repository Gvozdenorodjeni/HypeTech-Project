# HypeTech-Project

# NOTE:15.5.2021

Version 1.0 should be used for interview purposes and it is located on master branch.
All other versions were used for exercise only.
Following features were added later:

- Some files migrated to TypeScript.
- Small style issues fixed.

## _CRUD APP_

[Github »](https://github.com/Gvozdenorodjeni/HypeTech-Project)
[Demo »](https://gifted-clarke-494efa.netlify.app)

[//]: # "ABOUT THE PROJECT"

## About The Project

CRUD app with https://jsonplaceholder.typicode.com API, where you can login, logout, create, read, update and delete users.

### Built With

- [material ui](https://material-ui.com/)
- [JavaScript](https://www.javascript.com/)
- [React](https://reactjs.org/)

[//]: # "GETTING STARTED"

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Gvozdenorodjeni/HypeTech-Project
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running locally

```sh
npm start
```

[//]: # "CONTRIBUTING"

## Project details

- [x] User register
- [x] User login
- [x] Create new user
- [x] Read users
- [x] Update a user
- [x] Delete a user
- [x] Light/dark mode
- [x] Loading states
- [x] Material UI
- [ ] TypeScript
- [ ] Cypress tests

## Project limitations

- A demo user-register method was used where user email is saved in local storage.
- Login is saved only locally so leaving the page will cause user to logout.
- I've assumed that method is only a demo step, so some functionality is made to allow for permanent login, namely, visiting a page for single user is causing only one user to be loaded in context, to prevent loading all users at the same time needlessly.

[//]: # "CONTACT"

## Contact

Author: Vladimir Gvozdenovic
Email: vladagvozdenovic1991@gmail.com

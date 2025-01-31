# Playwright API Testing

This repository contains a **Playwright API testing** setup, covering basic API tests, authentication, and token handling.

## Features
- **Basic API Tests**: Covers `GET`, `POST`, `PUT`, `DELETE` requests.
- **Authentication & Tokens**: Handles login, token generation, and secured API calls.
- **Custom Headers**: Supports headers Dynamic Data and request modifications.
- **Assertions & Validations**: Validates status codes, response structures, and data.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-api-tests.git
   cd playwright-api-tests
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests
Run all tests using:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/api/auth.test.js
```

## Contributing
Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License
This project is licensed under the MIT License.

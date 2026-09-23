# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# Temporary Quotes API

Start the local API in a terminal:

```bash
npm run backend
```

It listens on port `3001`. In Postman, use `http://localhost:3001` as the base URL.
Quotes are stored in memory and reset to the starter list whenever the server restarts.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | API status and endpoint list |
| GET | `/api/quotes` | List all quotes |
| GET | `/api/quotes/random` | Get one random quote |
| GET | `/api/quotes/:id` | Get a quote by ID |
| POST | `/api/quotes` | Add a quote |
| DELETE | `/api/quotes/:id` | Delete a quote |

For `POST /api/quotes`, choose **Body → raw → JSON** and send:

```json
{
  "content": "The journey of a thousand miles begins with one step.",
  "author": "Lao Tzu"
}
```

The server binds to `0.0.0.0` so another device on the same network can reach it. Use your computer's local network IP instead of `localhost` on that device, and ensure the firewall permits port `3001`.

## Student portal demo authentication

The same server includes a temporary student sign-in API. Start it with `npm run backend` before using the app.

Demo credentials:

- Email: `student@campus.edu`
- Password: `Student123!`

Authentication endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/auth/login` | Exchange demo credentials for a 30-minute Bearer token |
| GET | `/api/auth/me` | Return the protected student profile |
| POST | `/api/auth/logout` | Revoke the current token |

Use `Authorization: Bearer <token>` on the profile and logout requests. Login expects JSON with `email` and `password`. Tokens are held in server memory and become invalid if the backend restarts. The app stores native tokens with Expo SecureStore and checks the profile endpoint when it launches; an expired or revoked token returns the app to sign-in. On web, the demo uses `sessionStorage`, which is not secure storage and lasts only for the browser tab session.

During Expo Go development, the app uses the Metro host as the API host. For a standalone build or a setup where the server is on another host, set `EXPO_PUBLIC_API_URL` to the server's reachable address, for example `http://192.168.1.20:3001`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Backend

This app uses `Firebase Realtime Database` for backend.<br>
You need to set `REACT_APP_FIREBASE_DB_URL` and `REACT_APP_FIREBASE_API_KEY` config variables in `.env` file before build. 


## Deployment

You can deploy app to `Firebase` or use `Docker`

### Firebase
- Build app with `npm run build`
- Install Firebase CLI `curl -sL firebase.tools | bash`
- Login `firebase login`
- Local deployment check `firebase serve`
- Deploy `firebase deploy`


### DockerFile

- Build app with `npm run build`
- Build image and run container
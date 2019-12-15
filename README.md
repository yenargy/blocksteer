![](https://github.com/nitinrgupta/blocksteer/blob/master/assets/repo_banner.png)

A super simple app which can be used to view the latest blocks or transactions occuring in the Ethereum blockchain. 
This was built by bootstrapping `create-react-app` and using `aragon-ui` for the basic theming and UI components. It uses web3.js injected by Metamask to fetch all the blockchain related stuff.

NOTE: Currently, the app fetches only the latest 16 blocks and latest 20 transaction at any time.

## Future Roadmap
[ ] Pagination - Ability to view more than 16 blocks or 20 transaction at a time <br />
[ ] Search - Ability to search any block or a hash to view the relavant information

## Development
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Refer [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


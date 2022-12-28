<!-- @format -->

# 🚀 Daraja Mpesa API example with Express

To run this Project locally, make sure your are running a `Node Version` greater
than or equal to `18.0.0`. If you have using a Node version `<18.0.0` that is
Node version less than `v18.0.0`, you have to change the `engines.node` value in
the `package.json` file of this Project after your clone this repository. You
will also need to change `targets.node` value in the `babel.config.js` file of
this project to a value that follows the [semver-spec](https://semver.org/)
spec, eg `v16.0.8`

-   ### Using an older Node version (that is less than v18.0.0 which current LTS release)

    -   #### Update your `package.json` file

        ```js
          "engines": {
            "node": "^16.0.0"
          }
        ```

    -   #### Use an older version as your babel transpilation target, that is any syntax you use in your code that is not available in your Node target will be `transpiled` to code syntax that works in the specified Node version. Make sure to specify the `MINOR` version `vMAJOR.MINOR.PATCH` eg `16.0`.

        ```js
        targets: 'node 16.0'; //select 16.0.x release of Node
        ```

-   ### Installing a specific Node version using.

    [nvm](https://github.com/nvm-sh/nvm/). You can change `v18.12.1` to the
    specific Node version you want, but it must be greater than 18. You can use
    `nvm ls-remote` command to check the Available Node versions

    ```sh
     nvm install v18.12.1 or nvm install --lts or nvm install node
    ```

-   ### Clone this repository

    ```sh
     git clone --branch main https://github.com/ndejoma/mpesa-api-express-example.git
    ```

-   ### Install the necessary dependencies using pnpm

    ```sh
     pnpm install
    ```

-   ### Also make sure to create `.env.production.local` and `.env.development.local` in the root of your project. This will be used to add the your environment variables using the [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) webpack plugin based on the `NODE_ENV`. Make sure to check the `env.example` file in the root of this Project on what environment variables are required to run this Project, and add them to them to the `.env.production.local` and `.env.development.local` files your have created

    ```sh
     touch .env.production.local .env.development.local
    ```

-   ### If you don't have pnpm installed, you install it using `npm` which comes with all Node installations by default

    ```sh
     npm install --global pnpm
    ```

-   ### After installing all the necessary dependencies and devDependencies, open your terminal and run. To run in development

    -   #### Terminal one, which builds the app using `webpack --watch` command

        ```sh
         export NODE_ENV=development && pnpm run dev-build
        ```

    -   Terminal two, which run `nodemon build/bundle.js` every time the
        `webpack` bundles the code into `build/bundle.js`

        ```sh
          export NODE_ENV=development && pnpm run dev
        ```

-   ### To run the app and build it for production

    -   #### Emit the production bundle using `webpack` at `build/bundle.js`

        ```sh
          export NODE_ENV=production && pnpm run build
        ```

    -   #### To run the production bundle emitted above in the same shell prompt.

        ```sh
         pnpm run start
        ```

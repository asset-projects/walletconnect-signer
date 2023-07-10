# WalletConnect-Signer

This will be a minimal app that introduces WalletConnect to a wallet created with react-native.

# Test Dapps

You can use the test decentralized applications (dapps) to verify the functionality of your WalletConnect integration. These dapps are available at:

https://react-app.walletconnect.com/

To test, follow these steps:

1. Open the test dapp in a web browser.
2. Initiate a connection from the dapp.
3. Scan the QR code provided by the dapp using your wallet app with WalletConnect integration.
4. Accept the connection request in your wallet app.
5. Interact with the dapp via your wallet app to confirm the functionality of your WalletConnect integration.

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 0: Setup Environment Variables

This project utilizes .env for environment variables. To create the .env file, run the following command

```bash
 cp .env.template .env
```

Now, you need to obtain the WALLET_CONNECT_PROJECT_ID from the [WalletConnect Dashboard](https://walletconnect.com/) and write it into the .env file under the same key.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## References

- [WalletConnect's React Native Installation Guide](https://docs.walletconnect.com/2.0/reactnative/web3wallet/Installation)
- [WalletConnect's React Native Examples on GitHub](https://github.com/WalletConnect/react-native-examples)

## License

[MIT](./LICENSE)

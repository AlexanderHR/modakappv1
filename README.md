# ModakApp

[▶️ Watch Demo Video](https://vimeo.com/1048926840)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- Xcode (for iOS development)
- CocoaPods
- Expo CLI (`npm install -g expo-cli`)
- Git

## Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/AlexanderHR/modakappv1.git
cd modakappv1
```

2. Install dependencies:

```bash
npm install
```

3. Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

4. Set up environment:

```bash
npm run prepare
```

## Running the App

To run the app in iOS simulator:

```bash
npx expo run:ios
```

### Additional Run Options

- Start Expo development server:

```bash
npx expo start
```

- Run on Android:

```bash
npx expo run:android
```

## Troubleshooting

If you encounter any issues:

1. Clear Metro cache:

```bash
npx expo start --clear
```

2. Reinstall pods:

```bash
cd ios
pod deintegrate
pod install
cd ..
```

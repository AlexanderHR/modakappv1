# ModakApp

[▶️ Watch Demo Video](https://vimeo.com/1048926840?share=copy)
or [Download Video](https://wetransfer.com/downloads/fd1b5066a6875eeda1ebd2bfd41fee7520250121172754/4c42f36e3895148f502d1220ea957e0a20250121172754/84d051?t_exp=1737739674&t_lsid=b6db29cc-57d5-4657-9b60-dff0fb39dc5a&t_network=email&t_rid=Z29vZ2xlLW9hdXRoMnwxMTU3NTY3OTM0OTYxNzI5MzMzOTQ%3D)

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

# Supplementary Screens

1. Empty List:
<img width="296" alt="Screenshot 2025-01-21 at 09 59 55" src="https://github.com/user-attachments/assets/5730a87d-921f-442d-9881-68e19d613373" />

2. Empty Product:
<img width="300" alt="Screenshot 2025-01-21 at 09 56 37" src="https://github.com/user-attachments/assets/7ae019c8-4780-47f7-be6c-eed3fdd6f098" />

3. Error Boundary: (The text in red is meant to be exported and integrated with an API, such as Sentry or Firebase.)
<img width="300" alt="Screenshot 2025-01-21 at 09 57 20" src="https://github.com/user-attachments/assets/261395d3-ed3e-4a2c-abfa-483cb92063a1" />



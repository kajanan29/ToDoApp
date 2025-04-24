# 📝 React Native To-Do List App 

## 📌 Description

This is a *To-Do List mobile application* built using *React Native CLI* and *TypeScript*. It allows users to:

- Add, edit, and delete tasks
- if user finished a task he can delete it
- edit the tasks when need to make changes
- Share tasks (Copy, WhatsApp, Facebook, Telegram, VK)
- Persist data using local storage (AsyncStorage)
- Follow a custom dark theme and Material UI styling

🔗 *The design strictly follows this Figma prototype*:  
👉 [Figma Design Link](https://www.figma.com/design/0voUh3g2fDdGMbKNibqygj/To-Do-List--Community)

📹 *Demo Video*:  
👉 [Click to watch demo video]([https://drive.google.com/file/d/1tzqXubo2hrCb6AH57kkYFayAChJk9lx5/view?usp=sharing](https://drive.google.com/file/d/1et28FdSS0QcBMxWSqoezdbUpTLrUZJyH/view?usp=sharing)) 


## ⚙ Setup Instructions

### 1️⃣ Clone the repository

bash
git clone https://github.com/your-username/react-native-todo.git
cd react-native-todo


### 2️⃣ Install dependencies

bash
npm install
# or
yarn install


---

## 📱 How to Run the App

### ✅ For Android:

Make sure you have Android Studio and emulator or USB device connected.

bash
npx react-native run-android


### 🍏 For iOS (Mac only):

Make sure Xcode and CocoaPods are properly set up.

bash
cd ios
pod install
cd ..
npx react-native run-ios


---

## 📁 Folder Structure

```
project-root/
├── src/
│   ├── components/
│   │   └── TaskItem.tsx
│   ├── screens/
│   │   └── HomeScreen.tsx
│   ├── store/
│   │   └── useTaskStore.ts
│   ├── types/
│   │   └── Task.ts
│   ├── images/
│       └── [PNG icons used in UI]
├── App.tsx
├── package.json
└── README.md


## 📦 Technologies Used

- React Native CLI (not Expo)
- TypeScript
- Zustand (state management)
- AsyncStorage (persistent storage)
- React Native Modal & Touchable components
- PNG-based icons for actions
- Material UI-inspired custom styles

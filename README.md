# 🤖 SABOT AI

## 🌟 Overview

SABOT AI is a React-based application that generates answers using the Gemini API from Google's Generative Language model. The application features a dynamic user interface enhanced with animations and theme toggles, making it interactive and user-friendly. It also supports file and image uploads, maintains a chat history, and allows for easy deletion of chat items. The app leverages various libraries and APIs to achieve its functionality, which are explained in detail below. We also have a toggle background button for the dynamic view.
![Screenshot 2024-09-16 121405](https://github.com/user-attachments/assets/d0e6d4b0-ab6d-4b05-b490-d5ec4db0a35c)

## 📚 Table of Contents

- [🛠️ Installation](#installation)
- [🔑 Environment Variables](#environment-variables)
- [🗂️ Project Structure](#project-structure)
- [💡 Key Technologies and Why We Used Them](#key-technologies-and-why-we-used-them)
  - [⚛️ React](#react)
  - [🔄 Axios vs Fetch](#axios-vs-fetch)
  - [🗝️ import.meta.env.VITE_API_KEY](#importmetaenvvite_api_key)
  - [🤖 Gemini API](#gemini-api)
  - [🎨 GSAP](#gsap)
- [⚙️ Functionality](#functionality)
  - [⏳ Loading State](#loading-state)
  - [🎬 Animations](#animations)
  - [🌙☀️ Theme Toggle](#theme-toggle)
  - [📁 File and Image Handling](#file-and-image-handling)
  - [💬 Chat History](#chat-history)
  - [🗑️ Deletion Functionality](#deletion-functionality)
- [🎛️ Customization](#customization)
- [🎉 Conclusion](#conclusion)

## 🛠️ Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/Slygriyrsk/sabot-gpt.git
cd chatbot-ai
```

2\. **Install Dependencies:** Ensure you have Node.js installed. Run the following command to install the necessary dependencies:

```shellscript
npm install
```

3\. **Run the Application:** Start the development server:

```shellscript
npm run dev
```

4\. **Vercel CLI**: Install globally using npm:

```shellscript
npm install -g vercel
```

## ⚙️ Building for Production

- To create an optimized production build, run:

```shellscript
npm run build
```

This command will generate a `dist` directory with the optimized production files.

## 🔄 Deploying to Vercel

1\. **Log in to Vercel (if not already logged in):**

```shellscript
vercel login
```

2\. **Deploy the Application:**

Deploy the application to Vercel using the following command:

```shellscript
vercel
```

Follow the prompts to configure the project for deployment.

3\. **Set Up Continuous Deployment:**

Optionally, link your Vercel project to this GitHub repository to enable continuous deployment. Every time you push changes to the `main` branch, Vercel will automatically build and deploy the updated application:

```shellscript
vercel link
```

## 🔑 Environment Variables

Create a `.env` file at the root of your project to store environment variables. The application uses `import.meta.env.VITE_API_KEY` to securely access the Gemini API key.

```shellscript
VITE_API_KEY=your_gemini_api_key
```
![Screenshot 2024-09-16 121440](https://github.com/user-attachments/assets/e57a3ef4-ea4b-4195-8dbd-4d46c1e98a32)

## 🗂️ Project Structure

```shellscript
/src

|-- /components

|   |-- Loading.js          # ⏳ Loading spinner component

|

|-- /assets

|   |-- App.css             # 🎨 Custom styles

|

|-- App.jsx                 # 💻 Main application component

|-- main.jsx                # 🚀 Entry point of the React application
```

## 💡 Key Technologies and Why We Used Them

### ⚛️ React

React is the foundational library for building the user interface. It provides a component-based architecture, making it easier to manage and update the UI as the application grows.

### 🔄 Axios vs Fetch

**Why Axios?**

- **Ease of Use:** Axios automatically transforms the response data into JSON, while with Fetch, you need to manually parse it using `response.json()`.

- **Error Handling:** Axios provides better error handling, allowing you to handle HTTP errors directly in the catch block.

- **Interceptors:** Axios supports request and response interceptors, making it easier to handle common tasks like authentication or logging.

**Why Not Fetch?**

- Fetch is built into the browser, but it requires more boilerplate code to handle responses and errors, making Axios a more convenient option for API calls.

### 🗝️ import.meta.env.VITE_API_KEY

**Why Use import.meta.env?**

- **Security:** Storing API keys in environment variables prevents them from being exposed in the source code.

- **Flexibility:** `import.meta.env` allows you to use different environment variables depending on the environment (development, production, etc.).

- **Vite Integration:** Vite, the build tool used in this project, provides `import.meta.env` as a way to access environment variables, making it seamless to integrate with your build process.

### 🤖 Gemini API

**Why Gemini API?**

- **Advanced Language Model:** The Gemini API leverages Google's generative language model, which provides more accurate and contextually aware answers compared to other language models.

- **Customization:** The API allows you to pass specific content to generate answers, giving you control over the output.

### 🎨 GSAP

**Why GSAP?**

- **Powerful Animations:** GSAP (GreenSock Animation Platform) is a robust library for creating high-performance animations. It offers more control and flexibility than CSS animations.

- **Ease of Use:** GSAP's syntax is straightforward, and it supports a wide range of animations, including transformations, tweens, and complex timelines.

- **Customization:** GSAP allows you to customize animations with ease, adjusting properties like duration, delay, easing, and stagger effects to create dynamic UIs.

**Why UseGSAP Hook?**

- The `useGSAP` hook ensures that the GSAP animations are triggered in sync with React's lifecycle, providing a smooth user experience.

## ⚙️ Functionality

### ⏳ Loading State

The application uses a `Loading` component to indicate when data is being fetched from the API. This improves the user experience by providing immediate feedback when the answer generation process is in progress.

### 🎬 Animations

Animations are applied to the generated answer using GSAP. This enhances the visual appeal of the application by animating the appearance of the answer, making the interaction more engaging.

### 🌙☀️ Theme Toggle

A theme toggle feature allows users to switch between light and dark modes. This is achieved by toggling the background color and icon (sun/moon) based on the current theme state.

### 📁 File and Image Handling

SABOT AI supports file and image uploads, enhancing the interaction capabilities:

- **File Upload:** Users can attach files (images, PDFs, docs, txt) to their messages.

- **Image Preview:** Uploaded images are previewed in the chat interface.

- **File Size Limit:** There's a 5MB file size limit to ensure optimal performance.

- **Error Handling:** The app provides clear error messages for file-related issues.

### 💬 Chat History

The application maintains a chat history, providing context and allowing users to review past interactions:

- **Persistent Chat:** Messages are stored in the chat history as the conversation progresses.

- **User and AI Messages:** Both user inputs and AI responses are saved in the chat history.

- **Scrollable Interface:** The chat container is scrollable, allowing users to view earlier messages.

### 🗑️ Deletion Functionality

Users can manage their chat history with the deletion feature:

- **Individual Message Deletion:** Each user message in the chat history can be deleted individually.

- **Animated Deletion:** GSAP animations are used to provide a smooth deletion effect.

- **Automatic AI Response Removal:** When a user message is deleted, its corresponding AI response is also removed.

## 🎛️ Customization

### 🎨 GSAP Animations

You can customize GSAP animations by modifying the properties in the `useGSAP` hook. For example:

- **Duration:** Change the duration of the animation.

- **Easing:** Use different easing functions like `ease-in`, `ease-out`, or `linear`.

- **Stagger:** Adjust the stagger effect to control the delay between animations.

### 🎨 Styling

You can modify the styles in `App.css` to further customize the look and feel of the application. Bootstrap is used for basic styling, but you can override these styles or add new ones as needed.

## 🎉 Conclusion

SABOT AI is a robust application designed to provide users with dynamic and interactive answers using the Gemini API. With its use of React, file handling capabilities, chat history management, and smooth animations, it offers a modern and customizable solution for building AI-driven chat applications. The addition of file uploads and chat management features enhances user interaction and provides a more comprehensive chatbot experience.

**If you have any questions or need further assistance, feel free to reach out! Happy coding! 🚀**
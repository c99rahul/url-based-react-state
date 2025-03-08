# URL-based State Management in React

This is a simple app demonstrating how to control state using the URL in React, primarily leveraging the `useSearchParams` hook. See a quick working demo of this app in the video below:

[![Watch the video](https://github.com/user-attachments/assets/5edd188b-40b0-44bf-ad12-4c36049f7e1f)](https://github.com/user-attachments/assets/1d15be0e-1684-44fd-b1cb-86a1bf17c0c4)

[Follow this tutorial](https://blog.logrocket.com/advanced-react-state-management-using-url-parameters/) to understand the code and techniques utilized in this app.

## How It Works

This project utilizes **URL search parameters** to manage state, allowing users to:

- Retain state across page reloads
- Share URLs with prefilled states
- Enable bookmarking of specific states

## Tech Stack 

- **React** – For building the UI
- **TypeScript** – To ensure type safety
- **Tailwind CSS (v3.417)** – Utility-first styling framework
- **TanStack React Query** – For data fetching and state synchronization
- **React Router DOM** - For managing app routes efficiently
- **Vite** – For fast development tooling
- **DummyJSON API** – For providing test data

## Prerequisites

To follow along, you should have:

- A working knowledge of **React** with **TypeScript**
- Familiarity with **React Router DOM** for handling URL-based state
- Basic understanding of **Tailwind CSS** (optional, if you're interested in UI styling)

## Installation & Setup

Clone the repository:

```sh
git clone https://github.com/c99rahul/url-based-react-state.git
```

Navigate to the project directory:

```sh
cd url-based-react-state
```

Install dependencies using PNPM:

```sh
pnpm i
```

Run the development server:

```sh
pnpm dev --open
```

## License

This project is open-source and available under the **MIT License**.


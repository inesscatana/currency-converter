<div align="center">
  
  <h3 align="center">💱 Currency Converter</h3>

  <div align="center">
    A real-time currency converter that fetches exchange rates from the Uphold API, providing a seamless and interactive experience.
  </div>

  <br>

  <div align="center">
    This project was developed as part of an assessment challenge and implements key functionalities like currency selection, debounced input updates, caching, and background API fetching.
  </div>

  <br>

  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Uphold%20API-008080?style=for-the-badge&logoColor=white" alt="Uphold API" />
    <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logoColor=white" alt="React Query" />
    <img src="https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  </div>

</div>

---

## 📌 Features

✅ **Real-time Currency Conversion** - Fetches exchange rates dynamically from Uphold's API.  
✅ **Debounced Input** - Reduces excessive API calls by implementing a debounce mechanism.  
✅ **Currency Selector** - Users can select from multiple supported currencies.  
✅ **Cached Data** - Uses local storage to cache exchange rates, reducing unnecessary requests.  
✅ **Background Data Fetching** - Ensures exchange rates are up-to-date without impacting performance.  
✅ **Mobile-Friendly Design** - Fully responsive with Tailwind CSS.  
✅ **Unit Tests** - Includes Jest and React Testing Library tests for key components.

---

## ⚙️ Tech Stack

- **React** (UI Library)
- **TypeScript** (Static Typing)
- **React Query** (API Data Management)
- **Lodash** (Debounce Utility)
- **Tailwind CSS** (Styling)
- **Uphold API** (Currency Data)
- **Jest & React Testing Library** (Unit Testing)

---

## 📜 Acceptance Criteria

- **TC01:** The user input amount should be in **USD by default**.
- **TC02:** The user should be able to **switch between currencies**.
- **TC03:** Exchange rates should update **using a debounce mechanism** to limit API calls.
- **TC04:** The app should **cache the exchange rates** after the first request.
- **TC05:** When switching currencies, the app should **fetch fresh data in the background** while displaying cached values.

---

## 🚀 Quick Start

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/inesscatana/currency-converter.git
cd currency-converter
```

### **2️⃣ Instalation**

```bash
npm install
```

### **3️⃣ Run the Project**

```bash
npm run dev
```

## 🧪 Running Tests

```bash
npm run test
```

## 📚 Additional Notes

This project uses the Uphold JavaScript SDK to retrieve real-time exchange rates.

The React Query library is used for caching and background refetching.

The debounce utility from Lodash prevents unnecessary API calls while typing.

The app is mobile-friendly and optimized for performance.

## 🤝 Contributing

Feel free to fork this repository and submit a pull request with improvements! Contributions are welcome. 😊

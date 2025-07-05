# 👑 Capture Kingdom

Welcome to **Capture Kingdom** — a strategy-packed, puzzle-driven game of exploration, conquest, and alliances!

Explore real-world locations, solve puzzles, form alliances, and claim kingdoms under your flag. Level up, trade territories, defend your empire, and build your global legacy in an ever-changing multiplayer world.

---

## 🌍 What is Capture Kingdom?

**Capture Kingdom** is a location-aware, multiplayer web game that blends:

- Strategy
- Puzzles
- Real-world movement
- Accessibility features
- Interactive 3D visuals

**Gameplay:** Travel to real coordinates, solve mazes and brain teasers, and conquer virtual kingdoms tied to physical locations.

---

## 🚀 Getting Started Walkthrough

1. Users visit the site and meet a **gold-crowned stickman avatar** with a flowing blue cape.
2. The avatar uses **text-to-speech** and readable text to guide players.
3. Users are directed to **sign up or log in**.
4. Upon login:
   - Location permissions are requested.
   - A **unique user ID** is generated.
   - Users create a password.
5. The avatar walks through:
   - Dashboard interface
   - Feature overview
   - How to begin exploring

---

## 📊 Core Gameplay Flow

1. View **Nearby Kingdoms** list
2. Select a kingdom ➔ Solve **Maze Puzzle**
3. Get **Google Maps route** to location
4. On arrival, solve a **1-minute Brain Teaser** (with TTS support)
5. On success ➔ **Capture kingdom**, earn **Souls**, level up

---

## ✨ Key Features

### 📍 Nearby Kingdoms

- Shows 5 nearby kingdoms
- 2 are **Ghost Kingdoms**:
  - Message: "Boo! You have been ghosted."
  - Cannot be captured
- List updates as user explores

### 🧠 Puzzle & Capture

- **Maze Puzzle** unlocks location
- At location, answer **Brain Teaser**
  - With **Text-to-Speech support**
  - **1 Refresh** allowed per teaser
- Initially, all kingdoms named `XXXXXXXXXX`
- **Renaming Rules:**
  - Only once per user globally
  - Recaptures allow renaming if user hasn’t renamed before

### 🏠 Party-Based Capture

- Form **parties** for tough kingdoms
- Every member must:
  - Solve their maze
  - Reach the location
  - Solve their teaser
- If successful:
  - Capture under **party name**
  - Rewards are split equally

### 🔽 Capture Loss

- If another player captures your kingdom:
  - It vanishes from your list
  - Your flag is removed
  - Capture count decreases
  - New captor may rename it

### 📈 Leveling System

- To level up, capture **n** kingdoms (where n = current level)
- After leveling:
  - Captured count resets
  - Level increases
  - Unlocks:
    - New powers
    - Higher soul cap
    - Advanced battles

### 🚙 Soul Economy

**Earn Souls by:**

- Capturing kingdoms
- Daily tribute from held kingdoms

**Spend Souls on:**

- Unlocking new areas
- Activating powers
- Flag customization

**Soul Cap** increases every 3 levels

---

## 🔮 Powers (Last 7 Days)

| Power                 | Description                     |
| --------------------- | ------------------------------- |
| 🕵 Hide Kingdom       | Make your kingdom invisible     |
| 📈 Boost Level        | Temporarily raise kingdom level |
| 🩤 Trap                | Drain Souls from invaders       |
| ⌛ Reduce Teaser Time | Increase teaser difficulty      |
| ➕ Add Teaser Options | Add extra wrong answers         |
| ❌ Disable Refresh    | Block teaser reshuffle          |
| 💥 Maze Misdirect     | Lead invaders to Ghosts         |

---

## 🎨 Flag Customization

- Choose **shape, background, colors, emblem**
- Appears on:
  - **User Profile**
  - **Captured Kingdoms** (on 2D/3D maps)
- Successful capture triggers:
  - Blast sound
  - Flag wave + explosion animation
  - Real-time 3D globe update

---

---

## 🏆 Leaderboards

- 🌐 Global: Top 10 players
- 📍 Local: Top 10 in your region

---

## 📊 Activity Tracker

- 6-month heatmap
- Tracks:
  - Login frequency
  - Captures
  - Inactivity
- Displays:
  - Longest streak 👑
  - Daily streak stats

---

## 🏠 Global Bidding Arena

- List your kingdoms for **auction**
- 24h auction window
- Highest bidder wins
- Transfers:
  - XP
  - Name (unless renamed)
  - Flag & visual info

---

## 🌑 Theme Appearance: Dark/Light Mode

Toggle located at top-right of dashboard

### 🌙 Dark Mode:

- Deep navy backgrounds
- Glowing flag markers
- White text
- Cool neon button styles

### ☀ Light Mode:

- Warm light tones
- Standard daylight globe
- Dark text
- Bright button palettes

**Persistence:**

- Stored in `localStorage`
- Avatar adjusts glow/shine by mode

---

## 🚧 Development & Accessibility

- Built during hackathon
- Actively evolving
- Features:
  - Guided onboarding via avatar
  - Text-to-Speech for teasers
  - Dark/Light mode
- Welcoming contributors and feedback

---

## 🚀 Build your legacy. Capture the world. One kingdom at a time. 🌍👑
Sure! Here's an updated and polished version of your README with the following sections included:

* **Features Implemented (with difficulty levels)**
* **APIs Used**
* **Screenshots**
* **Setup and Testing Instructions**

---


## ✨ Features Implemented (with Difficulty Levels)

| Feature                        | Description                                                | Difficulty |
| ------------------------------ | ---------------------------------------------------------- | ---------- |
| 🔐 Authentication System       | Unique username check, email/password login                | Easy       |
| 🗺️ Location-Based Map         | Displays captured kingdoms on Google Maps                  | Medium     |
| 👑 Kingdom Capture Mechanism   | Players can capture real-world kingdoms                    | Medium     |
| 🧠 Puzzle and Maze Integration | Solve to capture kingdoms or earn rewards                  | Hard       |
| ⚔️ Level-Up System             | Level increases when captured kingdoms match current level | Medium     |
| 💎 Magical Shop                | Buy mystical items using Soulstones/Obsidian               | Medium     |
| 📜 Stickman Tutorial Guide     | Interactive guide to onboard new users                     | Medium     |
| 🧙‍♂️ Inventory System         | Track user items and resources                             | Medium     |
| 🌓 Theme Toggle                | Light/Dark mode toggle with UI changes                     | Easy       |
| 🧭 Leaderboard                 | Displays top players globally                              | Medium     |
| 🔄 Real-time Sync              | Firebase real-time updates for map and stats               | Medium     |

---

## 🔌 API(s) Used

| API                | Purpose                            |
| ------------------ | ---------------------------------- |
| Firebase Auth      | User authentication and management |
| Firebase Firestore | Real-time database for game data   |
| Firebase Hosting   | Web app deployment                 |
| Google Maps API    | Real-world map to show kingdoms    |
| UUID / Nano ID     | Unique user ID generation          |

---

## 🖼️ Screenshots

**1. Authentication Page**
`

![Screenshot 2025-07-06 035807](https://github.com/user-attachments/assets/ecc45181-4e75-4ccf-bb51-5a9b00558db9)

**2. Map Interface**
`
![Screenshot 2025-07-06 042837](https://github.com/user-attachments/assets/e73bbe9f-c614-4572-abbc-a9948cd87d7a)

![Screenshot 2025-07-06 042908](https://github.com/user-attachments/assets/2888a478-0d76-4c8a-a066-ba7332c272aa)


**3. Magical Shop UI**
`
![Screenshot 2025-07-06 042853](https://github.com/user-attachments/assets/bb1aee4c-8908-4da6-8137-d3252e599682)

**4. Stickman Tutorial**
![Screenshot 2025-07-06 042748](https://github.com/user-attachments/assets/701a8623-067a-405c-8ccd-ad9e43a8815c)


**5. Dark Theme**
`
![Screenshot 2025-07-06 042800](https://github.com/user-attachments/assets/188caf82-1e77-4fc5-8e0b-2953187eb878)

**6. Maze**

![Screenshot 2025-07-06 042921](https://github.com/user-attachments/assets/1e3f4221-e2fd-4104-ba5a-92b141ef719a)

---

## 🛠️ Setup and Testing Instructions

### 🧱 Prerequisites

* Node.js (>=18)
* Firebase CLI
* Google Maps API key

### 🔧 Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/mystic-kingdoms.git
cd mystic-kingdoms

# Install dependencies
npm install

# Set up Firebase
firebase login
firebase init
# Link with Firestore and Hosting

# Add your .env file
touch .env.local
```

**`.env.local` example:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### 🚀 Run Locally

```bash
npm run dev
```

### 🧪 Testing

Manual testing steps:

* Create a new user account
* Try duplicate usernames (should fail)
* Capture a kingdom (check map and DB)
* Solve a maze/puzzle (UI flow)
* Visit shop and purchase an item
* Switch theme (dark/light toggle)
* Watch leaderboard updates



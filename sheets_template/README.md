# 📊 Unified Google Sheets CMS Guide

Welcome to your **VBK Designs** spreadsheet CMS guide! We have consolidated all storefront configurations into **one single spreadsheet** (tab). This makes updates simple, fast, and centralized.

---

## 🚀 Setup Steps (3 Minutes)

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.google.com) and create a **blank spreadsheet**.
2. Name the spreadsheet whatever you like (e.g., `VBK Designs CMS`).

### Step 2: Import the Unified CSV Template
1. In Google Sheets, select your primary sheet (tab) at the bottom.
2. Go to **File > Import > Upload** and choose the `Storefront_CMS.csv` template file in this directory.
3. Set the import action to **"Replace current sheet"** (or "Replace data at selected cell") and click **Import data**.
4. You will see a single structured sheet populated with your original slide banners, products, customizer options, and global settings!

### Step 3: Share and Connect
1. Click the blue **Share** button at the top right of your spreadsheet.
2. Under "General access", change Restricted to **"Anyone with the link can view"** (Viewer role is sufficient).
3. Copy the **Spreadsheet ID** from your browser address bar. The ID is the long alphanumeric string between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/` **`1FpLqV0vAExV1r9kLqFm-2Ww5Zle0Jj8QeJ8gqJ1cZ_8`** `/edit#gid=0`
4. Open your codebase's `script.js` in a text editor.
5. Find the configuration line at the top:
   ```javascript
   const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
   ```
   Paste your copied **Spreadsheet ID** (or the entire Google Sheets URL) between the quotes, save the file, and refresh the website!

---

## 🎨 Spreadsheet Column Reference (10 Columns)

Your single spreadsheet contains the following columns. Each row corresponds to a specific `Section` of the storefront:

### 1. `Section` (Must be one of the following)
- **`Hero`**: Defines slides for the luxury banner slider at the top of the homepage.
- **`Product`**: Defines items for the Bestsellers slider and dynamic Category collections.
- **`Customizer`**: Defines materials and designs for the live interactive 3D blender.
- **`Setting`**: Manages global configuration keys like WhatsApp numbers and social URLs.

### 2. Column Mapping by Section

| Column Name | Section: `Hero` | Section: `Product` | Section: `Customizer` | Section: `Setting` |
| :--- | :--- | :--- | :--- | :--- |
| **`Section`** | `Hero` | `Product` | `Customizer` | `Setting` |
| **`Title_Name`** | Slide bold title | Product name | Option name | Setting Key (e.g. `WhatsApp_Number`, `Instagram_URL`, etc.) |
| **`Subtitle_Price_Value`** | Slide subtitle label | Product price (e.g., `₹2,999`) | Option subtitle description | Setting value (e.g. phone number or bar text) |
| **`Category`** | _(Leave blank)_ | Category (for grouping under Collections) | Option type (`Fabric` or `Motif`) | _(Leave blank)_ |
| **`Description`** | Slide description text | Product description | _(Leave blank)_ | _(Leave blank)_ |
| **`Fabric_Type`** | _(Leave blank)_ | Default fabric base description | _(Leave blank)_ | _(Leave blank)_ |
| **`Image_URL`** | Image asset path | Image asset path | Motif image path (leave blank for Fabric) | _(Leave blank)_ |
| **`Link_Or_Bestseller`** | Button anchor link | `TRUE` to show in Bestsellers slider | Swatch style class or FontAwesome class | _(Leave blank)_ |
| **`Product_Size`** | _(Leave blank)_ | Default size dimensions | _(Leave blank)_ | _(Leave blank)_ |
| **`Product_Care`** | _(Leave blank)_ | Care instructions | _(Leave blank)_ | _(Leave blank)_ |

---

## 🛡️ Live Fetching & High-Speed Offline Fallback
The website loads instantly by using the pre-programmed local dataset (acting as a safety fallback). In the background, it fetches your Google Sheet asynchronously. If it succeeds, it updates the slides, products, and specs seamlessly on the page. If the user is offline or the sheet is deleted, the site will continue to render fully using the offline fallback.

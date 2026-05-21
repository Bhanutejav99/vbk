# 📊 Google Sheets CMS Template Guide

Welcome to your **VBK Designs** spreadsheet templates folder! This guide explains how to quickly set up your Google Sheets CMS to dynamically control the storefront website.

---

## 🚀 Setup Steps (5 Minutes)

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.google.com) and create a **blank spreadsheet**.
2. Name the spreadsheet: `VBK Designs Storefront CMS` (or any name you prefer).

### Step 2: Create the 4 Tabs
Create 4 sheets (tabs) at the bottom, and name them **exactly** as follows (case-sensitive):
1. **`Hero_Banner`**
2. **`Products_Catalog`**
3. **`Customizer_Options`**
4. **`Global_Settings`**

### Step 3: Populate the Columns
You have two options to fill in the columns:

#### Option A (Recommended - Import CSV files)
For each tab, you can import the pre-formatted CSV template files provided in this directory:
1. In Google Sheets, select the tab (e.g., `Hero_Banner`).
2. Go to **File > Import > Upload** and choose the matching CSV file (e.g., `Hero_Banner.csv`).
3. Set import action to **"Replace current sheet"** and click **Import data**.
4. Repeat for all 4 sheets!

#### Option B (Manual Copy-Paste)
Copy the headers (the first row of each CSV file) exactly into the first row of your corresponding sheet.

---

## 🎨 Tab Configurations

### 1. `Hero_Banner`
*Controls the luxury slider banner at the very top of your home page.*
*   **Slide_Number**: Numeric ID (e.g. `1`, `2`, `3`).
*   **Title**: Main bold heading (supports HTML `<br>` for line breaks).
*   **Subtitle**: Smaller rosy tag above the main heading.
*   **Description**: Exquisite tagline descriptive text.
*   **Image_URL**: Direct hotlink to image (can use `images/hero-1.png` locally or a public web image link).
*   **Button_Link**: Destination anchor (e.g. `#collections`, `#bestsellers`, `#cta`).

### 2. `Products_Catalog`
*Populates the Bestsellers slider, dynamic Category filtering, and the detailed Quick-View popup.*
*   **Product_Name**: Sacred title of the product.
*   **Price**: Price string (e.g. `₹2,999`).
*   **Category**: Sacred series mapping (e.g. `Sreenivasa Kalyanam Series`, `Shanku Chakra Namalu`, `Auspicious Swastik Series`). The site will dynamically group products under collections by this column!
*   **Description**: Meticulous product description displayed on Quick-View.
*   **Fabric_Type**: Base fabric description (e.g. `Royal Silk (Customizable in Velvet)`).
*   **Image_URL**: Path or CDN web link to product image.
*   **Is_Bestseller**: Input **`TRUE`** to showcase it in the top sliding gallery, or **`FALSE`** to only show it inside dynamic collections.
*   **Product_Size**: Dimensions (e.g. `Standard 15" x 15"`).
*   **Product_Care**: Care instructions (e.g. `Dry Clean Only`).

### 3. `Customizer_Options`
*Sets options for your sacred interactive fabric & motif blender customizer.*
*   **Option_Type**: Must be either `Fabric` or `Motif` (case-sensitive).
*   **Option_Name**: Name of the material or design motif (e.g., `Royal Silk` or `Swastik with Shanku`).
*   **Subtitle**: Rose-gold subtext (e.g. `Celestial wedding blessings`).
*   **Icon_Class**: FontAwesome icon or CSS swatch name:
    *   For Fabric: Use `silk-swatch`, `satin-swatch`, or `cotton-swatch`.
    *   For Motif: FontAwesome classes (e.g. `fas fa-om`, `fas fa-star-of-david`, `fas fa-dharmachakra`, `fas fa-signature`).
*   **Image_URL**: Path or CDN link to show in the live interactive canvas preview (only needed for `Motif` rows, leave `Fabric` rows blank).

### 4. `Global_Settings`
*Manages active connections, phone numbers, and announcement banner messages.*
*   **WhatsApp_Number**: WhatsApp country code + number with **no spaces, plus signs, or hyphens** (e.g., `91738220377`).
*   **Announcement_Bar_Text**: Live promotional text displayed at the top of the webpage.
*   **Instagram_URL**: Direct profile link (e.g., `https://instagram.com/yourprofile`).
*   **Facebook_URL**: Direct profile link.

---

## 🌐 Publish & Link (Crucial!)

To connect your Google Sheet to the website frontend:
1. In Google Sheets, click the blue **Share** button at the top right.
2. Under "General access", change Restricted to **"Anyone with the link can view"** (set permission to **Viewer**).
3. Copy your unique **Spreadsheet ID** from the browser address bar. The ID is the long string of letters and numbers between `/d/` and `/edit` in your URL:
   `https://docs.google.com/spreadsheets/d/` **`1FpLqV0vAExV1r9kLqFm-2Ww5Zle0Jj8QeJ8gqJ1cZ_8`** `/edit#gid=0`
4. Open `script.js` in your text editor.
5. Paste your Spreadsheet ID into the configuration line at the top of the file:
   ```javascript
   const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
   ```
6. Save and refresh the site! The site will load immediately using offline fallback data and then seamlessly fetch your live spreadsheet updates in the background.

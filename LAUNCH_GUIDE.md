# 🚀 Launch Guide - Step by Step

## Step 1: Download Node.js

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)

2. **Go to this website:**
   ```
   https://nodejs.org/
   ```

3. **You'll see two green buttons:**
   - One says "LTS" (Long Term Support) - **Click this one!**
   - The other says "Current" - Don't click this
   
4. **The download will start automatically**
   - File name will be something like: `node-v20.x.x-x64.msi`
   - Wait for download to complete (about 30-50 MB)

---

## Step 2: Install Node.js

1. **Find the downloaded file:**
   - Usually in your `Downloads` folder
   - File name: `node-v20.x.x-x64.msi`

2. **Double-click the file** to start installation

3. **Follow the installation wizard:**
   - Click **"Next"**
   - Accept the license agreement → Click **"Next"**
   - Keep default installation location → Click **"Next"**
   - Keep default features selected → Click **"Next"**
   - Check the box "Automatically install necessary tools" → Click **"Next"**
   - Click **"Install"**
   - Wait 2-3 minutes for installation
   - Click **"Finish"**

4. **IMPORTANT:** If a blue PowerShell window opens asking to install additional tools:
   - Press **Enter** to continue
   - Wait for it to complete (may take 5-10 minutes)
   - Close the window when done

---

## Step 3: Verify Node.js Installation

1. **Open a NEW Command Prompt or PowerShell:**
   - Press `Windows Key + R`
   - Type: `cmd`
   - Press Enter

2. **Type this command and press Enter:**
   ```bash
   node --version
   ```

3. **You should see something like:**
   ```
   v20.11.0
   ```
   ✅ If you see a version number, Node.js is installed!
   ❌ If you see an error, close and reopen Command Prompt

---

## Step 4: Navigate to Your Project

1. **In the same Command Prompt, type:**
   ```bash
   cd C:\Users\Hp\.gemini\antigravity\scratch\ecommerce-store
   ```

2. **Press Enter**

3. **You should see your path change to:**
   ```
   C:\Users\Hp\.gemini\antigravity\scratch\ecommerce-store>
   ```

---

## Step 5: Install Project Dependencies

1. **Type this command:**
   ```bash
   npm install
   ```

2. **Press Enter**

3. **What you'll see:**
   - Lots of text scrolling
   - "added XXX packages"
   - This takes 1-3 minutes
   - ✅ Wait until you see the prompt again

4. **Common issues:**
   - If you see "npm is not recognized":
     - Close Command Prompt
     - Open a NEW one
     - Try again

---

## Step 6: Start the Development Server

1. **Type this command:**
   ```bash
   npm run dev
   ```

2. **Press Enter**

3. **What you'll see:**
   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000
   
   ✓ Ready in 2.5s
   ```

4. **✅ Success! Your store is running!**

---

## Step 7: Open Your Ecommerce Store

1. **Open your web browser**

2. **Go to this address:**
   ```
   http://localhost:3000
   ```

3. **You should see:**
   - 🎉 Your beautiful ecommerce homepage!
   - Hero section with "Discover Your Next Favorite Product"
   - Categories and featured products

---

## 🎮 What You Can Do Now

### Test the Features:

1. **Browse Products:**
   - Click "Shop Now" button
   - Use filters (category, price range)
   - Try sorting options

2. **Sign Up / Login:**
   - Click "Sign In" in the header
   - Use demo account:
     - Email: `customer@example.com`
     - Password: `anything` (any password works)
   - Or create a new account

3. **Add to Cart:**
   - Click on any product
   - Click "Add to Cart"
   - See cart badge update in header

4. **Wishlist:**
   - Click the heart icon on products
   - View wishlist from header icon

5. **Shopping Cart:**
   - Click cart icon in header
   - Change quantities
   - See totals update
   - Click "Proceed to Checkout"

6. **Checkout:**
   - Fill in shipping information
   - Fill in payment details (fake data is fine)
   - Click "Place Order"
   - See success confirmation

7. **Dark Mode:**
   - Click the sun/moon icon in header
   - Watch the entire site change theme

---

## 🛑 How to Stop the Server

When you're done testing:

1. **Go back to Command Prompt**
2. **Press:** `Ctrl + C`
3. **Type:** `Y` and press Enter
4. **Server will stop**

---

## 🔄 How to Start Again Later

1. **Open Command Prompt**
2. **Navigate to project:**
   ```bash
   cd C:\Users\Hp\.gemini\antigravity\scratch\ecommerce-store
   ```
3. **Start server:**
   ```bash
   npm run dev
   ```
4. **Open browser:** http://localhost:3000

---

## ⚠️ Troubleshooting

### Problem: "npm is not recognized"
**Solution:** 
- Close Command Prompt
- Open a NEW Command Prompt
- Try again

### Problem: Port 3000 already in use
**Solution:**
- Press `Ctrl + C` in Command Prompt
- Type: `npm run dev` again

### Problem: Page won't load
**Solution:**
- Make sure Command Prompt shows "Ready"
- Try refreshing browser
- Clear browser cache

### Problem: Changes not showing
**Solution:**
- Save your files
- Refresh browser (Ctrl + F5)

---

## 📝 Quick Reference

**Start Server:**
```bash
cd C:\Users\Hp\.gemini\antigravity\scratch\ecommerce-store
npm run dev
```

**Open Store:**
```
http://localhost:3000
```

**Stop Server:**
```
Ctrl + C → Y → Enter
```

**Demo Login:**
- Email: `customer@example.com`
- Password: `anything`

---

## 🎉 You're All Set!

Once you complete these steps, you'll have:
- ✅ A fully functional ecommerce store
- ✅ Running on your local machine
- ✅ All features working perfectly
- ✅ Ability to modify and customize

**Enjoy exploring your amazing creation!** 🚀

---

## 📞 Need Help?

If you get stuck at any step, just let me know:
- Which step number you're on
- What error message you see (if any)
- What happened when you tried

I'll help you troubleshoot! 💪

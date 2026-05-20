Here is the highly detailed, file-by-file blueprint for integrating Google AdSense into your existing React/TypeScript Word Counter application.

In a React Single Page Application (SPA), integrating AdSense requires careful handling of the component lifecycle. If you simply paste ad tags into a React component, it will crash when the component re-renders. To adhere to **SOLID principles (specifically the Single Responsibility Principle)**, we will isolate the ad-loading logic into a dedicated, highly reusable component.

You can pass this entire blueprint to your AI coding agent.

---

### Project Architecture Additions

```text
/
├── public/
│   └── ads.txt                  # Required for publisher verification
├── src/
│   ├── types/
│   │   └── global.d.ts          # TypeScript definitions for AdSense
│   ├── components/
│   │   ├── ads/
│   │   │   └── AdBanner.tsx     # The core, reusable React Ad Component
│   │   ├── content/
│   │   │   └── SeoContent.tsx   # Text content required for AdSense approval
│   │   └── layout/
│   │       └── Footer.tsx       # Standard footer with Policy links
├── index.html                   # Modified to include the global script
└── src/App.tsx                  # Modified to inject ad placements

```

---

## File-by-File Blueprint (Prompt for AI Agent)

Instruct your AI agent to apply the following code changes and create the new files exactly as specified:

### 1. Global Setup & Verification

* **`public/ads.txt`**:
* Create this file in the `public` directory.
* Content: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` *(Note to AI: Leave XXXXXXXXXXXXXXXX as a placeholder for the user's actual Publisher ID)*.


* **`index.html`**:
* Locate the `<head>` tag.
* Inject the global Google AdSense script right before the closing `</head>` tag.
* Code to inject:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

```




* **`src/types/global.d.ts`**:
* Create this file to prevent TypeScript errors when accessing the global AdSense object.
* Content:



```typescript
        interface Window {
          adsbygoogle: any[];
        }
        ```

### 2. The Core Ad Component (React + TypeScript)
This is the most critical file. It safely initializes ads within the React lifecycle without causing re-render crashes.

*   **`src/components/ads/AdBanner.tsx`**:
    *   **Props Interface:** Create an interface `AdBannerProps` containing: `adSlot` (string), `adFormat` (string, default: 'auto'), `fullWidthResponsive` (boolean, default: true), and `className` (string, optional).
    *   **Logic:**
        *   Use `useEffect` to push the ad to `window.adsbygoogle`.
        *   Wrap the `(window.adsbygoogle = window.adsbygoogle || []).push({})` call in a `try...catch` block. This prevents the app from crashing if AdSense is blocked by a browser extension (like uBlock Origin).
    *   **UI (Tailwind):**
        *   Return an `<ins>` HTML tag with the class `adsbygoogle`.
        *   Apply `display: block` style.
        *   Pass the `data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"`, `data-ad-slot={adSlot}`, `data-ad-format={adFormat}`, and `data-full-width-responsive={fullWidthResponsive}` attributes.
        *   Wrap it in a `div` that accepts the injected `className` for responsive positioning (e.g., hiding on mobile if needed).

### 3. SEO Content (Crucial for AdSense Approval)
Google rejects tools that are *only* functionality. We must add "Value Content" to the page.

*   **`src/components/content/SeoContent.tsx`**:
    *   Create a clean, responsive prose section (`max-w-4xl mx-auto mt-12 mb-12 p-6 text-gray-700`).
    *   Add an `<h2>` "About This Word Counter".
    *   Add a 3-4 paragraph explanation of how the tool helps writers, students, and SEO professionals track their word counts and character limits.
    *   Include a simple "Frequently Asked Questions" UI (using simple standard HTML `<details>` and `<summary>` tags for zero-dependency accordions) covering "How is reading time calculated?" and "Does this save my data?".
*   **`src/components/layout/Footer.tsx`**:
    *   Create a simple footer (`w-full border-t py-6 text-center text-sm text-gray-500`).
    *   Include placeholder links for "Privacy Policy", "Terms of Service", and "Contact". (Even if these just link to `/#` for now, the presence of the layout satisfies initial crawler checks).

### 4. Injecting Ads into the Layout
Modify the main composition file to place the ads responsibly without ruining the user experience.

*   **`src/App.tsx`** (Modify existing file):
    *   Import `AdBanner`, `SeoContent`, and `Footer`.
    *   **Placement 1 (Top Leaderboard):** Place an `<AdBanner adSlot="1234567890" className="w-full max-w-7xl mx-auto my-4 min-h-[90px] bg-gray-50 flex justify-center items-center"/>` directly above the `StatPanel` or `EditorArea`. Use Tailwind to ensure it has a minimum height so the layout doesn't "jump" when the ad loads (Cumulative Layout Shift prevention).
    *   **Placement 2 (Sidebar or Inline):** If your layout has a grid, place a smaller rectangle ad next to the stats. If it's a single column, place an `<AdBanner adSlot="0987654321" className="w-full max-w-md mx-auto my-6"/>` directly below the `EditorArea`.
    *   **Placement 3 (Content/Footer):** Place `<SeoContent/>` below the main tool logic, followed by the `<Footer/>`.

---

### How to use this plan with your AI Agent:

Copy this exact prompt and say:
*"I have an existing React/Vite single-page Word Counter application. Please read the following architectural blueprint for adding Google AdSense. Generate the complete codebase for the new files and the modifications to the existing files exactly as specified. Leave the Publisher IDs and Ad Slot IDs as placeholders for me to fill in later."*

```
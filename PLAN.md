# URL Shortener Web Frontend (Next.js + Tailwind CSS)

Create a modern, responsive web interface for the URL shortener API using Next.js, Tailwind CSS, and shadcn/ui components.

---

## ✅ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Deployment**: Vercel
- **API Integration**: Backend Lambda Function URL

---

## ✅ Functional Features

- `Home Page` — Create new short URLs with optional expiration
- `URL Stats Page` — View analytics for a specific short URL
- `History Page` — View and manage previously created short URLs
- `Redirect Page` — Handle redirects for short URLs
- `Error Pages` — Handle various error states gracefully

---

## ✅ Phase-Based Plan

## Phase 1: Project Setup & Structure

- [x] **Initialize Project:**
  - Set up Next.js project with Tailwind CSS
  - Configure shadcn/ui components
  - Set up project structure and routing

- [x] **Create Core Components:**
  - Layout components (Header, Footer, Container)
  - UI components (Button, Input, Card, Toast notifications)
  - Form components for URL shortening

- [x] **Setup API Integration:**
  - Create API client for communicating with the backend
  - Define TypeScript interfaces for API responses
  - Implement error handling for API requests

---

## Phase 2: Home Page Implementation

- [ ] **URL Shortening Form:**
  - Create form with URL input field
  - Add optional expiration date selector
  - Implement form validation
  - Connect form to backend API

- [ ] **Results Display:**
  - Show shortened URL with copy-to-clipboard functionality
  - Display QR code for the shortened URL
  - Provide option to share on social media
  - Add visual feedback for successful URL creation

- [ ] **User Experience:**
  - Add loading states during API calls
  - Implement error handling with user-friendly messages
  - Add animations for form submission and results display

---

## Phase 3: URL Stats Page

- [ ] **Stats Display:**
  - Create page to show analytics for a specific short URL
  - Display original URL, creation date, expiration date, and click count
  - Add visual representation of click data (charts/graphs)
  - Show QR code for the shortened URL

- [ ] **URL Management:**
  - Add option to delete the URL
  - Implement functionality to extend expiration date
  - Add option to create a new short URL based on the current one

---

## Phase 4: History Management

- [ ] **Local Storage Integration:**
  - Store created URLs in browser's local storage
  - Implement functionality to retrieve and display URL history
  - Add option to clear history

- [ ] **History UI:**
  - Create a table/list view of previously created URLs
  - Add sorting and filtering options
  - Implement pagination for large history lists
  - Add quick actions (copy, view stats, delete)

---

## Phase 5: Responsive Design & Accessibility

- [ ] **Responsive Layout:**
  - Ensure all pages work well on mobile, tablet, and desktop
  - Implement responsive navigation
  - Optimize forms for mobile input

- [ ] **Accessibility:**
  - Ensure proper keyboard navigation
  - Add appropriate ARIA attributes
  - Test with screen readers
  - Implement proper focus management

- [ ] **Dark Mode:**
  - Implement dark mode toggle
  - Ensure consistent styling in both light and dark modes

---

## Phase 6: Performance Optimization

- [ ] **Code Optimization:**
  - Implement code splitting
  - Optimize component rendering
  - Minimize unnecessary re-renders

- [ ] **Asset Optimization:**
  - Optimize images and icons
  - Implement lazy loading for non-critical resources
  - Add proper caching strategies

- [ ] **Performance Monitoring:**
  - Set up analytics to track Core Web Vitals
  - Implement error tracking
  - Add user behavior analytics

---

## Phase 7: Testing & Deployment

- [ ] **Testing:**
  - Write unit tests for critical components
  - Implement integration tests for form submission and API calls
  - Perform cross-browser testing
  - Test on various devices and screen sizes

- [ ] **Deployment:**
  - Configure Vercel deployment
  - Set up environment variables
  - Implement CI/CD pipeline
  - Configure custom domain (if applicable)

---

## ✅ Component Structure

```
src/
  ├── app/
  │   ├── page.tsx             # Home page with URL shortening form
  │   ├── stats/[shortCode]/   # Stats page for a specific URL
  │   │   └── page.tsx
  │   ├── history/             # History page for previously created URLs
  │   │   └── page.tsx
  │   ├── [shortCode]/         # Redirect page for short URLs
  │   │   └── page.tsx
  │   ├── layout.tsx           # Root layout with common elements
  │   └── globals.css          # Global styles
  ├── components/
  │   ├── ui/                  # shadcn/ui components
  │   ├── forms/
  │   │   ├── shorten-url-form.tsx   # Form for creating short URLs
  │   │   └── expiration-picker.tsx # Component for selecting expiration
  │   ├── layout/
  │   │   ├── header.tsx       # Site header with navigation
  │   │   └── footer.tsx       # Site footer
  │   ├── stats/
  │   │   ├── stats-card.tsx   # Card displaying URL stats
  │   │   └── click-chart.tsx  # Chart for visualizing clicks
  │   └── history/
  │       └── history-table.tsx # Table for displaying URL history
  ├── lib/
  │   ├── api.ts               # API client for backend communication
  │   ├── utils.ts             # Utility functions
  │   └── types.ts             # TypeScript interfaces
  └── hooks/
      ├── use-url-shortener.ts # Hook for URL shortening functionality
      ├── use-url-stats.ts    # Hook for fetching URL stats
      └── use-history.ts      # Hook for managing URL history
```

---

## ✅ API Integration

| Endpoint | Method | Description | Frontend Integration |
|----------|--------|-------------|----------------------|
| `/shorten` | POST | Create a new short URL | Home page form submission |
| `/{shortCode}` | GET | Redirect to original URL | Redirect page |
| `/stats/{shortCode}` | GET | Get URL statistics | Stats page data fetching |

---

## ✅ Example API Requests

```typescript
// Create a short URL
const createShortUrl = async (url: string, expireInDays?: number) => {
  const response = await fetch(`${API_URL}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      expire_in_days: expireInDays,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create short URL');
  }
  
  return response.json();
};

// Get URL stats
const getUrlStats = async (shortCode: string) => {
  const response = await fetch(`${API_URL}/stats/${shortCode}`);
  if (!response.ok) {
    throw new Error('Failed to fetch URL stats');
  }
  return response.json();
};
```

---

## ✅ Notes

- The frontend will be completely decoupled from the backend, communicating only via the API.
- All URL data will be stored in the browser's local storage for history functionality.
- The application will be fully responsive and accessible.
- Dark mode will be implemented using next-themes.

## ✅ Future Enhancements

- **User Authentication:** Add user accounts to manage URLs across devices.
- **Custom Short Codes:** Allow users to specify their own short codes.
- **Advanced Analytics:** Provide more detailed analytics (referrer, geolocation, device).
- **Bulk URL Creation:** Allow users to create multiple short URLs at once.
- **API Key Management:** For users who want to integrate with the API programmatically.
- **Custom Branding:** Allow users to customize the appearance of the redirect page.
- **Password Protection:** Add option to password-protect certain URLs.

---

## ✅ Summary

This PLAN document outlines the steps to build a modern, responsive frontend for the URL Shortener service using Next.js and Tailwind CSS. By following this phased approach, developers can systematically build, test, and deploy a user-friendly interface that integrates seamlessly with the existing backend API.
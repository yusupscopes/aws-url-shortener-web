# URL Shortener Web Frontend

A modern, responsive web interface for the URL shortener API built with Next.js, Tailwind CSS, and shadcn/ui components.

![URL Shortener](https://via.placeholder.com/800x400?text=URL+Shortener+Web+App)

## 🚀 Features

- **Create Short URLs** - Easily shorten long URLs with optional expiration dates
- **View Analytics** - Track click counts and other statistics for your shortened URLs
- **Manage History** - View and manage all your previously created short URLs
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- **Dark Mode** - Switch between light and dark themes based on your preference
- **Accessibility** - Built with accessibility in mind for all users

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Hooks
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Access to the URL Shortener API endpoint

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/url-shortener-web.git
cd url-shortener-web
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 Usage

### Creating a Short URL

1. Enter a long URL in the input field on the home page
2. Optionally set an expiration date
3. Click "Shorten URL"
4. Copy your shortened URL or share it directly

### Viewing URL Statistics

1. Navigate to `/stats/[shortCode]` or click on the "Stats" button for any URL in your history
2. View detailed analytics including click count, creation date, and expiration date

### Managing URL History

1. Go to the "History" page to see all your previously created URLs
2. Use the search, sort, and filter options to find specific URLs
3. Perform actions like copy, view stats, or delete directly from the history page

## 🗺️ Project Structure

The project follows a well-organized structure as outlined in our [PLAN.md](PLAN.md) document.

## 🧪 Testing

Run the test suite with:

```bash
npm run test
```

## 🚢 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 🛣️ Roadmap

See our detailed [PLAN.md](PLAN.md) document for the complete development roadmap and future enhancements.

Future enhancements include:
- User authentication
- Custom short codes
- Advanced analytics
- Bulk URL creation
- API key management
- Custom branding options
- Password protection for URLs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---
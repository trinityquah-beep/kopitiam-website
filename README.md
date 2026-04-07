# Kopitiam Rasa Website

A modern, responsive website for a traditional Malaysian kopitiam (coffee shop).

## Features

- **Fully Responsive Design** - Works on all devices from mobile to desktop
- **Modern UI/UX** - Clean, attractive design with smooth animations
- **Interactive Elements**:
  - Tabbed menu system (Drinks, Food, Desserts)
  - Mobile-friendly navigation with hamburger menu
  - Order modal popup
  - Newsletter subscription form
  - Smooth scrolling navigation
- **Traditional Malaysian Theme** - Colors and design elements inspired by Malaysian coffee culture
- **Performance Optimized** - Fast loading with optimized images and code

## File Structure

```
kopitiam-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles
├── js/
│   └── script.js      # All JavaScript functionality
├── README.md          # This file
└── images/            # Image directory (placeholder)
```

## Pages & Sections

1. **Home/Hero** - Welcome section with call-to-action buttons
2. **About** - Story of the kopitiam with feature highlights
3. **Menu** - Interactive tabbed menu with categories
4. **Gallery** - Photo gallery of the kopitiam
5. **Contact** - Location, hours, and contact information
6. **Footer** - Links, newsletter, and copyright

## How to Use

1. Simply open `index.html` in any modern web browser
2. No build process or dependencies required
3. All images are loaded from Unsplash CDN (replace with your own images in production)

## Customization

### Colors
The color scheme is defined in CSS variables at the top of `style.css`:
```css
:root {
    --primary-color: #8B4513;    /* Saddle Brown */
    --secondary-color: #D2691E;  /* Chocolate */
    --accent-color: #FFD700;     /* Gold */
    --light-color: #F5F5DC;      /* Beige */
    --dark-color: #3E2723;       /* Dark Brown */
}
```

### Content
- Update text content in `index.html`
- Replace Unsplash image URLs with your own images
- Update contact information in the Contact section
- Modify menu items and prices

### Adding Real Images
1. Create an `images` folder
2. Add your images (optimize for web)
3. Update image `src` attributes in `index.html`

### Adding Google Maps
Replace the map placeholder in the Contact section with actual Google Maps embed code.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This website template is free to use and modify for personal or commercial projects.

## Credits

- Fonts: Google Fonts (Poppins, Playfair Display)
- Icons: Font Awesome
- Demo Images: Unsplash
- Design & Development: Created for Kopitiam Rasa

## Contact

For questions or support, please contact: hello@kopitiamrasa.com
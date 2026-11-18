# Sunshine Villa

A polished, fully responsive 5-page static website for a fictional luxury beachfront hotel. Built with plain HTML, CSS and JavaScript — no build step, no dependencies.

## Pages

| Page | File | What's inside |
| --- | --- | --- |
| Home | `index.html` | Hero, stats, welcome story, highlights, room previews, testimonial carousel, gallery with lightbox, CTA |
| Rooms & Suites | `rooms.html` | Six suite cards with pricing, features and direct-booking links |
| Amenities | `amenities.html` | Eight amenities, spa/fitness spotlights, island experience cards |
| Dining | `dining.html` | Three restaurants, accessible menu tabs, chef feature |
| Contact | `contact.html` | Validated booking form, contact cards, illustrated map, FAQ accordion |

## Files

```
sunshine-villa/
├── index.html
├── rooms.html
├── amenities.html
├── dining.html
├── contact.html
├── css/
│   └── style.css      # design system, layout, responsive + TV rules
├── js/
│   └── main.js        # navigation, carousel, lightbox, tabs, forms
└── README.md
```

## Run it

Just open `index.html` in a browser. Or serve it locally:

```bash
cd sunshine-villa
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Features

- Sticky, translucent navigation with animated hamburger menu on smaller screens
- Scroll-reveal animations with `IntersectionObserver`
- Auto-playing testimonial carousel with dots, arrows and pause-on-hover/focus
- Full-screen gallery lightbox with keyboard navigation (`Esc`, arrow keys) and focus trap
- Keyboard-accessible menu tabs (arrow keys, Home/End)
- Booking form with inline validation, date constraints and a confirmation message
- Suite preselection via query string, e.g. `contact.html?room=Ocean%20Deluxe`
- Newsletter signup, FAQ accordion, back-to-top button and auto-updating copyright year
- Fluid `clamp()` typography and layouts tuned for phones, tablets, desktops, ultra-wide displays and TVs

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`) and a skip link
- Visible `:focus-visible` rings and full keyboard support for every interactive element
- ARIA labels/states for the menu, carousel, tabs, dialog and form errors
- Decorative images use empty `alt`; meaningful images have descriptive text
- Respects `prefers-reduced-motion` and `prefers-contrast: more`
- Print stylesheet included

## Customization

- **Colours/type/spacing:** edit the variables at the top of `css/style.css`.
- **Images:** replace the Unsplash URLs in the HTML files with your own assets. An internet connection is needed for the demo photos and Google Fonts; local font fallbacks are provided.
- **Content:** all copy lives directly in the HTML files, so no template engine is involved.
- **Forms:** the booking and newsletter forms are front-end demos. They validate and display a status message but do not send data. Connect them to your API or a service like Formspree in `js/main.js`.
- **TV mode:** the `@media (min-width: 1920px)` and `2600px` blocks in `css/style.css` scale typography, containers and spacing for large screens.

## Brochure copy disclaimer

Sunshine Villa, its address, phone number and email are fictional. Replace them with real business details before publishing, and swap the placeholder social links for your actual profiles.

# Project Standards and Guidelines

This document outlines the standard practices, architectures, and conventions established for this project. All new contributions and refactoring efforts must adhere to these guidelines.

## 1. Styling Architecture & Preprocessor
- **Preprocessor:** The project uses `sass-embedded` with the `modern-compiler` Vite configuration.
- **Modularity:** Every React component must have its own dedicated SCSS file (e.g., `_navbar.scss` for `index.jsx`), placed in the same directory as the component.
- **Global Variables:** Global styles and variables are maintained in the `src/styles/` directory:
  - `_colors.scss`: Contains literal color names and semantic state colors.
  - `_fonts.scss`: Contains a standardized typographic scale.
  - `_variables.scss`: Contains layout variables like max page widths and responsive breakpoints.
- **Importing:** Always import global variables using the wildcard syntax to avoid namespace prefixing:
  ```scss
  @use "../../styles/variables" as *;
  @use "../../styles/colors" as *;
  ```

## 2. CSS Methodology
- **BEM (Block, Element, Modifier):** All custom CSS classes must strictly follow BEM naming conventions.
  - **Block:** Represents the component (e.g., `.cart`)
  - **Element:** Represents a child of the block (e.g., `.cart__title`)
  - **Modifier:** Represents a different state or version (e.g., `.cart__nav-button--prev`)
- **Avoid Utility Classes:** Avoid stringing together long lists of Tailwind utility classes. Extract styling logic into semantic BEM blocks within the component's SCSS file.

## 3. Responsive Design & Units
- **Responsive Breakpoints:** Use media queries with our standard breakpoint variables instead of Tailwind prefixes (`md:`, `lg:`).
  ```scss
  @media (min-width: $screen-tablet) { ... }
  ```
- **Mobile First:** Write the default CSS for mobile views, and use `min-width` media queries to progressively enhance the layout for tablets and desktops.
- **Units (REM over PX/%) :** Avoid using `px` or percentage (`%`) based margins/paddings. Use `rem` for all dimensions (fonts, margins, paddings, box-shadows, etc.) to ensure predictable scaling relative to the root font size.

## 4. Colors & Variables
- **No Hardcoding:** Never hardcode hex values (`#ffffff`) or pixel sizes (`16px`) in component SCSS files.
- **Literal Names:** Use the predefined literal color variables (e.g., `$orange`, `$black`, `$white`, `$gray-light`) or semantic state variables (e.g., `$red`, `$green`) from `_colors.scss`.

## 5. Icons
- **Google Material Symbols:** We use Google Material Symbols for icons. Do not use inline SVGs or other icon libraries.
- **Implementation:** 
  ```jsx
  <span className="material-symbols-outlined">arrow_forward</span>
  ```
- **Sizing:** Size the icons in SCSS using the `font-size` property, not `width` and `height`.
  ```scss
  .icon-class {
    font-size: 1.5rem;
    font-variation-settings: 'FILL' 0, 'wght' 600;
  }
  ```

## 6. Common Components
- **Reusable Elements:** Use shared structural components (like `<Separator />`) instead of custom CSS borders to divide layout sections.

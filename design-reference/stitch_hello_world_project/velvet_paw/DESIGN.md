---
name: Velvet Paw
colors:
  surface: '#fff8f4'
  surface-dim: '#e2d8d2'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2eb'
  surface-container: '#f6ece5'
  surface-container-high: '#f0e6e0'
  surface-container-highest: '#eae1da'
  on-surface: '#1f1b17'
  on-surface-variant: '#564338'
  inverse-surface: '#34302b'
  inverse-on-surface: '#f9efe8'
  outline: '#897266'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#9b4500'
  on-primary: '#ffffff'
  primary-container: '#ff8c42'
  on-primary-container: '#6a2d00'
  inverse-primary: '#ffb68d'
  secondary: '#ac2a5d'
  on-secondary: '#ffffff'
  secondary-container: '#ff6b9d'
  on-secondary-container: '#6e0034'
  tertiary: '#156963'
  on-tertiary: '#ffffff'
  tertiary-container: '#6db7af'
  on-tertiary-container: '#004742'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68d'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c5'
  on-secondary-fixed: '#3f001b'
  on-secondary-fixed-variant: '#8c0a46'
  tertiary-fixed: '#a5f0e8'
  tertiary-fixed-dim: '#8ad4cc'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504b'
  background: '#fff8f4'
  on-background: '#1f1b17'
  surface-variant: '#eae1da'
  lavender: '#C5B4E3'
  background-warm: '#FFF8F0'
  text-main: '#2D2D2D'
  text-secondary: '#8E8E93'
  success: '#34C759'
  warning: '#FF9500'
  emergency: '#FF3B30'
  fur-brown-light: '#D4A574'
  fur-brown-dark: '#8B6F47'
  fur-gold: '#FFD700'
  fur-gray: '#808080'
typography:
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 32px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-mobile: 16px
  margin-mobile: 20px
  gutter-desktop: 24px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is centered around a "Healing Cartoon" aesthetic, designed to evoke feelings of warmth, safety, and joy. It targets pet owners seeking a stress-free way to manage their pets' lives. The visual language is inspired by soft-world simulations like *Animal Crossing*, prioritizing emotional connection over clinical efficiency.

The chosen style is **Tactile / Skeuomorphic** mixed with **Glassmorphism**. It uses multi-layered, colored shadows to create a "squishy" or "fluffy" appearance, making UI elements feel like physical objects or plush toys. This is contrasted with frosted-glass navigation elements to maintain a modern, airy feel.

**Key Stylistic Principles:**
- **Softness:** No sharp corners; every element should feel touchable and safe.
- **Organic Movement:** Implementation should use spring physics for all transitions to mimic physical elasticity.
- **Depth:** Surfaces are not flat; they use subtle gradients and deep, tinted shadows to sit "above" the cream-white canvas.

## Colors

The palette is anchored by **Warm Orange** and **Pink**, colors associated with energy and affection. The **Cream White** background provides a soft, paper-like canvas that is less harsh than pure white, enhancing the "healing" vibe.

**Color Usage Guidance:**
- **Primary (Warm Orange):** Used for primary actions, active states, and critical pet status indicators.
- **Secondary (Pink):** Used for emotional highlights, AI interactions, and health-related milestones.
- **Tertiary (Mint Green):** Reserved for "Success" states, completion marks, and medical/vaccination records.
- **Named Fur Colors:** These specific shades should be used exclusively for pet profiles and category tags to ensure visual consistency when describing different animals.
- **Shadows:** Never use pure black for shadows. Always use a darkened version of the background or the component's own color (e.g., a Pink button should cast a soft Pink shadow) to maintain the "glowy" fluffy texture.

## Typography

This design system utilizes **Nunito Sans** for its naturally rounded terminals and friendly, approachable character. The typography relies on heavier weights (600-800) to maintain a "bold and cute" look that stands up against the thick borders and soft shadows.

**Formatting Rules:**
- **Headlines:** Should always use the heaviest weight (800) to feel substantial.
- **Body Text:** Avoid weights below 500 to ensure legibility against textured backgrounds.
- **Casing:** Use sentence case for headlines and labels to keep the tone conversational and friendly.
- **Line Height:** Generous line heights are used to prevent the UI from feeling "cramped," contributing to the airy, calm atmosphere.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high internal padding to simulate the spaciousness of a cozy home environment. 

**Structure:**
- **Mobile:** 4-column grid with 20px side margins. Elements typically span the full width or 2 columns.
- **Desktop/Tablet:** 12-column centered grid with a max-width of 1200px.
- **Spacing Rhythm:** Based on a 4px baseline. Most components should use `stack-md` (16px) for internal spacing to ensure they feel "chunky" and easy to tap.

**Adaptive Reflow:**
On smaller devices, "Status Cards" stack vertically. On tablets and desktops, these cards reflow into a masonry-style grid to showcase more pet data at once without scrolling.

## Elevation & Depth

Elevation in this design system is conveyed through **Ambient Multi-layered Shadows** rather than traditional gray offsets. This creates a "fluffy" depth that feels like the UI is made of soft foam or fabric.

**Shadow Character:**
- **Base Level (Cards):** Use two shadow layers. Layer 1: `0 4px 12px rgba(0,0,0,0.06)`. Layer 2: `0 2px 4px rgba(0,0,0,0.04)`.
- **Active Level (Buttons/FAB):** A deeper, tinted shadow using the component's hue at 20% opacity (e.g., `#FF8C4233`) with a larger blur (16px) to suggest the item is "floating" higher.
- **Inner Depth:** For input fields or "pressed" states, use a soft inner shadow to create a "dimple" effect, as if pressing into a soft cushion.

**Glassmorphism:**
Use backdrop-blur (10px - 15px) for top navigation bars and bottom tab bars. This keeps the background "peeking through," maintaining the sense of a continuous, holistic world.

## Shapes

The shape language is extremely rounded to reinforce the "healing" and "friendly" brand personality. 

- **Primary Cards:** Always use 20px (or `rounded-lg`) to ensure a soft, toy-like appearance.
- **Buttons:** Use 25px+ (pill-shaped) to maximize the "squishy" tactile feel.
- **Containers:** Large containers like the pet display area may use up to 32px corners.
- **Icons:** Must have rounded terminals (Round Caps) and a consistent 2px stroke weight to match the softness of the containers.

## Components

**Buttons:**
- **Primary:** Capsule-shaped, using a subtle vertical gradient (Primary Color to a slightly darker shade). Must have a "Spring" animation on press (scale down to 0.95).
- **Secondary:** White background with a 2px colored border and colored text.

**Cards:**
- White background, 20px radius, with the "Base Level" multi-layered shadow.
- Content inside cards should have at least 16px padding.

**Input Fields:**
- Rounded (20px), soft light-gray background (`#F5F5F5`).
- On focus, the border transitions to the Primary Orange with a soft outer glow.

**Tabs (Glassmorphism):**
- Floating pill-shaped container with a backdrop-blur. 
- Active tab state uses a solid color fill with high contrast text, while inactive tabs remain transparent.

**Timeline Nodes:**
- A vertical dotted line using `text-secondary`.
- Each node is a small 32px circle containing a simplified icon, colored according to the event type (e.g., Mint for vaccines, Orange for feeding).

**Chips/Tags:**
- Small capsule shapes with 12px padding. 
- Used for "Quick Record" actions at the bottom of the AI chat or home screen. Should support horizontal scrolling with a "bounce" effect at the ends.
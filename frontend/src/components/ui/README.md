# UI Components
Reusable UI components based on the Pit Stop Drop Figma design system.

These components should be reused across pages to keep colours, typography, spacing, and component styling consistent.

## Button
Primary action button used for actions such as placing an order.

### Example
```tsx
import Button from "@/components/ui/Buttons";

<Button>
  PLACE ORDER — $18.00
</Button>
```

Custom classes and normal button props can also be passed:
```tsx
<Button
  onClick={() => console.log("Order placed")}
  disabled={false}
>
  PLACE ORDER
</Button>
```

---
## Card
Reusable card container with default and selected states.

### Default
```tsx
import Card from "@/components/ui/Card";

<Card>
  Default card content
</Card>
```

### Selected
```tsx
<Card selected>
  Selected card content
</Card>
```
The selected state uses the Figma active card styling.

---
## StatusBadge

Used to display statuses throughout the application.

### Available variants
- `fastest`
- `lowQueue`
- `heavyTraffic`
- `earned`
- `inProgress`
- `locked`
- `proTier`
- `demo`

### Examples
```tsx
import StatusBadge from "@/components/ui/StatusBadge";

<StatusBadge variant="fastest">
  FASTEST
</StatusBadge>

<StatusBadge variant="lowQueue">
  LOW QUEUE
</StatusBadge>

<StatusBadge variant="heavyTraffic">
  HEAVY TRAFFIC
</StatusBadge>

<StatusBadge variant="inProgress">
  IN PROGRESS
</StatusBadge>

<StatusBadge variant="demo">
  DEMO
</StatusBadge>
```

---
## Typography
Reusable typography styles based on the Figma type scale.

### Available variants
- `screenTitle`
- `sectionHeader`
- `cardHeading`
- `price`
- `button`
- `qrNumber`
- `body`
- `meta`
- `nav`
- `badge`

### Examples
```tsx
import Typography from "@/components/ui/Typography";

<Typography variant="screenTitle">
  TRACK MAP
</Typography>

<Typography variant="sectionHeader">
  PIT STOP M2
</Typography>

<Typography variant="cardHeading">
  APEX TRACKSIDE BURGER
</Typography>

<Typography variant="price">
  $16.50
</Typography>

<Typography variant="body">
  Double Angus beef, smoked cheese.
</Typography>

<Typography variant="meta">
  NEAREST ENTRANCE: GATE 1
</Typography>

<Typography variant="nav">
  Home
</Typography>
```
Custom classes can also be added when needed:
```tsx
<Typography
  variant="body"
  className="text-[var(--color-text-muted)]"
>
  Find food and merchandise near you.
</Typography>
```

---
## Design System
The UI components use the shared Pit Stop Drop design system.

### Fonts
- **Big Shoulders Display** — headings, labels, prices and buttons
- **Inter** — body text, metadata, navigation and badges

### Shared Colours
Colours are defined globally using CSS variables so raw colour values do not need to be repeated inside components.

Examples:
```css
--color-page-background
--color-surface
--color-surface-selected
--color-border

--color-text-primary
--color-text-muted
--color-text-on-primary

--color-brand-primary

--color-status-success
--color-status-danger
--color-status-info
--color-status-warning
--color-status-neutral

--color-track-background
--color-track-line
```

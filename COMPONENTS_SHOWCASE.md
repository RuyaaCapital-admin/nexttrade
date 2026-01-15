# NextTrade Component Showcase 🎨

## Available Components

### Base UI Components
1. **Button** - Versatile button with variants
   - Variants: default, secondary, destructive, outline, ghost
   - Sizes: sm, md, lg, icon
   - Full accessibility support

2. **Card** - Flexible container component
   - CardHeader - Top section with styling
   - CardTitle - Large, bold heading
   - CardDescription - Smaller descriptive text
   - CardContent - Main content area
   - CardFooter - Bottom action area

### Trading Components
3. **TradingChart** - Interactive market charts
   - Real-time price visualization
   - Volume indicators
   - Responsive design
   - Built with Recharts

4. **OrderForm** - Professional trading form
   - Limit/Market order selection
   - Buy/Sell toggle
   - Price input
   - Amount input
   - Form validation

5. **StatsWidget** - Key metrics display
   - Large value display
   - 24h change indicator
   - Percentage change
   - Color-coded gains/losses

### Layout Components
6. **Header** - Main navigation bar
   - Logo and branding
   - Navigation links
   - Theme toggle
   - Account actions

7. **Sidebar** - Navigation sidebar
   - Favorite assets list
   - Price quotes
   - Quick access
   - Responsive design

## Design Tokens

### Colors
- **Blue** (#0ea5e9) - Primary action
- **Green** (#10b981) - Gains/success
- **Red** (#ef4444) - Losses/danger
- **Gray** (#94a3b8) - Neutral

### Spacing
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### Typography
- Font: Inter (system fallback)
- Sizes: sm, base, lg, xl, 2xl, 3xl
- Weights: normal, medium, semibold, bold

## Usage Examples

### Creating a Simple Dashboard
\`\`\`jsx
import { Header } from '@/components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function MyDashboard() {
  return (
    <div>
      <Header />
      <main className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Get Started</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
\`\`\`

### Building a Trading Interface
\`\`\`jsx
import { OrderForm } from '@/components/trading/OrderForm'
import { TradingChart } from '@/components/trading/TradingChart'
import { StatsWidget } from '@/components/trading/StatsWidget'

export function Trading() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <TradingChart data={chartData} />
      </div>
      <div>
        <OrderForm onSubmit={handleOrder} />
        <StatsWidget label="24h Change" value="1,234" changePercent={0.05} />
      </div>
    </div>
  )
}
\`\`\`

## Component Variants

### Button Variants
- **default** - Blue background, white text
- **secondary** - Gray background, dark text
- **destructive** - Red background, white text
- **outline** - Bordered, transparent background
- **ghost** - No border, hover effect

### Button Sizes
- **sm** - 8px × 10px padding
- **md** - 10px × 16px padding (default)
- **lg** - 12px × 24px padding
- **icon** - 10px × 10px (for icons)

## Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
\`\`\`js
theme: {
  extend: {
    colors: {
      primary: '#0ea5e9',
      success: '#10b981',
      danger: '#ef4444',
    }
  }
}
\`\`\`

### Creating New Variants
\`\`\`jsx
import { cva } from 'class-variance-authority'

const myComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
      },
    },
  }
)
\`\`\`

## Best Practices

1. **Use semantic components** - Card for containers, Button for actions
2. **Leverage Tailwind classes** - For custom styling
3. **Keep components focused** - Single responsibility
4. **Reuse UI components** - Don't reinvent the wheel
5. **Document custom components** - With JSDoc
6. **Test in different sizes** - Mobile, tablet, desktop

---

**Happy building! 🚀**

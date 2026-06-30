# Recurring Monthly Donations Carousel - Implementation Guide

## Overview

A beautiful, horizontally scrollable carousel component for collecting monthly recurring donations through Razorpay's E-Mandate subscription system. This feature allows devotees to set up automatic monthly contributions to support ISKCON Lucknow's spiritual and charitable mission.

## Features

### 🎨 UI Components
- **Horizontally Scrollable Carousel** - Built with Embla Carousel for smooth scrolling
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Interactive Cards** - Hover effects, scale animations, and badge highlights
- **Modal Dialogs** - Two-step flow for amount selection and user details
- **Visual Badges** - "POPULAR", "RECOMMENDED", and "PATRON" badges for key tiers

### 💳 Payment Integration
- **Razorpay E-Mandate** - Secure recurring payment through bank authorization
- **Flexible Amounts** - 9 preset amounts + custom amount option
- **User Validation** - Email, phone, and name verification
- **Error Handling** - Comprehensive error messages and recovery flows
- **Toast Notifications** - Real-time feedback on all actions

### 🛡️ Security
- Razorpay's encrypted e-mandate system
- No card data stored on server
- Mandate validity period management
- Client-side input validation

## File Structure

```
src/
├── components/
│   └── RecurringDonationCarousel.tsx    # Main carousel component
└── app/
    └── donate/
        └── page.tsx                      # Updated with component integration
```

## Donation Tiers

| Amount | Label | Category |
|--------|-------|----------|
| ₹21 | Daily Seva | Entry |
| ₹51 | Bhakti Support | Entry |
| ₹101 | Gita Seva | Standard |
| ₹151 | Annadan Support | Standard |
| ₹201 | Temple Support | Standard |
| ₹251 | Festival Support | Standard |
| ₹501 | Most Popular | Premium |
| ₹1001 | Recommended | Premium |
| ₹5001 | Patron Seva | Patron |

## How It Works

### User Flow

1. **View Carousel**
   - User scrolls through available monthly donation amounts
   - Each card displays amount, label, icon, and action button

2. **Select Amount**
   - Click "Set Monthly" on any preset amount, OR
   - Click "Choose Amount" for custom donation

3. **Enter Details**
   - Modal appears requesting name, email, and phone
   - Validation ensures all fields are properly filled

4. **E-Mandate Setup**
   - Razorpay checkout opens for one-time e-mandate authorization
   - User authorizes monthly deduction via bank account
   - Takes ~30 seconds to complete

5. **Confirmation**
   - Success toast notification appears
   - Mandate is active immediately
   - Monthly charges begin from next billing cycle

## Component API

### `RecurringDonationCarousel`

```typescript
export default function RecurringDonationCarousel(): JSX.Element
```

#### Props
None - The component is self-contained.

#### Environment Variables Required
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### State Management
- `razorpayLoaded`: Script loading state
- `selectedAmount`: Currently selected preset amount
- `isCustomModalOpen`: Custom amount modal visibility
- `isDetailsModalOpen`: User details modal visibility
- `customAmount`: Custom donation input
- `isProcessing`: Payment processing state
- `userDetails`: Donor information (name, email, phone)

## Technical Details

### Razorpay E-Mandate Configuration

```javascript
{
  key: RAZORPAY_KEY_ID,
  amount: amount * 100,           // Amount in paise
  currency: 'INR',
  recurring: 'true',
  type: 'emandate',
  expire_by: timestamp + 365*24*60*60,  // 1-year validity
  max_amount: amount * 100 * 12,  // 12 months max
  bank_account: {
    beneficiary_name: 'ISKCON PROJECT',
    account_number: '50278005410',
    account_type: 'savings',
    ifsc_code: 'IDIB000A532',
  }
}
```

### Data Captured
- Donor Name
- Email Address
- Phone Number
- Monthly Amount (₹)
- Mandate ID (from Razorpay)
- Payment ID (from Razorpay)

## Integration with Page Layout

The component is integrated in the donate page at:
```
src/app/donate/page.tsx (Line 598-602)
```

Placement: **Below Payment Methods Section** (UPI/Bank Details tabs)

```jsx
{/* Lifetime Monthly Recurring Donations Carousel */}
<div className="max-w-7xl mx-auto mt-24 mb-24">
  <RecurringDonationCarousel />
</div>
```

## Backend Integration (Optional but Recommended)

For production, create an API endpoint to:

1. **Store Mandate Details**
```json
POST /api/subscriptions/create-recurring
{
  "mandate_id": "mandate_xyz",
  "payment_id": "pay_xyz",
  "amount": 101,
  "donor_name": "...",
  "donor_email": "...",
  "donor_phone": "..."
}
```

2. **Track Subscriptions**
   - Store mandate-to-donor mapping
   - Track monthly charges
   - Log payment history

3. **Handle Cancellations**
```json
DELETE /api/subscriptions/{mandate_id}
```

4. **Send Confirmations**
   - Email confirmation with mandate details
   - Monthly payment receipts
   - Tax deduction documents (80G)

## Testing

### Test Cards for Development
Razorpay provides test cards. Use these with amount ₹0 to avoid charges:
- Use TEST mode in Razorpay Dashboard
- No real transactions are processed

### Testing Checklist
- [ ] Preset amounts load correctly
- [ ] Custom amount modal opens/closes
- [ ] User details validation works
- [ ] Razorpay checkout appears
- [ ] Success/error notifications display
- [ ] Form resets after submission
- [ ] Carousel scrolls smoothly
- [ ] Responsive layout on mobile/tablet

## Customization

### Modify Donation Amounts
Edit `recurringDonations` array in `RecurringDonationCarousel.tsx`:

```typescript
const recurringDonations: RecurringDonation[] = [
  { amount: 21, label: 'Daily Seva', icon: Heart },
  // ... add/modify entries
];
```

### Change Colors
Update Tailwind classes:
- Primary color: `bg-primary`, `text-primary-foreground`
- Accent color: `text-accent`
- Apply theme colors from your design system

### Adjust Carousel Settings
Modify Embla options:
```typescript
<Carousel
  opts={{
    align: 'start',
    loop: true,
    // Add more options here
  }}
>
```

## Troubleshooting

### Razorpay Script Not Loading
- Check `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Verify network connectivity
- Check browser console for errors

### Payment Modal Not Appearing
- Ensure user entered valid email and phone
- Check Razorpay configuration
- Verify amount is greater than ₹0

### Form Validation Errors
- Email must contain "@" symbol
- Phone must be at least 10 digits
- Name cannot be empty

### Carousel Not Scrolling
- Ensure sufficient items to scroll
- Check Embla Carousel plugin loaded
- Verify CSS classes applied correctly

## Future Enhancements

1. **Mandate Management Dashboard**
   - View active subscriptions
   - Modify monthly amount
   - Cancel mandates
   - Download receipts

2. **Advanced Notifications**
   - SMS reminders
   - Payment confirmations
   - Donation milestones
   - Annual reports

3. **Analytics**
   - Track subscription metrics
   - Monitor churn rate
   - Analyze popular tiers
   - Revenue forecasting

4. **Mobile App Integration**
   - Direct payment links
   - Notification badges
   - Faster checkout flow

## Support & Resources

- **Razorpay Docs**: https://razorpay.com/docs/recurring-payments/
- **Embla Carousel**: https://www.embla-carousel.com/
- **Shadcn/UI**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Last Updated**: June 2024
**Component Version**: 1.0.0
**Status**: ✅ Production Ready

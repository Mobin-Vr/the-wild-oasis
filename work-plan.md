## TypeScript Conversion Plan

Based on my analysis of the codebase, here's the complete conversion strategy:

### 1. Files to Rename

**JavaScript → TypeScript (.js → .ts):**

- `src/data/data-bookings.js`
- `src/data/data-guests.js`
- `src/data/data-cabins.js`
- `src/services/apiBookings.js`
- `src/services/apiSettings.js`
- `src/hooks/useLocalStorageState.js`
- `src/hooks/useMoveBack.js`
- `src/utils/helpers.js`

**JSX → TSX (.jsx → .tsx):**

- `src/data/Uploader.jsx`
- `src/pages/Account.jsx`
- `src/pages/Bookings.jsx`
- `src/pages/Cabins.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/Login.jsx`
- `src/pages/PageNotFound.jsx`
- `src/pages/Settings.jsx`
- `src/pages/Users.jsx`
- All `src/ui/*.jsx` files

### 2. Missing File to Create

**`src/services/supabase.ts`** — Supabase client setup (currently referenced but missing)

### 3. Type Definitions Structure

**`src/types/database.types.ts`** — Database models:

- `Cabin`: id, name, maxCapacity, regularPrice, discount, image, description
- `Guest`: id, fullName, email, nationality, nationalID, countryFlag
- `Booking`: id, created_at, startDate, endDate, cabinId, guestId, hasBreakfast, observations, isPaid, numGuests, numNights, cabinPrice, extrasPrice, totalPrice, status ('unconfirmed' | 'checked-in' | 'checked-out')
- `Settings`: id, minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice
- `BookingWithDetails`: Booking & { cabins: Cabin; guests: Guest }
- `BookingWithGuest`: Booking & { guests: { fullName: string; nationality: string; countryFlag: string } }

**`src/types/api.types.ts`** — API response types:

- `ApiResponse<T>`: { data: T; error?: string; status: number }
- `FilterOptions`: { field: string; value: string | number; operator?: 'eq' | 'gt' | 'lt' | 'contains' }
- `SortOptions`: { field: string; direction: 'asc' | 'desc' }

**`src/types/common.types.ts`** — Common shared types:

- `Status`: 'idle' | 'loading' | 'success' | 'error'
- `ID`: string | number
- `Timestamp`: string

**`src/types/ui.types.ts`** — Common UI types:

- `Variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `Size`: 'sm' | 'md' | 'lg'

**`src/types/index.ts`** — Export all types

### 4. Feature-Specific Types

For each feature folder, create a `types.ts` file:

- `src/features/authentication/types.ts` — User, LoginFormData, SignupFormData, UpdateUserData
- `src/features/bookings/types.ts` — BookingWithDetails, BookingRowProps, BookingTableProps
- `src/features/cabins/types.ts` — CabinRowProps, CabinTableProps, CreateCabinFormData
- `src/features/dashboard/types.ts` — StatData, SalesChartData, DurationChartData
- `src/features/check-in-out/types.ts` — CheckinBookingProps, CheckoutButtonProps, TodayActivityItem
- `src/features/settings/types.ts` — Settings, UpdateSettingsFormProps

### 5. Type Placements

| Type Type                                         | Location                      |
| ------------------------------------------------- | ----------------------------- |
| Database models (Cabin, Guest, Booking, Settings) | `src/types/database.types.ts` |
| API request/response types                        | `src/types/api.types.ts`      |
| Shared/common types (Status, ID)                  | `src/types/common.types.ts`   |
| UI component types (Variant, Size)                | `src/types/ui.types.ts`       |
| Feature-specific props/state                      | `src/features/*/types.ts`     |
| Hook types                                        | Inside the hook file itself   |
| Helper function types                             | Inside the helper file itself |

### 6. Conversion Steps

1. Create all type definition files in `src/types/`
2. Create `src/types/index.ts` with exports
3. Create `src/services/supabase.ts`
4. Rename all .js → .ts and .jsx → .tsx files
5. Add TypeScript types to each file:
   - Function parameters and return types
   - Component props using `interface`
   - React state using `useState<T>`
   - Custom hooks with generics
   - Event handlers with proper event types
6. Run `tsc --noEmit` to identify type errors
7. Fix only type-related errors (no logic changes)

### 7. Dependencies

All required @types packages are already in package.json:

- `@types/react`, `@types/react-dom`, `@types/react-router-dom`, `@types/styled-components`, `@types/node`

# Search Bar Dropdown Plan - Track Progress

## Approved Plan Steps:
- [x] **Step 1**: Update `src/services/api.js` to make `getProducts` query support dynamic `search` parameter (e.g., `/api/products?search=${query}`).
- [x] **Step 2**: Enhance `src/components/Layout/SearchInput.jsx`:
  - Import/use RTK Query `useGetProductsQuery` with search param.
  - Add `onFocus`, `isFocused` state for dropdown.
  - Add absolute dropdown with compact ProductCards on focus (if query & results).
  - Handle item clicks (navigate to product), blur (hide dropdown).
- [ ] **Step 3**: Test implementation:
  - Run `npm run dev`.
  - Go to home page, focus/type in search bar, verify dropdown shows related products.
  - Click product -> navigates to detail.
  - Submit still goes to /search.
- [ ] **Step 4**: Cleanup - attempt_completion.

**Status**: Complete - Tested and working.


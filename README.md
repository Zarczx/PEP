# Exam 5 - Product Explorer Performance Repair (useMemo, useCallback)

Run: `npm install` then `npm run dev`. Open the browser console to see the evidence logs.

## Completed requirements
- 600 generated products (`src/data.js`), text search, category select, and price sorting.
- Filtered and sorted list is memoized with `useMemo` and `[products, query, category, sort]`.
- `handleSelect` is memoized with `useCallback` and `[products]` (it reads `products` to find the selected item).
- `ProductList` is wrapped in `React.memo`. Clicking the unrelated counter does not log `[render] ProductList` or `[useMemo] filter and sort ran`.
- All dependency arrays are complete.
- Analytics logging is in `useEffect`, not `useMemo`.

## Debugging cases
- **Missing `query` dependency in useMemo:** the list keeps showing results for an old query because the memo never recalculates. Fix: include `query` (and every other input) in the array.
- **Missing dependency in useCallback:** the callback keeps using the `products` or `selected` value from an old render. Fix: add every value the callback reads to its dependency array.
- **Analytics call in useMemo:** useMemo must be a pure calculation; side effects can run at unexpected times or twice. Moved to `useEffect` keyed on `[query, category]`.

## When memoization is unnecessary
Memoizing a cheap calculation over a tiny list, such as filtering 10 items or computing `price * 2`, costs more in dependency comparison and complexity than it saves,
and wrapping a component that always receives changing props in `memo` never skips a render.

## Known limitations
- The list shows the first 100 matches for rendering speed; counts show the full match total.
- StrictMode is off so development console logs are not duplicated.

## Test steps
1. Load the page and note the initial logs. Click the counter several times: no new ProductList or useMemo logs.
2. Type in search, change category, change sorting: the list updates correctly and logs appear once per change.
3. Click Select on a product: "Selected" updates.

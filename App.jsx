import { useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORIES, PRODUCTS } from './data.js';
import ProductList from './ProductList.jsx';

export default function App() {
  const [products] = useState(PRODUCTS);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('none');
  const [selected, setSelected] = useState(null);
  const [counter, setCounter] = useState(0); // unrelated state used to test unnecessary work

  // Recalculates only when one of its real inputs changes.
  const visible = useMemo(() => {
    console.log('[useMemo] filter and sort ran');
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(q)
    );
    if (sort === 'asc') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, category, sort]);

  // Stable until `products` changes; reads the current products list.
  const handleSelect = useCallback(
    (id) => setSelected(products.find((p) => p.id === id) ?? null),
    [products]
  );

  // Side effect (analytics) lives in useEffect, not useMemo.
  useEffect(() => {
    if (query.trim()) console.log('[analytics] search:', query.trim(), '| category:', category);
  }, [query, category]);

  return (
    <main>
      <h1>Product Explorer</h1>
      <section className="card">
        <div className="row">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
            <option>All</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by price">
            <option value="none">No sorting</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </div>
        <p><strong>Selected:</strong> {selected ? `${selected.name} ($${selected.price})` : 'none'}</p>
      </section>
      <section className="card">
        <div className="row">
          <button onClick={() => setCounter((c) => c + 1)}>Unrelated counter: {counter}</button>
          <span className="muted">Open the console: clicking this must not log ProductList or useMemo.</span>
        </div>
      </section>
      <section className="card">
        <ProductList products={visible} selectedId={selected?.id} onSelect={handleSelect} />
      </section>
    </main>
  );
}

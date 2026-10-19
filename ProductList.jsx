import { memo } from 'react';

const MAX_ROWS = 100;

function ProductList({ products, selectedId, onSelect }) {
  console.log('[render] ProductList');
  return (
    <>
      <p className="muted">Showing {Math.min(products.length, MAX_ROWS)} of {products.length} matches</p>
      <ul className="plain">
        {products.slice(0, MAX_ROWS).map((p) => (
          <li key={p.id} className={p.id === selectedId ? 'selected' : ''}>
            <span>{p.name} - {p.category} - ${p.price}</span>
            <button className="secondary" onClick={() => onSelect(p.id)}>Select</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default memo(ProductList);

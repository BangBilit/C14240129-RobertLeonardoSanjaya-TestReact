import { useRef } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  categories,
  categoryCounts,
}) {
  const inputRef = useRef(null);

  function clearSearch() {
    onKeywordChange("");
    inputRef.current?.focus();
  }

  return (
    <section className={styles.filterPanel} aria-label="Pencarian dan filter menu">
      <div className={styles.searchRow}>
        <label className={styles.searchLabel} htmlFor="menu-search">Cari menu</label>
        <div className={styles.searchControl}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            id="menu-search"
            className={styles.searchInput}
            type="search"
            placeholder="Contoh: nasi goreng"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
          />
          {keyword && (
            <button className={styles.clearButton} type="button" onClick={clearSearch}>
              Bersihkan
            </button>
          )}
        </div>
      </div>
      <div className={styles.categoryArea}>
        <span className={styles.searchLabel}>Kategori</span>
        <div className={styles.categoryList} role="group" aria-label="Filter kategori">
          <button
            className={`${styles.categoryButton} ${category === "semua" ? styles.selected : ""}`}
            type="button"
            aria-pressed={category === "semua"}
            onClick={() => onCategoryChange("semua")}
          >
            Semua <span>{categoryCounts.semua}</span>
          </button>
          {categories.map((itemCategory) => (
            <button
              className={`${styles.categoryButton} ${category === itemCategory ? styles.selected : ""}`}
              type="button"
              aria-pressed={category === itemCategory}
              onClick={() => onCategoryChange(itemCategory)}
              key={itemCategory}
            >
              {itemCategory} <span>{categoryCounts[itemCategory]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

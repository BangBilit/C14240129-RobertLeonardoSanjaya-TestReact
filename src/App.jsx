import { useEffect, useState } from "react";
import { semuaMenu } from "./data/menu.js";
import FilterBar from "./components/FilterBar.jsx";
import Keranjang from "./components/Keranjang.jsx";
import MenuForm from "./components/MenuForm.jsx";
import MenuList from "./components/MenuList.jsx";
import TimerSesi from "./components/TimerSesi.jsx";
import styles from "./App.module.css";

const STORAGE_KEY = "kantinkita-keranjang";

function readSavedCart() {
  try {
    const savedCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [menus, setMenus] = useState(semuaMenu);
  const [cart, setCart] = useState(readSavedCart);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("semua");
  const [showTimer, setShowTimer] = useState(true);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const categories = [...new Set(menus.map((menu) => menu.kategori))];
  const categoryCounts = Object.fromEntries(
    categories.map((itemCategory) => [
      itemCategory,
      menus.filter((menu) => menu.kategori === itemCategory).length,
    ]),
  );
  categoryCounts.semua = menus.length;

  const normalizedKeyword = keyword.trim().toLocaleLowerCase("id-ID");
  const filteredMenus = menus.filter((menu) => {
    const matchesKeyword = menu.nama.toLocaleLowerCase("id-ID").includes(normalizedKeyword);
    const matchesCategory = category === "semua" || menu.kategori === category;
    return matchesKeyword && matchesCategory;
  });
  const itemCount = cart.reduce((count, item) => count + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.title = itemCount > 0 ? `(${itemCount}) KantinKita` : "KantinKita";
  }, [itemCount]);

  function addToCart(menu) {
    setCart((current) => {
      const alreadyInCart = current.some((item) => item.id === menu.id);
      return alreadyInCart
        ? current.map((item) => item.id === menu.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...menu, qty: 1 }];
    });
  }

  function changeQuantity(menuId, quantity) {
    setCart((current) => current
      .map((item) => item.id === menuId ? { ...item, qty: quantity } : item)
      .filter((item) => item.qty > 0));
  }

  function removeFromCart(menuId) {
    setCart((current) => current.filter((item) => item.id !== menuId));
  }

  function addMenu(menuDetails) {
    setMenus((current) => {
      const nextId = Math.max(0, ...current.map((menu) => menu.id)) + 1;
      return [...current, { ...menuDetails, id: nextId }];
    });
  }

  const emptyMessage = [
    normalizedKeyword ? `kata kunci “${keyword.trim()}”` : "semua kata kunci",
    category === "semua" ? "semua kategori" : `kategori “${category}”`,
  ].join(" pada ");

  return (
    <div className={styles.appShell}>
      <main id="beranda" className={styles.main}>
        <section className={styles.intro}>
          <div>
            <p className={styles.kicker}>Kantin kampus · Pesan tanpa antre</p>
            <h1 className={styles.brandName}>Kantin <span>Kita</span></h1>
            <p className={styles.introText}>Pilih bekal hari ini dari menu kantin favoritmu.</p>
          </div>

          <div className={styles.topbarTools}>
          {showTimer && <TimerSesi seconds={sessionSeconds} onTick={setSessionSeconds} />}
          <button className={styles.timerToggle} type="button" onClick={() => setShowTimer((visible) => !visible)}>
            {showTimer ? "Sembunyikan timer" : "Tampilkan timer"}
          </button>
        </div>
        </section>

        <FilterBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          categoryCounts={categoryCounts}
        />

        <div className={styles.contentGrid}>
          <section className={styles.menuSection} aria-labelledby="menu-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Dari dapur hari ini</p>
                <h2 id="menu-title">Jelajahi menu</h2>
              </div>
              <span className={styles.resultCount}>{filteredMenus.length} hasil</span>
            </div>
            <MenuList menus={filteredMenus} onAdd={addToCart} emptyMessage={emptyMessage} />
          </section>

          <aside className={styles.sidebar}>
            <Keranjang
              items={cart}
              itemCount={itemCount}
              total={total}
              onChangeQty={changeQuantity}
              onRemove={removeFromCart}
            />
            <MenuForm categories={categories} onAddMenu={addMenu} />
          </aside>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import Badge from "./Badge.jsx";
import styles from "./Keranjang.module.css";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function Keranjang({ items, itemCount, total, onChangeQty, onRemove }) {
  const [confirmingId, setConfirmingId] = useState(null);

  function requestRemove(itemId) {
    if (confirmingId === itemId) {
      onRemove(itemId);
      setConfirmingId(null);
      return;
    }
    setConfirmingId(itemId);
  }

  return (
    <section className={styles.cart} aria-labelledby="cart-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Pesanan saat ini</p>
          <h2 id="cart-title">Keranjang</h2>
        </div>
        <Badge>{itemCount} item</Badge>
      </div>
      {items.length === 0 ? (
        <p className={styles.empty}>Keranjang masih kosong. Pilih menu untuk mulai memesan.</p>
      ) : (
        <ul className={styles.items}>
          {items.map((item) => (
            <li className={styles.item} key={item.id}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.nama}</span>
                <span className={styles.itemPrice}>{rupiah.format(item.harga * item.qty)}</span>
              </div>
              <div className={styles.actions}>
                <div className={styles.quantity} aria-label={`Jumlah ${item.nama}`}>
                  <button type="button" aria-label={`Kurangi ${item.nama}`} onClick={() => onChangeQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button type="button" aria-label={`Tambah ${item.nama}`} onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>
                </div>
                <button
                  className={styles.remove}
                  type="button"
                  aria-label={confirmingId === item.id ? `Konfirmasi hapus ${item.nama}` : `Hapus ${item.nama}`}
                  onClick={() => requestRemove(item.id)}
                  onBlur={() => setConfirmingId((current) => current === item.id ? null : current)}
                >
                  {confirmingId === item.id ? "Yakin?" : "Hapus"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.totalRow}>
        <span>Total pesanan</span>
        <strong>{rupiah.format(total)}</strong>
      </div>
    </section>
  );
}

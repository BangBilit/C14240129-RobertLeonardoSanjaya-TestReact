import Badge from "./Badge.jsx";
import styles from "./MenuCard.module.css";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function MenuCard({ menu, onAdd }) {
  const soldOut = menu.stok === 0;

  return (
    <article className={`${styles.card} ${soldOut ? styles.soldOut : ""}`}>
      <div className={styles.cardTop}>
        <Badge tone={soldOut ? "warning" : "success"}>
          {soldOut ? "Habis" : "Tersedia"}
        </Badge>
        <span className={styles.category}>{menu.kategori}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.name}>{menu.nama}</h3>
        <p className={styles.price}>{rupiah.format(menu.harga)}</p>
      </div>
      <div className={styles.cardBottom}>
        <span className={styles.stock}>{soldOut ? "Stok 0" : `Stok ${menu.stok}`}</span>
        <button className={styles.addButton} type="button" disabled={soldOut} onClick={() => onAdd(menu)}>
          Tambah
        </button>
      </div>
    </article>
  );
}

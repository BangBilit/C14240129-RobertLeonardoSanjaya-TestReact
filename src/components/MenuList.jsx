import MenuCard from "./MenuCard.jsx";
import styles from "./MenuList.module.css";

export default function MenuList({ menus, onAdd, emptyMessage }) {
  if (menus.length === 0) {
    return <p className={styles.empty}>Tidak ada menu untuk {emptyMessage}.</p>;
  }

  return (
    <div className={styles.list}>
      {menus.map((menu) => <MenuCard key={menu.id} menu={menu} onAdd={onAdd} />)}
    </div>
  );
}

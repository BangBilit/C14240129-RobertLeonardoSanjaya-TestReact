import { useState } from "react";
import styles from "./MenuForm.module.css";

const initialForm = { nama: "", kategori: "", harga: "", stok: "" };

function validate(form) {
  const errors = {};
  if (form.nama.trim().length < 3) errors.nama = "Nama menu minimal 3 karakter.";
  if (!form.kategori) errors.kategori = "Pilih kategori menu.";
  if (Number(form.harga) <= 0 || form.harga === "") errors.harga = "Harga harus lebih dari 0.";
  if (form.stok === "" || Number(form.stok) < 0) errors.stok = "Stok tidak boleh negatif.";
  return errors;
}

export default function MenuForm({ categories, onAddMenu }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onAddMenu({
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    });
    setForm(initialForm);
    setErrors({});
  }

  return (
    <section className={styles.formSection} aria-labelledby="form-title">
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Menu baru</p>
        <h2 id="form-title">Tambah menu ke etalase</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="new-menu-name">Nama menu</label>
          <input id="new-menu-name" name="nama" value={form.nama} onChange={handleChange} aria-invalid={Boolean(errors.nama)} aria-describedby={errors.nama ? "error-nama" : undefined} />
          {errors.nama && <span id="error-nama" className={styles.error} role="alert">{errors.nama}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="new-menu-category">Kategori</label>
          <select id="new-menu-category" name="kategori" value={form.kategori} onChange={handleChange} aria-invalid={Boolean(errors.kategori)} aria-describedby={errors.kategori ? "error-kategori" : undefined}>
            <option value="">Pilih kategori</option>
            {categories.map((category) => <option value={category} key={category}>{category}</option>)}
          </select>
          {errors.kategori && <span id="error-kategori" className={styles.error} role="alert">{errors.kategori}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="new-menu-price">Harga (Rp)</label>
          <input id="new-menu-price" name="harga" type="number" min="1" step="500" value={form.harga} onChange={handleChange} aria-invalid={Boolean(errors.harga)} aria-describedby={errors.harga ? "error-harga" : undefined} />
          {errors.harga && <span id="error-harga" className={styles.error} role="alert">{errors.harga}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="new-menu-stock">Stok</label>
          <input id="new-menu-stock" name="stok" type="number" min="0" step="1" value={form.stok} onChange={handleChange} aria-invalid={Boolean(errors.stok)} aria-describedby={errors.stok ? "error-stok" : undefined} />
          {errors.stok && <span id="error-stok" className={styles.error} role="alert">{errors.stok}</span>}
        </div>
        <button className={styles.submit} type="submit">Simpan menu <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  );
}

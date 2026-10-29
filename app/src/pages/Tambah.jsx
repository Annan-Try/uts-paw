import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = { judul: '', kategori: '', waktuMasak: '', tingkatKesulitan: 'sedang' }

export default function Tambah() {
  const { items, tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galatJudul, setGalatJudul] = useState('')
  const [galatWaktuMasak, setGalatWaktuMasak] = useState('')
  const [galatKategori, setGalatKategori] = useState('')
  const [galatTingkatKesulitan, setGalatTingkatKesulitan] = useState('')

  const daftarKategori = [...new Set(items.map((item) => item.kategori))].sort()

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    setGalatJudul('')
    setGalatWaktuMasak('')
    setGalatKategori('')
    setGalatTingkatKesulitan('')

    let valid = true
    if (form.judul.trim().length < 3) {
      setGalatJudul('Judul wajib diisi, minimal 3 karakter.')
      valid = false
    }
    if (form.waktuMasak < 10) {
      setGalatWaktuMasak('Waktu Masak wajib diisi, minimal 10 menit.')
      valid = false
    }
    if (!form.kategori) {
      setGalatKategori('Kategori wajib dipilih.')
      valid = false
    }
    if (!valid) return
    tambah({ ...form, judul: form.judul.trim() })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Resep</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galatJudul && <p role="alert">{galatJudul}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option></option>
        {daftarKategori.map((kategori) => (
          <option key={kategori} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>
      {galatKategori && <p role="alert">{galatKategori}</p>}

      <label htmlFor="waktuMasak">Waktu Masak</label>
      <input id="waktuMasak" name="waktuMasak" type="number" value={form.waktuMasak} onChange={ubah} />
      {galatWaktuMasak && <p role="alert">{galatWaktuMasak}</p>}

      <label htmlFor="tingkatKesulitan">Tingkat Kesulitan</label>
      <select id="tingkatKesulitan" name="tingkatKesulitan" value={form.tingkatKesulitan} onChange={ubah}>
        <option value="rendah">Mudah</option>
        <option value="sedang">Sedang</option>
        <option value="tinggi">Sulit</option>
      </select>

      <button type="submit">Simpan</button>
    </form>
  )
}
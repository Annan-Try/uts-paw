export default function KotakPencarian({ nilai, onUbah }) {
  return (
    <input
      type="search"
      placeholder="Cari Resep..."
      aria-label="Cari Resep"
      value={nilai}
      onChange={(e) => onUbah(e.target.value)}
    />
  )
}
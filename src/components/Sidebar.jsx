
const menu = [
  { id: 'jadwal', nama: 'Jadwal Posyandu', ikon: '▦' },
  { id: 'pemeriksaan', nama: 'Pemeriksaan Balita', ikon: '♧' },
  { id: 'laporan', nama: 'Laporan Posyandu', ikon: '▤' }
]

function Sidebar({ halaman, onPindah, terbuka }) {
  return (
    <aside className={`sidebar ${terbuka ? 'sidebar-open' : ''}`}>
      <div>
        <div className="sidebar-brand">
          <img
            src="/logo-posyandu.png"
            alt="Logo SIM-Posyandu"
            className="brand-logo"
          />

          <div>
            <h2>SIM-Posyandu</h2>
            <p>Desa Sukamaju</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">MENU UTAMA</p>

          {menu.map(item => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${halaman === item.id ? 'active' : ''}`}
              onClick={() => onPindah(item.id)}
            >
              <span className="nav-icon">{item.ikon}</span>
              {item.nama}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-profile">
        <div className="profile-avatar">SR</div>
        <div>
          <strong>Ibu Sari</strong>
          <p>Kader Posyandu</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

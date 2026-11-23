
import { useEffect, useState } from 'react'
import './App.css'

const jadwalAwal = [
  {
    tanggal: '2026-11-05',
    kegiatan: 'Penimbangan & Pemeriksaan Balita',
    waktu: '08.00 - 11.00 WIB',
    lokasi: 'Balai Desa Sukamaju'
  },
  {
    tanggal: '2026-11-12',
    kegiatan: 'Pemberian Imunisasi Balita',
    waktu: '08.00 - 11.00 WIB',
    lokasi: 'Posyandu Melati'
  },
  {
    tanggal: '2026-11-19',
    kegiatan: 'Penyuluhan Kesehatan Ibu dan Anak',
    waktu: '09.00 - 11.00 WIB',
    lokasi: 'Balai Desa Sukamaju'
  }
]

function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number)

  return new Date(tahun, bulan - 1, hari).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function formatBulan(bulan) {
  const [tahun, nomorBulan] = bulan.split('-').map(Number)

  return new Date(tahun, nomorBulan - 1, 1).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric'
  })
}

function App() {
  const [jadwal, setJadwal] = useState(() => {
    try {
      const data = localStorage.getItem('sim_jadwal')
      const hasil = data ? JSON.parse(data) : jadwalAwal

      if (!Array.isArray(hasil)) return jadwalAwal

      return hasil.map(item => ({
        tanggal: item.tanggal || item.tgl,
        kegiatan: item.kegiatan || item.nama,
        waktu: item.waktu,
        lokasi: item.lokasi
      }))
    } catch {
      return jadwalAwal
    }
  })

  const [bulan, setBulan] = useState('2026-11')
  const [formTerbuka, setFormTerbuka] = useState(false)
  const [menuTerbuka, setMenuTerbuka] = useState(false)

  useEffect(() => {
    localStorage.setItem('sim_jadwal', JSON.stringify(jadwal))
  }, [jadwal])

  const daftarBulan = [...new Set(
    jadwal.map(item => item.tanggal?.slice(0, 7))
  )].filter(Boolean).sort().reverse()

  const jadwalTampil = jadwal
    .filter(item => item.tanggal && (!bulan || item.tanggal.startsWith(bulan)))
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))

  function tambahJadwal(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const tanggal = form.get('tanggal')
    const kegiatan = form.get('kegiatan').trim()
    const mulai = form.get('mulai')
    const selesai = form.get('selesai')
    const lokasi = form.get('lokasi').trim()

    if (selesai <= mulai) {
      alert('Jam selesai harus lebih besar dari jam mulai.')
      return
    }

    const jadwalBaru = {
      tanggal,
      kegiatan,
      waktu: `${mulai.replace(':', '.')} - ${selesai.replace(':', '.')} WIB`,
      lokasi
    }

    setJadwal(sebelumnya => [...sebelumnya, jadwalBaru])
    setBulan(tanggal.slice(0, 7))
    setFormTerbuka(false)
  }

  return (
    <div className="app-container">
      <aside className={`sidebar ${menuTerbuka ? 'sidebar-open' : ''}`}>
        <div>
          <div className="sidebar-brand">
            <img
              src="/logo-posyandu.png"
              alt="Logo SIM-Posyandu"
              className="brand-logo"
              style={{ width: 48, height: 48, objectFit: 'contain' }}
            />

            <div>
              <h2>SIM-Posyandu</h2>
              <p>Desa Sukamaju</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <p className="nav-label">MENU UTAMA</p>

            <a
              href="#jadwal"
              className="nav-item active"
              onClick={() => setMenuTerbuka(false)}
            >
              <span className="nav-icon">▦</span>
              Jadwal Posyandu
            </a>
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

      <div className="main-container">
        <header className="topbar">
          <div className="topbar-title">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuTerbuka(!menuTerbuka)}
              aria-label="Buka atau tutup menu"
            >
              ☰
            </button>

            <img
              src="/logo-posyandu.png"
              alt=""
              className="mobile-logo"
            />

            <span>Posyandu Melati Desa Sukamaju</span>
          </div>

          <span className="periode">
            SIM-Posyandu
          </span>
        </header>

        <main className="main-content" id="jadwal">
          <div className="page-heading">
            <div>
              <p className="page-category">
                MANAJEMEN KEGIATAN
              </p>

              <h1>Jadwal Posyandu</h1>

              <p className="page-description">
                Lihat dan kelola jadwal kegiatan pelayanan Posyandu.
              </p>
            </div>

            <div className="page-actions">
              <select
                className="input-filter"
                value={bulan}
                onChange={event => setBulan(event.target.value)}
                aria-label="Filter bulan kegiatan"
              >
                <option value="">Semua Periode</option>

                {daftarBulan.map(item => (
                  <option key={item} value={item}>
                    {formatBulan(item)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setFormTerbuka(true)}
              >
                + Tambah Jadwal
              </button>
            </div>
          </div>

          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Daftar Kegiatan Posyandu</h2>

                <p>
                  Informasi jadwal pelayanan dan lokasi kegiatan.
                </p>
              </div>

              <span className="total-badge">
                {jadwalTampil.length} Kegiatan
              </span>
            </div>

            <div className="table-wrapper">
              <table className="jadwal-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Kegiatan</th>
                    <th>Waktu</th>
                    <th>Lokasi</th>
                  </tr>
                </thead>

                <tbody>
                  {jadwalTampil.length > 0 ? (
                    jadwalTampil.map((item, index) => (
                      <tr key={`${item.tanggal}-${item.kegiatan}-${index}`}>
                        <td>
                          <span className="date-text">
                            {formatTanggal(item.tanggal)}
                          </span>
                        </td>

                        <td>
                          <span className="activity-name">
                            {item.kegiatan}
                          </span>
                        </td>

                        <td>{item.waktu}</td>
                        <td>{item.lokasi}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="empty-table">
                        Belum ada jadwal pada periode ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <p className="page-footer">
            SIM-Posyandu · Sistem Informasi Manajemen Posyandu
          </p>
        </main>
      </div>

      {formTerbuka && (
        <div className="modal-backdrop">
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="judul-form"
          >
            <div className="modal-heading">
              <div>
                <h2 id="judul-form">Tambah Jadwal</h2>
                <p>Masukkan informasi kegiatan Posyandu.</p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setFormTerbuka(false)}
                aria-label="Tutup formulir"
              >
                ×
              </button>
            </div>

            <form onSubmit={tambahJadwal}>
              <div className="form-group">
                <label htmlFor="nama-kegiatan">
                  Nama Kegiatan
                </label>

                <input
                  id="nama-kegiatan"
                  type="text"
                  name="kegiatan"
                  placeholder="Masukkan nama kegiatan"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tanggal-kegiatan">
                  Tanggal Kegiatan
                </label>

                <input
                  id="tanggal-kegiatan"
                  type="date"
                  name="tanggal"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jam-mulai">Jam Mulai</label>

                  <input
                    id="jam-mulai"
                    type="time"
                    name="mulai"
                    defaultValue="08:00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="jam-selesai">Jam Selesai</label>

                  <input
                    id="jam-selesai"
                    type="time"
                    name="selesai"
                    defaultValue="11:00"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lokasi-kegiatan">
                  Lokasi Kegiatan
                </label>

                <input
                  id="lokasi-kegiatan"
                  type="text"
                  name="lokasi"
                  placeholder="Masukkan lokasi kegiatan"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setFormTerbuka(false)}
                >
                  Batal
                </button>

                <button type="submit" className="btn btn-primary">
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

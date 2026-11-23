
export const jadwalContoh = [
  {
    tgl: '2026-11-05',
    nama: 'Penimbangan & pemeriksaan balita',
    waktu: '08.00-11.00 WIB',
    lokasi: 'Balai Desa Sukamaju'
  },
  {
    tgl: '2026-11-19',
    nama: 'Imunisasi balita',
    waktu: '08.00-11.00 WIB',
    lokasi: 'Posyandu Melati'
  }
]

export const pemeriksaanContoh = [
  {
    tgl: '2026-11-05',
    nama: 'Aisyah Putri',
    berat: 12.5,
    tinggi: 90.2
  },
  {
    tgl: '2026-11-05',
    nama: 'Bima Pratama',
    berat: 11.8,
    tinggi: 84.5
  },
  {
    tgl: '2026-11-19',
    nama: 'Citra Lestari',
    berat: 14.1,
    tinggi: 94.2
  },
  {
    tgl: '2026-10-15',
    nama: 'Aisyah Putri',
    berat: 12.2,
    tinggi: 89.5
  }
]

export function bacaData(kunci, nilaiAwal) {
  try {
    const hasil = JSON.parse(localStorage.getItem(kunci))
    return Array.isArray(hasil) ? hasil : nilaiAwal
  } catch {
    return nilaiAwal
  }
}

export function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number)

  return new Date(tahun, bulan - 1, hari).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function formatBulan(bulan) {
  if (!bulan) return 'Semua periode'

  const [tahun, nomor] = bulan.split('-').map(Number)

  return new Date(tahun, nomor - 1, 1).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric'
  })
}

export function angka(nilai) {
  return Number(nilai).toLocaleString('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
}

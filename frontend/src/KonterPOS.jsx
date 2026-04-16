import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────
const PRODUCTS = {
  Provider: [
    { id: 1, name: "Telkomsel 5GB", price: 15000, cost: 12000, stock: 20, icon: "📶", brand: "Telkomsel" },
    { id: 2, name: "Telkomsel 10GB", price: 28000, cost: 23000, stock: 15, icon: "📶", brand: "Telkomsel" },
    { id: 3, name: "Telkomsel 20GB", price: 48000, cost: 40000, stock: 8, icon: "📶", brand: "Telkomsel" },
    { id: 4, name: "XL 5GB", price: 13000, cost: 10000, stock: 3, icon: "📡", brand: "XL" },
    { id: 5, name: "XL 10GB", price: 25000, cost: 20000, stock: 8, icon: "📡", brand: "XL" },
    { id: 6, name: "Indosat 7GB", price: 18000, cost: 14000, stock: 12, icon: "🔵", brand: "Indosat" },
    { id: 7, name: "Indosat 15GB", price: 32000, cost: 26000, stock: 2, icon: "🔵", brand: "Indosat" },
    { id: 8, name: "Smartfren 8GB", price: 20000, cost: 16000, stock: 6, icon: "📲", brand: "Smartfren" },
    { id: 9, name: "Axis 5GB", price: 12000, cost: 9000, stock: 9, icon: "🟡", brand: "Axis" },
    { id: 10, name: "Tri 8GB", price: 17000, cost: 13000, stock: 11, icon: "3️⃣", brand: "Tri" },
  ],
  "Top Up": [
    { id: 11, name: "DANA 25rb", price: 27000, cost: 25000, stock: 99, adminFee: 2000, icon: "💙", brand: "DANA" },
    { id: 12, name: "DANA 50rb", price: 52000, cost: 50000, stock: 99, adminFee: 2000, icon: "💙", brand: "DANA" },
    { id: 13, name: "DANA 100rb", price: 102000, cost: 100000, stock: 99, adminFee: 2000, icon: "💙", brand: "DANA" },
    { id: 14, name: "OVO 50rb", price: 52000, cost: 50000, stock: 99, adminFee: 2000, icon: "💜", brand: "OVO" },
    { id: 15, name: "OVO 100rb", price: 102000, cost: 100000, stock: 99, adminFee: 2000, icon: "💜", brand: "OVO" },
    { id: 16, name: "GoPay 50rb", price: 52000, cost: 50000, stock: 99, adminFee: 2000, icon: "🟢", brand: "GoPay" },
    { id: 17, name: "GoPay 100rb", price: 102000, cost: 100000, stock: 99, adminFee: 2000, icon: "🟢", brand: "GoPay" },
    { id: 18, name: "ShopeePay 50rb", price: 52000, cost: 50000, stock: 99, adminFee: 2000, icon: "🧡", brand: "ShopeePay" },
    { id: 19, name: "ShopeePay 100rb", price: 102000, cost: 100000, stock: 99, adminFee: 2000, icon: "🧡", brand: "ShopeePay" },
  ],
  Aksesoris: [
    { id: 20, name: "Case iPhone 15", price: 85000, cost: 45000, stock: 4, icon: "📱", brand: "Case" },
    { id: 21, name: "Case Samsung A55", price: 65000, cost: 35000, stock: 6, icon: "📱", brand: "Case" },
    { id: 22, name: "Charger 20W", price: 120000, cost: 75000, stock: 7, icon: "🔌", brand: "Charger" },
    { id: 23, name: "Charger 65W", price: 185000, cost: 120000, stock: 3, icon: "🔌", brand: "Charger" },
    { id: 24, name: "Headset Bluetooth", price: 150000, cost: 95000, stock: 2, icon: "🎧", brand: "Audio" },
    { id: 25, name: "Kabel Type-C 1m", price: 35000, cost: 18000, stock: 10, icon: "🔋", brand: "Kabel" },
    { id: 26, name: "Anti Gores", price: 25000, cost: 10000, stock: 1, icon: "🛡️", brand: "Aksesori" },
    { id: 27, name: "Power Bank 10000mAh", price: 180000, cost: 120000, stock: 3, icon: "⚡", brand: "Power" },
    { id: 28, name: "Holder HP Motor", price: 45000, cost: 28000, stock: 5, icon: "🏍️", brand: "Aksesori" },
  ],
};

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const useWindowSize = () => {
  const [size, setSize] = useState({ w: window.innerWidth });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
};

// ─── MODAL SN ─────────────────────────────────────────────────────
function SNModal({ product, onConfirm, onClose }) {
  const [sn, setSN] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "420px", boxShadow: "0 32px 80px rgba(0,0,0,0.25)", animation: "slideUp 0.25s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>{product.icon}</div>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{product.name}</h3>
          <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.83rem", marginTop: "4px" }}>
            {fmt(product.price)}{product.adminFee ? <span style={{ color: "#f97316" }}> +admin {fmt(product.adminFee)}</span> : ""}
          </p>
        </div>
        <label style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#475569", display: "block", marginBottom: "6px" }}>Nama Pelanggan / Nomor HP / SN</label>
        <input
          autoFocus value={sn} onChange={(e) => setSN(e.target.value)}
          placeholder="Cth: Budi / 0812xxxx / SN-ABC123"
          onKeyDown={(e) => e.key === "Enter" && onConfirm(sn)}
          style={{ width: "100%", padding: "13px 16px", border: "2px solid #e2e8f0", borderRadius: "14px", fontSize: "0.95rem", fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid #e2e8f0", background: "white", color: "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>Batal</button>
          <button onClick={() => onConfirm(sn)} style={{ flex: 2, padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT MODAL ────────────────────────────────────────────────
function PaymentModal({ cart, total, onClose, onSuccess }) {
  const [method, setMethod] = useState("cash");
  const [cashRaw, setCashRaw] = useState("");
  const cash = parseInt(cashRaw) || 0;
  const change = cash - total;
  const quick = [20000, 50000, 100000, 150000, 200000, 500000];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "28px", width: "100%", maxWidth: "480px", boxShadow: "0 32px 80px rgba(0,0,0,0.25)", maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#0f172a" }}>💳 Pembayaran</h2>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: "10px", padding: "6px 12px", cursor: "pointer", color: "#64748b", fontWeight: 700, fontFamily: "'Sora',sans-serif" }}>✕</button>
        </div>

        {/* Order summary */}
        <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px 14px", marginBottom: "16px", maxHeight: "130px", overflowY: "auto" }}>
          {cart.map((item) => (
            <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", color: "#475569" }}>{item.name} {item.note_or_sn && <span style={{ color: "#94a3b8" }}>· {item.note_or_sn}</span>}</span>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#0f172a" }}>{fmt(item.price + (item.adminFee || 0))}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", borderRadius: "16px", padding: "18px", textAlign: "center", marginBottom: "18px" }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", fontFamily: "'Sora',sans-serif", marginBottom: "4px" }}>Total Pembayaran</p>
          <p style={{ color: "white", fontSize: "2rem", fontWeight: 800, fontFamily: "'Sora',sans-serif" }}>{fmt(total)}</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
          {["cash", "qris"].map((m) => (
            <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: "10px", borderRadius: "12px", border: `2px solid ${method === m ? "#0ea5e9" : "#e2e8f0"}`, background: method === m ? "#e0f2fe" : "white", color: method === m ? "#0284c7" : "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              {m === "cash" ? "💵 Tunai" : "📱 QRIS"}
            </button>
          ))}
        </div>

        {method === "cash" ? (
          <>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", marginBottom: "8px" }}>Nominal Cepat</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
              {quick.map((a) => (
                <button key={a} onClick={() => setCashRaw(String(a))} style={{ padding: "7px 12px", borderRadius: "10px", border: `2px solid ${cashRaw === String(a) ? "#0ea5e9" : "#e2e8f0"}`, background: cashRaw === String(a) ? "#e0f2fe" : "white", color: cashRaw === String(a) ? "#0284c7" : "#475569", fontFamily: "'Sora',sans-serif", fontWeight: 600, cursor: "pointer", fontSize: "0.78rem" }}>
                  {fmt(a)}
                </button>
              ))}
            </div>
            <input
              value={cashRaw ? fmt(parseInt(cashRaw) || 0) : ""}
              onChange={(e) => setCashRaw(e.target.value.replace(/\D/g, ""))}
              placeholder="Atau ketik nominal..."
              style={{ width: "100%", padding: "12px 16px", border: "2px solid #e2e8f0", borderRadius: "12px", fontSize: "1rem", fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "10px" }}
            />
            {cash >= total && (
              <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#16a34a", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>Kembalian</span>
                <span style={{ color: "#16a34a", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.1rem" }}>{fmt(change)}</span>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0 16px" }}>
            <div style={{ display: "inline-block", background: "white", border: "3px solid #0f172a", borderRadius: "16px", padding: "16px" }}>
              <div style={{ width: "150px", height: "150px", display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: "2px" }}>
                {Array.from({ length: 100 }).map((_, i) => {
                  const corners = [0,1,2,10,11,20,9,19,29,80,81,90,89,99,88,98,97,87];
                  const isFilled = corners.includes(i) || Math.random() > 0.52;
                  return <div key={i} style={{ background: isFilled ? "#0f172a" : "white", borderRadius: "1px" }} />;
                })}
              </div>
            </div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.82rem", color: "#64748b", marginTop: "10px" }}>Scan untuk bayar {fmt(total)}</p>
          </div>
        )}

        <button
          onClick={onSuccess}
          disabled={method === "cash" && cash < total}
          style={{ width: "100%", padding: "14px", borderRadius: "14px", border: "none", background: (method === "qris" || cash >= total) ? "linear-gradient(135deg,#22c55e,#16a34a)" : "#e2e8f0", color: (method === "qris" || cash >= total) ? "white" : "#94a3b8", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1rem", cursor: (method === "qris" || cash >= total) ? "pointer" : "not-allowed" }}>
          ✅ Selesaikan Transaksi
        </button>
      </div>
    </div>
  );
}

// ─── SUCCESS MODAL ────────────────────────────────────────────────
function SuccessModal({ onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "40px 32px", width: "100%", maxWidth: "360px", textAlign: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🎉</div>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0f172a", marginBottom: "8px" }}>Transaksi Berhasil!</h2>
        <p style={{ color: "#64748b", fontFamily: "'Sora',sans-serif", fontSize: "0.88rem", marginBottom: "24px" }}>Struk siap dikirim ke pelanggan</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid #e2e8f0", background: "white", color: "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: 600, cursor: "pointer" }}>Tutup</button>
          <button style={{ flex: 2, padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer" }}>
            📤 Kirim WA
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────
function Dashboard({ onGoKasir, isMobile }) {
  const lowStock = Object.values(PRODUCTS).flat().filter((p) => p.stock < 5 && p.stock !== 99);
  const recent = [
    { id: "INV-001", item: "Telkomsel 10GB", customer: "Budi", amount: 28000, time: "10:32", method: "cash" },
    { id: "INV-002", item: "DANA 50rb", customer: "Sari", amount: 52000, time: "10:45", method: "qris" },
    { id: "INV-003", item: "Case iPhone 15", customer: "Ahmad", amount: 85000, time: "11:02", method: "cash" },
    { id: "INV-004", item: "XL 10GB", customer: "Dewi", amount: 25000, time: "11:18", method: "qris" },
    { id: "INV-005", item: "GoPay 100rb", customer: "Rizky", amount: 102000, time: "11:35", method: "cash" },
  ];

  return (
    <div style={{ padding: isMobile ? "20px 16px 100px" : "28px 28px 40px", overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", color: "#64748b", fontSize: "0.85rem" }}>Selamat datang 👋</p>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: isMobile ? "1.5rem" : "1.8rem", color: "#0f172a", marginBottom: "2px" }}>Konter Jaya Cell</h1>
        <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.8rem" }}>Jumat, 20 Februari 2026</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "💰 Omzet Hari Ini", value: fmt(1250000), sub: "↑ 12% kemarin", grad: "linear-gradient(135deg,#0ea5e9,#0284c7)", light: false },
          { label: "🤑 Cuan Bersih", value: fmt(340000), sub: "18 transaksi", grad: "linear-gradient(135deg,#22c55e,#16a34a)", light: false },
          { label: "📦 Stok Kritis", value: `${lowStock.length} item`, sub: "perlu restock", grad: "white", light: true, border: "2px solid #fee2e2", textColor: "#ef4444" },
          { label: "🧾 Transaksi", value: "18", sub: "hari ini", grad: "white", light: true, border: "2px solid #f1f5f9", textColor: "#0f172a" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.grad, border: s.border || "none", borderRadius: "20px", padding: "18px 16px" }}>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.72rem", color: s.light ? "#94a3b8" : "rgba(255,255,255,0.85)", marginBottom: "6px" }}>{s.label}</p>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: s.light ? (s.textColor || "#0f172a") : "white" }}>{s.value}</p>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: s.light ? "#94a3b8" : "rgba(255,255,255,0.7)", marginTop: "3px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div style={{ background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: "16px", padding: "14px 16px", marginBottom: "20px" }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#ea580c", fontSize: "0.85rem", marginBottom: "10px" }}>⚠️ Low Stock Alert — Segera Restock!</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {lowStock.map((p) => (
              <span key={p.id} style={{ background: "#fed7aa", color: "#c2410c", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>
                🔴 {p.name} ({p.stock} sisa)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Chart + Recent side by side on desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        {/* Bar chart */}
        <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "18px" }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "16px" }}>📊 Grafik 7 Hari Terakhir</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "90px" }}>
            {[
              { v: 850000, c: 210000, l: "Sen" },
              { v: 1100000, c: 280000, l: "Sel" },
              { v: 920000, c: 230000, l: "Rab" },
              { v: 1400000, c: 380000, l: "Kam" },
              { v: 980000, c: 260000, l: "Jum" },
              { v: 1600000, c: 420000, l: "Sab" },
              { v: 1250000, c: 340000, l: "Min" },
            ].map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <div style={{ width: "100%", display: "flex", alignItems: "flex-end", gap: "1px", height: "75px" }}>
                  <div style={{ flex: 1, height: `${(d.v / 1600000) * 100}%`, background: i === 6 ? "#0ea5e9" : "#bfdbfe", borderRadius: "3px 3px 0 0" }} />
                  <div style={{ flex: 1, height: `${(d.c / 1600000) * 100}%`, background: i === 6 ? "#22c55e" : "#bbf7d0", borderRadius: "3px 3px 0 0" }} />
                </div>
                <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontFamily: "'Sora',sans-serif" }}>{d.l}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: "#64748b" }}><span style={{ width: "8px", height: "8px", background: "#0ea5e9", borderRadius: "2px", display: "inline-block" }} /> Omzet</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: "#64748b" }}><span style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "2px", display: "inline-block" }} /> Cuan</span>
          </div>
        </div>

        {/* Top products */}
        <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "18px" }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "14px" }}>🏆 Produk Terlaris</p>
          {[
            { name: "GoPay 100rb", qty: 24, profit: 48000 },
            { name: "Telkomsel 10GB", qty: 18, profit: 90000 },
            { name: "Case iPhone 15", qty: 12, profit: 480000 },
            { name: "DANA 50rb", qty: 10, profit: 20000 },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: ["#f59e0b", "#94a3b8", "#cd7c2f", "#94a3b8"][i], fontSize: "0.9rem" }}>#{i + 1}</span>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.8rem" }}>{p.name}</p>
                  <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.7rem" }}>{p.qty}x terjual</p>
                </div>
              </div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#16a34a", fontSize: "0.8rem" }}>+{fmt(p.profit)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "18px" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "14px" }}>🧾 Transaksi Terakhir</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {recent.map((tx) => (
            <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: "12px" }}>
              <div>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.83rem" }}>{tx.item}</p>
                <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.72rem" }}>{tx.customer} · {tx.time} · {tx.id}</p>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0284c7", fontSize: "0.85rem" }}>{fmt(tx.amount)}</p>
                <span style={{ background: tx.method === "qris" ? "#e0f2fe" : "#f0fdf4", color: tx.method === "qris" ? "#0284c7" : "#16a34a", padding: "2px 8px", borderRadius: "6px", fontSize: "0.68rem", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>
                  {tx.method === "qris" ? "QRIS" : "Tunai"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <div style={{ position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
          <button onClick={onGoKasir} style={{ padding: "13px 28px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "0.9rem", boxShadow: "0 8px 30px rgba(14,165,233,0.45)", cursor: "pointer", whiteSpace: "nowrap" }}>
            🛒 Mulai Transaksi
          </button>
        </div>
      )}
    </div>
  );
}

// ─── KASIR PAGE ───────────────────────────────────────────────────
function Kasir({ isMobile, isTablet }) {
  const tabs = ["Provider", "Top Up", "Aksesoris"];
  const [activeTab, setActiveTab] = useState("Provider");
  const [cart, setCart] = useState([]);
  const [pending, setPending] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [search, setSearch] = useState("");

  const total = cart.reduce((s, i) => s + i.price + (i.adminFee || 0), 0);
  const filtered = PRODUCTS[activeTab].filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleHold = () => {
    if (!cart.length) return;
    setDrafts([...drafts, { id: Date.now(), items: cart, total }]);
    setCart([]);
  };

  const handleSuccess = () => { setShowPayment(false); setShowSuccess(true); };
  const handleSuccessClose = () => { setShowSuccess(false); setCart([]); };

  const ProductGrid = () => (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: "10px" }}>
      {filtered.map((product) => {
        const isLow = product.stock > 0 && product.stock < 5;
        const isOut = product.stock === 0;
        return (
          <button key={product.id} onClick={() => !isOut && setPending(product)} disabled={isOut}
            style={{ background: isOut ? "#f8fafc" : "white", border: isLow ? "2px solid #fca5a5" : "2px solid #f1f5f9", borderRadius: "16px", padding: "14px 12px", textAlign: "left", cursor: isOut ? "not-allowed" : "pointer", opacity: isOut ? 0.5 : 1, position: "relative", transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={(e) => { if (!isOut) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {isLow && <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, background: "#ef4444", borderRadius: "50%" }} />}
            <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{product.icon}</div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.8rem", lineHeight: 1.3, marginBottom: "3px" }}>{product.name}</p>
            {product.adminFee && <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.67rem", color: "#f97316", fontWeight: 600 }}>+Admin {fmt(product.adminFee)}</p>}
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0284c7", fontSize: "0.92rem", marginTop: "5px" }}>{fmt(product.price)}</p>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.67rem", color: isLow ? "#ef4444" : "#94a3b8", fontWeight: isLow ? 700 : 400 }}>
              {product.stock === 99 ? "∞ Digital" : `Stok: ${product.stock}`}
            </p>
          </button>
        );
      })}
    </div>
  );

  const CartPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "white", borderLeft: "2px solid #f1f5f9" }}>
      <div style={{ padding: "18px 16px 10px", borderBottom: "2px solid #f1f5f9" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "1rem" }}>🛒 Keranjang</p>
        <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.75rem" }}>{cart.length} item ditambahkan</p>
      </div>

      {drafts.length > 0 && (
        <div style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "6px", overflowX: "auto" }}>
          {drafts.map((d, i) => (
            <button key={d.id} onClick={() => { setCart(d.items); setDrafts(drafts.filter((x) => x.id !== d.id)); }}
              style={{ whiteSpace: "nowrap", padding: "5px 10px", borderRadius: "8px", border: "2px solid #fcd34d", background: "#fef9c3", color: "#92400e", fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.72rem", cursor: "pointer" }}>
              ⏸ Draft {i + 1} · {fmt(d.total)}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🛍️</div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.85rem" }}>Belum ada item</p>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.75rem", marginTop: "4px" }}>Klik produk untuk menambahkan</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {cart.map((item) => (
              <div key={item.cartId} style={{ background: "#f8fafc", borderRadius: "12px", padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.8rem" }}>{item.name}</p>
                    {item.note_or_sn && <p style={{ fontFamily: "'Sora',sans-serif", color: "#0284c7", fontSize: "0.7rem", marginTop: "2px" }}>👤 {item.note_or_sn}</p>}
                    {item.adminFee > 0 && <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.68rem", color: "#f97316" }}>+Admin {fmt(item.adminFee)}</p>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0284c7", fontSize: "0.82rem" }}>{fmt(item.price + (item.adminFee || 0))}</p>
                    <button onClick={() => setCart(cart.filter((i) => i.cartId !== item.cartId))}
                      style={{ background: "#fee2e2", border: "none", borderRadius: "6px", width: "22px", height: "22px", cursor: "pointer", color: "#ef4444", fontWeight: 800, fontSize: "0.75rem" }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: "12px 14px", borderTop: "2px solid #f1f5f9" }}>
          <div style={{ background: "#f0f9ff", borderRadius: "12px", padding: "10px 14px", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, color: "#0284c7", fontSize: "0.88rem" }}>Total</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0284c7", fontSize: "1rem" }}>{fmt(total)}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleHold} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "2px solid #e2e8f0", background: "white", color: "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>⏸ Tahan</button>
            <button onClick={() => setShowPayment(true)} style={{ flex: 2, padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 800, cursor: "pointer", fontSize: "0.82rem" }}>💳 Bayar {fmt(total)}</button>
          </div>
        </div>
      )}
    </div>
  );

  // Desktop/Tablet: split view
  if (!isMobile) {
    return (
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
        {/* Left: Products */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tabs + Search */}
          <div style={{ padding: "16px 16px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: "6px", background: "#f1f5f9", borderRadius: "14px", padding: "4px", marginBottom: "10px" }}>
              {tabs.map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
                  style={{ flex: 1, padding: "8px 4px", borderRadius: "10px", border: "none", background: activeTab === tab ? "white" : "transparent", color: activeTab === tab ? "#0284c7" : "#94a3b8", fontFamily: "'Sora',sans-serif", fontWeight: activeTab === tab ? 700 : 500, fontSize: "0.82rem", cursor: "pointer", boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
                  {tab === "Provider" ? "📶" : tab === "Top Up" ? "💳" : "🛍️"} {tab}
                </button>
              ))}
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Cari produk..."
              style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "12px", fontSize: "0.85rem", fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "12px" }}
              onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
            <ProductGrid />
          </div>
        </div>
        {/* Right: Cart */}
        <div style={{ width: isTablet ? "260px" : "300px", flexShrink: 0 }}>
          <CartPanel />
        </div>
        {pending && <SNModal product={pending} onConfirm={(sn) => { setCart([...cart, { ...pending, note_or_sn: sn, cartId: Date.now() }]); setPending(null); }} onClose={() => setPending(null)} />}
        {showPayment && <PaymentModal cart={cart} total={total} onClose={() => setShowPayment(false)} onSuccess={handleSuccess} />}
        {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
      </div>
    );
  }

  // Mobile: stacked
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "12px 14px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "5px", background: "#f1f5f9", borderRadius: "12px", padding: "3px", marginBottom: "8px" }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
              style={{ flex: 1, padding: "7px 3px", borderRadius: "9px", border: "none", background: activeTab === tab ? "white" : "transparent", color: activeTab === tab ? "#0284c7" : "#94a3b8", fontFamily: "'Sora',sans-serif", fontWeight: activeTab === tab ? 700 : 500, fontSize: "0.75rem", cursor: "pointer" }}>
              {tab === "Provider" ? "📶" : tab === "Top Up" ? "💳" : "🛍️"} {tab}
            </button>
          ))}
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Cari produk..."
          style={{ width: "100%", padding: "9px 12px", border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "0.82rem", fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box" }}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
        <ProductGrid />
      </div>

      {/* Cart bottom sheet */}
      {cart.length > 0 && (
        <div style={{ background: "white", borderTop: "2px solid #f1f5f9", padding: "12px 14px", flexShrink: 0 }}>
          {drafts.length > 0 && (
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", marginBottom: "8px" }}>
              {drafts.map((d, i) => (
                <button key={d.id} onClick={() => { setCart(d.items); setDrafts(drafts.filter((x) => x.id !== d.id)); }}
                  style={{ whiteSpace: "nowrap", padding: "4px 10px", borderRadius: "8px", border: "2px solid #fcd34d", background: "#fef9c3", color: "#92400e", fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.7rem", cursor: "pointer" }}>
                  ⏸ Draft {i + 1} · {fmt(d.total)}
                </button>
              ))}
            </div>
          )}
          <div style={{ maxHeight: "100px", overflowY: "auto", marginBottom: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
            {cart.map((item) => (
              <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", borderRadius: "8px", padding: "6px 10px" }}>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.75rem" }}>{item.name}</p>
                  {item.note_or_sn && <p style={{ fontFamily: "'Sora',sans-serif", color: "#0284c7", fontSize: "0.65rem" }}>👤 {item.note_or_sn}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0284c7", fontSize: "0.78rem" }}>{fmt(item.price + (item.adminFee || 0))}</span>
                  <button onClick={() => setCart(cart.filter((i) => i.cartId !== item.cartId))}
                    style={{ background: "#fee2e2", border: "none", borderRadius: "5px", width: "18px", height: "18px", cursor: "pointer", color: "#ef4444", fontWeight: 800, fontSize: "0.7rem" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "#f0f9ff", borderRadius: "8px", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, color: "#0284c7", fontSize: "0.82rem" }}>Total</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0284c7", fontSize: "0.9rem" }}>{fmt(total)}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleHold} style={{ flex: 1, padding: "10px", borderRadius: "11px", border: "2px solid #e2e8f0", background: "white", color: "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}>⏸ Tahan</button>
            <button onClick={() => setShowPayment(true)} style={{ flex: 2, padding: "10px", borderRadius: "11px", border: "none", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 800, cursor: "pointer", fontSize: "0.8rem" }}>💳 Bayar {fmt(total)}</button>
          </div>
        </div>
      )}

      {pending && <SNModal product={pending} onConfirm={(sn) => { setCart([...cart, { ...pending, note_or_sn: sn, cartId: Date.now() }]); setPending(null); }} onClose={() => setPending(null)} />}
      {showPayment && <PaymentModal cart={cart} total={total} onClose={() => setShowPayment(false)} onSuccess={handleSuccess} />}
      {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
    </div>
  );
}

// ─── STOK PAGE ────────────────────────────────────────────────────
function Stock({ isMobile }) {
  const [search, setSearch] = useState("");
  const all = Object.entries(PRODUCTS).flatMap(([cat, items]) => items.map((p) => ({ ...p, category: cat })));
  const filtered = all.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: isMobile ? "20px 14px 100px" : "24px 24px 40px", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>📦 Data Barang</h2>
        <button style={{ padding: "9px 18px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>+ Tambah Produk</button>
      </div>

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Cari produk..."
        style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "12px", fontSize: "0.85rem", fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "14px" }}
        onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")} />

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.map((p) => {
            const isLow = p.stock < 5 && p.stock !== 99;
            return (
              <div key={p.id} style={{ background: "white", border: isLow ? "2px solid #fca5a5" : "2px solid #f1f5f9", borderRadius: "14px", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.4rem" }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.82rem" }}>
                      {isLow && <span style={{ display: "inline-block", width: 7, height: 7, background: "#ef4444", borderRadius: "50%", marginRight: 5, verticalAlign: "middle" }} />}
                      {p.name}
                    </p>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: "#94a3b8" }}>Modal: {fmt(p.cost)}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0284c7", fontSize: "0.85rem" }}>{fmt(p.price)}</p>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: isLow ? "#ef4444" : "#94a3b8", fontWeight: isLow ? 700 : 400 }}>
                    Stok: {p.stock === 99 ? "∞" : p.stock}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Produk", "Kategori", "Harga Modal", "Harga Jual", "Profit/item", "Stok", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Sora',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#64748b", borderBottom: "2px solid #f1f5f9" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const isLow = p.stock < 5 && p.stock !== 99;
                return (
                  <tr key={p.id} style={{ background: i % 2 === 0 ? "white" : "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "11px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>{p.icon}</span>
                        <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.82rem" }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 16px" }}><span style={{ background: "#e0f2fe", color: "#0284c7", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>{p.category}</span></td>
                    <td style={{ padding: "11px 16px", fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", color: "#475569" }}>{fmt(p.cost)}</td>
                    <td style={{ padding: "11px 16px", fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#0284c7" }}>{fmt(p.price)}</td>
                    <td style={{ padding: "11px 16px", fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#16a34a" }}>+{fmt(p.price - p.cost)}</td>
                    <td style={{ padding: "11px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {isLow && <span style={{ width: 7, height: 7, background: "#ef4444", borderRadius: "50%", display: "inline-block" }} />}
                        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", color: isLow ? "#ef4444" : "#475569", fontWeight: isLow ? 700 : 400 }}>
                          {p.stock === 99 ? "∞" : p.stock}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <span style={{ background: isLow ? "#fee2e2" : "#f0fdf4", color: isLow ? "#ef4444" : "#16a34a", padding: "3px 8px", borderRadius: "6px", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif", fontWeight: 700 }}>
                        {isLow ? "⚠ Kritis" : "✓ Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── LAPORAN PAGE ─────────────────────────────────────────────────
function Laporan({ isMobile }) {
  const [period, setPeriod] = useState("minggu");
  const weekData = [
    { l: "Sen", o: 850000, c: 210000 },
    { l: "Sel", o: 1100000, c: 280000 },
    { l: "Rab", o: 920000, c: 230000 },
    { l: "Kam", o: 1400000, c: 380000 },
    { l: "Jum", o: 980000, c: 260000 },
    { l: "Sab", o: 1600000, c: 420000 },
    { l: "Min", o: 1250000, c: 340000 },
  ];
  const monthData = [
    { l: "W1", o: 7200000, c: 1820000 },
    { l: "W2", o: 8500000, c: 2200000 },
    { l: "W3", o: 7800000, c: 1950000 },
    { l: "W4", o: 9100000, c: 2380000 },
  ];
  const data = period === "minggu" ? weekData : monthData;
  const maxO = Math.max(...data.map((d) => d.o));

  return (
    <div style={{ padding: isMobile ? "20px 14px 100px" : "24px 24px 40px", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>📊 Laporan Keuangan</h2>
        <div style={{ display: "flex", gap: "6px", background: "#f1f5f9", borderRadius: "10px", padding: "3px" }}>
          {["minggu", "bulan"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding: "6px 14px", borderRadius: "8px", border: "none", background: period === p ? "white" : "transparent", color: period === p ? "#0284c7" : "#94a3b8", fontFamily: "'Sora',sans-serif", fontWeight: period === p ? 700 : 500, fontSize: "0.78rem", cursor: "pointer" }}>
              {p === "minggu" ? "7 Hari" : "Bulan Ini"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { label: "💰 Total Omzet", value: fmt(period === "minggu" ? 8100000 : 32600000), color: "#0284c7", bg: "#e0f2fe" },
          { label: "🤑 Cuan Bersih", value: fmt(period === "minggu" ? 2120000 : 8350000), color: "#16a34a", bg: "#f0fdf4" },
          { label: "🧾 Transaksi", value: period === "minggu" ? "124" : "498", color: "#7c3aed", bg: "#f5f3ff" },
          { label: "📦 Item Terjual", value: period === "minggu" ? "187" : "742", color: "#ea580c", bg: "#fff7ed" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: "16px", padding: "16px" }}>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.72rem", color: s.color, opacity: 0.8, marginBottom: "5px" }}>{s.label}</p>
            <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1rem", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "20px", marginBottom: "16px" }}>
        <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "18px" }}>
          Omzet vs Cuan — {period === "minggu" ? "7 Hari" : "Per Minggu"}
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "100%", display: "flex", alignItems: "flex-end", gap: "2px", height: "100px" }}>
                <div style={{ flex: 1, height: `${(d.o / maxO) * 100}%`, background: "linear-gradient(180deg,#0ea5e9,#0284c7)", borderRadius: "4px 4px 0 0" }} />
                <div style={{ flex: 1, height: `${(d.c / maxO) * 100}%`, background: "linear-gradient(180deg,#22c55e,#16a34a)", borderRadius: "4px 4px 0 0" }} />
              </div>
              <span style={{ fontSize: "0.63rem", color: "#94a3b8", fontFamily: "'Sora',sans-serif" }}>{d.l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
          {[["#0ea5e9", "Omzet"], ["#22c55e", "Cuan Bersih"]].map(([c, l]) => (
            <span key={l} style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Sora',sans-serif", fontSize: "0.72rem", color: "#64748b" }}>
              <span style={{ width: 10, height: 10, background: c, borderRadius: 2, display: "inline-block" }} /> {l}
            </span>
          ))}
        </div>
      </div>

      {/* Breakdown by category */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
        <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "18px" }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "14px" }}>🏆 Produk Terlaris</p>
          {[
            { name: "GoPay 100rb", qty: 24, profit: 48000, icon: "🟢" },
            { name: "Telkomsel 10GB", qty: 18, profit: 90000, icon: "📶" },
            { name: "Case iPhone 15", qty: 12, profit: 480000, icon: "📱" },
            { name: "DANA 50rb", qty: 10, profit: 20000, icon: "💙" },
            { name: "Charger 20W", qty: 8, profit: 360000, icon: "🔌" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: ["#f59e0b", "#94a3b8", "#cd7c2f", "#94a3b8", "#64748b"][i], fontSize: "0.8rem", width: "20px" }}>#{i + 1}</span>
                <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.8rem" }}>{p.name}</p>
                  <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.68rem" }}>{p.qty}x terjual</p>
                </div>
              </div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#16a34a", fontSize: "0.8rem" }}>+{fmt(p.profit)}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "20px", padding: "18px" }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", marginBottom: "14px" }}>📂 Per Kategori</p>
          {[
            { cat: "Provider", icon: "📶", omzet: 3200000, profit: 800000, pct: 40 },
            { cat: "Top Up", icon: "💳", omzet: 3100000, profit: 620000, pct: 38 },
            { cat: "Aksesoris", icon: "🛍️", omzet: 1800000, profit: 700000, pct: 22 },
          ].map((c) => (
            <div key={c.cat} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, color: "#0f172a", fontSize: "0.82rem" }}>{c.icon} {c.cat}</span>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#16a34a", fontSize: "0.8rem" }}>+{fmt(c.profit)}</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.pct}%`, background: "linear-gradient(90deg,#0ea5e9,#0284c7)", borderRadius: "6px", transition: "width 0.6s ease" }} />
              </div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.68rem", color: "#94a3b8", marginTop: "3px" }}>{fmt(c.omzet)} omzet · {c.pct}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PENGATURAN PAGE ──────────────────────────────────────────────
function Pengaturan() {
  return (
    <div style={{ padding: "24px 20px 100px", overflowY: "auto", height: "100%" }}>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a", marginBottom: "20px" }}>⚙️ Pengaturan</h2>
      {[
        { icon: "🏪", title: "Info Toko", sub: "Nama, alamat, nomor WA" },
        { icon: "💳", title: "Metode Pembayaran", sub: "QRIS, Tunai" },
        { icon: "🖨️", title: "Printer Struk", sub: "Hubungkan via Bluetooth" },
        { icon: "📊", title: "Biaya Admin", sub: "Atur biaya Top Up" },
        { icon: "👤", title: "Akun & Password", sub: "Ganti kata sandi" },
        { icon: "🌙", title: "Tampilan", sub: "Mode gelap / terang" },
        { icon: "💾", title: "Backup Data", sub: "Export ke Google Drive" },
        { icon: "📱", title: "Tentang Aplikasi", sub: "KonterPOS v1.0.0" },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: "2px solid #f1f5f9", borderRadius: "14px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0ea5e9")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#f1f5f9")}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
            <div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.88rem" }}>{s.title}</p>
              <p style={{ fontFamily: "'Sora',sans-serif", color: "#94a3b8", fontSize: "0.75rem" }}>{s.sub}</p>
            </div>
          </div>
          <span style={{ color: "#94a3b8", fontSize: "1rem" }}>›</span>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const { w } = useWindowSize();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const isDesktop = w >= 1024;

  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Beranda" },
    { id: "kasir", icon: "🛒", label: "Kasir" },
    { id: "stock", icon: "📦", label: "Stok" },
    { id: "laporan", icon: "📊", label: "Laporan" },
    { id: "pengaturan", icon: "⚙️", label: "Pengaturan" },
  ];

  const renderPage = () => {
    if (page === "dashboard") return <Dashboard onGoKasir={() => setPage("kasir")} isMobile={isMobile} />;
    if (page === "kasir") return <Kasir isMobile={isMobile} isTablet={isTablet} />;
    if (page === "stock") return <Stock isMobile={isMobile} />;
    if (page === "laporan") return <Laporan isMobile={isMobile} />;
    if (page === "pengaturan") return <Pengaturan />;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html, body, #root { height: 100%; }
        body { background: ${isDesktop ? "#e8f0fe" : "#f0f6ff"}; font-family: 'Sora', sans-serif; overflow: hidden; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        button { transition: opacity 0.15s, transform 0.15s; }
        button:active { opacity: 0.8; transform: scale(0.97); }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {isDesktop ? (
        // ── DESKTOP LAYOUT ─────────────────────────────────────
        <div style={{ display: "flex", height: "100vh", maxWidth: "1440px", margin: "0 auto" }}>
          {/* Sidebar */}
          <div style={{ width: "230px", background: "white", borderRight: "2px solid #f1f5f9", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            {/* Logo */}
            <div style={{ padding: "24px 20px 20px", borderBottom: "2px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📱</div>
                <div>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "0.95rem", lineHeight: 1 }}>KonterPOS</p>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.68rem", color: "#94a3b8" }}>Jaya Cell</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "16px 12px" }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setPage(item.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", border: "none", background: page === item.id ? "#e0f2fe" : "transparent", color: page === item.id ? "#0284c7" : "#64748b", fontFamily: "'Sora',sans-serif", fontWeight: page === item.id ? 700 : 500, fontSize: "0.88rem", cursor: "pointer", marginBottom: "4px", textAlign: "left", transition: "background 0.15s" }}>
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  {item.label}
                  {page === item.id && <span style={{ marginLeft: "auto", width: "6px", height: "6px", background: "#0284c7", borderRadius: "50%" }} />}
                </button>
              ))}
            </nav>

            {/* Bottom info */}
            <div style={{ padding: "16px", borderTop: "2px solid #f1f5f9" }}>
              <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "10px 12px" }}>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.7rem", color: "#16a34a", fontWeight: 700 }}>● Online</p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.68rem", color: "#94a3b8", marginTop: "2px" }}>Sinkron aktif</p>
              </div>
            </div>
          </div>

          {/* Main */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Topbar */}
            <div style={{ background: "white", borderBottom: "2px solid #f1f5f9", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "1rem" }}>
                  {navItems.find((n) => n.id === page)?.icon} {navItems.find((n) => n.id === page)?.label}
                </h2>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.72rem", color: "#94a3b8" }}>Jumat, 20 Februari 2026</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.85rem" }}>👤</span>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>Admin</span>
                </div>
              </div>
            </div>

            {/* Page content */}
            <div style={{ flex: 1, overflow: "hidden" }}>{renderPage()}</div>
          </div>
        </div>

      ) : isTablet ? (
        // ── TABLET LAYOUT ───────────────────────────────────────
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {/* Topbar */}
          <div style={{ background: "white", borderBottom: "2px solid #f1f5f9", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>📱</div>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "1rem" }}>KonterPOS</span>
            </div>
            <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "4px 10px", borderRadius: "8px", fontSize: "0.72rem", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>● Online</span>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "hidden" }}>{renderPage()}</div>

          {/* Bottom nav (tablet) */}
          <div style={{ background: "white", borderTop: "2px solid #f1f5f9", padding: "6px 0 10px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setPage(item.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", background: "none", border: "none", cursor: "pointer", padding: "6px 16px", borderRadius: "12px", transition: "background 0.15s" }}>
                  <span style={{ fontSize: "1.3rem", filter: page === item.id ? "none" : "grayscale(1) opacity(0.5)" }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.65rem", fontWeight: page === item.id ? 700 : 500, color: page === item.id ? "#0284c7" : "#94a3b8" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      ) : (
        // ── MOBILE LAYOUT ───────────────────────────────────────
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "430px", margin: "0 auto", background: "#f0f6ff" }}>
          {/* Topbar */}
          <div style={{ background: "white", padding: "13px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg,#0ea5e9,#0284c7)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📱</div>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: "#0f172a", fontSize: "0.92rem" }}>KonterPOS</span>
            </div>
            <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "3px 9px", borderRadius: "7px", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>● Online</span>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "hidden" }}>{renderPage()}</div>

          {/* Bottom nav */}
          <div style={{ background: "white", borderTop: "2px solid #f1f5f9", padding: "6px 0 10px", flexShrink: 0 }}>
            <div style={{ display: "flex" }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setPage(item.id)}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", background: "none", border: "none", cursor: "pointer", padding: item.id === "kasir" ? "0 0 2px" : "6px 0 2px", position: "relative" }}>
                  {item.id === "kasir" ? (
                    <div style={{ background: page === "kasir" ? "linear-gradient(135deg,#0ea5e9,#0284c7)" : "#f1f5f9", width: "42px", height: "42px", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", marginTop: "-14px", boxShadow: page === "kasir" ? "0 6px 18px rgba(14,165,233,0.4)" : "none" }}>
                      {item.icon}
                    </div>
                  ) : (
                    <span style={{ fontSize: "1.15rem", filter: page === item.id ? "none" : "grayscale(1) opacity(0.45)" }}>{item.icon}</span>
                  )}
                  <span style={{ fontFamily: "'Sora',sans-serif", fontSize: "0.6rem", fontWeight: page === item.id ? 700 : 500, color: page === item.id ? "#0284c7" : "#94a3b8" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating WA */}
      <button style={{ position: "fixed", bottom: isDesktop ? "28px" : "80px", right: isDesktop ? "28px" : "16px", zIndex: 50, width: "48px", height: "48px", borderRadius: "50%", border: "none", background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 6px 20px rgba(37,211,102,0.5)", cursor: "pointer", fontSize: "1.3rem" }}
        title="Hubungi CS via WhatsApp">
        💬
      </button>
    </>
  );
}

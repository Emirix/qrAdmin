import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
function Sidebar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    axios.get("/restoran/" + localStorage.getItem("admin_slug")).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }
  let location = useLocation();
  console.log(location);
  if (!location.pathname.includes("login")) {
    return (
      <div className="flex-shrink-0 p-3 bg-white" style={{ width: "238px" }}>
        <Link
          to="/"
          className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
        >
          <img
            className="img-fluid"
            src={data && axios.defaults.baseURL + "/logo/" + data[0].logo}
            alt=""
          />{" "}
        </Link>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
            >
              Ana Sayfa
            </button>
            <div className="collapse show" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link to="/" className="link-dark rounded">
                    Genel Bakış
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="true"
            >
              Siparişler
            </button>
            <div className="collapse show" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link
                    to="/islemdeki-siparisler"
                    className="link-dark rounded"
                  >
                    İşlemdeki Siparişler
                  </Link>
                </li>
                <li>
                  <Link to="/paket" className="link-dark rounded">
                    Paket Servis
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse"
              aria-expanded="true"
            >
              Katalog
            </button>
            <div className="collapse show" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link
                    to="/kategori-listesi"
                    href="#"
                    className="link-dark rounded"
                  >
                    Kategoriler
                  </Link>
                </li>
                <li>
                  <Link to="/istekler" className="link-dark rounded">
                    Müşteri İstekleri
                  </Link>
                </li>
                <li>
                  <Link to="/yorumlar" className="link-dark rounded">
                    Yorumlar
                  </Link>
                </li>
                <li>
                  <Link to="/urun-ekle" className="link-dark rounded">
                    Ürün Ekle
                  </Link>
                </li>
                <li>
                  <Link to="/urun-listesi" className="link-dark rounded">
                    Ürün Listesi
                  </Link>
                </li>

                <li>
                  <Link to="/kampanya" className="link-dark rounded">
                    Kampanya Yap
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse1"
              aria-expanded="true"
            >
              Masalar
            </button>
            <div className="collapse show" id="orders-collapse1">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link to="/mesaj-gonder" className="link-dark rounded">
                    Mesaj Gönder
                  </Link>
                </li>
                <li>
                  <Link to="/masa-ekle" className="link-dark rounded">
                    Masalar
                  </Link>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Masa Aktarımı
                  </a>
                </li>
                <li>
                  <Link to="/qr" className="link-dark rounded">
                    QR Kod Oluştur
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse2"
              aria-expanded="true"
            >
              Rapor
            </button>
            <div className="collapse show" id="orders-collapse2">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Satış Listesi
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse3"
              aria-expanded="true"
            >
              Hesap
            </button>
            <div className="collapse show" id="account-collapse3">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link to="/ayarlar" className="link-dark rounded">
                    Ayarlar
                  </Link>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      localStorage.removeItem("admin_id");
                      localStorage.removeItem("admin_slug");
                      window.location = "/";
                    }}
                    href="#"
                    className="link-dark rounded"
                  >
                    Çıkış Yap
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Sidebar;

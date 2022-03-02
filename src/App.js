import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import IslemdekiSiparisler from "./pages/IslemdekiSiparisler";
import KategoriEkle from "./pages/KategoriEkle";
import KategoriListe from "./pages/KategoriListe";
import Login from "./pages/Login";
import TamamlananSiparisler from "./pages/TamamlananSiparisler";
import UrunEkle from "./pages/UrunEkle";
import UrunListe from "./pages/UrunListe";
import { ToastContainer, toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import Start from "./pages/Start";
import MasaListesi from "./pages/MasaListesi";
import MasaEkle from "./pages/MasaEkle";
import Istek from "./pages/Istek";
import Ayarlar from "./pages/Ayarlar";
import Yorumlar from "./pages/Yorumlar";
import MesajGonder from "./pages/MesajGonder";
import Paket from "./pages/Paket";
import CreateQR from "./pages/CreateQR";
import Kampanya from "./pages/Kampanya";

function App() {
  const [data, setData] = useState(null);
  const [sidebar, setSidebar] = useState(false)

  function getInfo() {
    axios.get("/restoran/" + localStorage.getItem("admin_slug")).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }

  useEffect(() => {
    if (localStorage.getItem("admin_slug")) {
      getInfo();
    }



    const socket = socketIOClient("http://192.168.1.80:3050/");

    socket.on("output siparis", (data) => {
      toast.success(`YENI SIPARIS VAR.`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const audio = new Audio("success.mp3");
      audio.play();
    });

    socket.on("output istek", (data) => {
      toast.success(`Yeni bir müşteri talebi var`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, []);
  return (
    <Router>
      {!window.location.pathname.includes("login") ? (
        <div className="mobil-header">
          <div className="burger" onClick={e=>setSidebar(!sidebar)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <Link to="/" className="logo">
            <img
              src={data && axios.defaults.baseURL + "/logo/" + data[0].logo}
            />
          </Link>
        </div>
      ) : (
        ""
      )}

        {sidebar ? 
      <div className="mobil-side-bg ">
      <div className="side">
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
                  <Link onClick={()=>setSidebar(false)} to="/" className="link-dark rounded">
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
                  <Link onClick={()=>setSidebar(false)}
                    to="/islemdeki-siparisler"
                    className="link-dark rounded"
                  >
                    İşlemdeki Siparişler
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/paket" className="link-dark rounded">
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
                  <Link onClick={()=>setSidebar(false)}
                    to="/kategori-listesi"
                    href="#"
                    className="link-dark rounded"
                  >
                    Kategoriler
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/istekler" className="link-dark rounded">
                    Müşteri İstekleri
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/yorumlar" className="link-dark rounded">
                    Yorumlar
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/urun-ekle" className="link-dark rounded">
                    Ürün Ekle
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/urun-listesi" className="link-dark rounded">
                    Ürün Listesi
                  </Link>
                </li>

                <li>
                  <Link onClick={()=>setSidebar(false)} to="/kampanya" className="link-dark rounded">
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
                  <Link onClick={()=>setSidebar(false)} to="/mesaj-gonder" className="link-dark rounded">
                    Mesaj Gönder
                  </Link>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/masa-ekle" className="link-dark rounded">
                    Masalar
                  </Link>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Masa Aktarımı
                  </a>
                </li>
                <li>
                  <Link onClick={()=>setSidebar(false)} to="/qr" className="link-dark rounded">
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
                  <Link onClick={()=>setSidebar(false)} to="/ayarlar" className="link-dark rounded">
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

      </div> : "" }

      <div className="d-flex">
        <Sidebar
          ayar={data && axios.defaults.baseURL + "/logo/" + data[0].logo}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Switch>
          <Route path="/" exact>
            <Page>
              <Index />
            </Page>
          </Route>

          <Route path="/login" exact>
            <Page>
              <Login />
            </Page>
          </Route>

          <Route path="/kampanya" exact>
            <Page>
              <Kampanya />
            </Page>
          </Route>

          <Route path="/qr" exact>
            <Page>
              <CreateQR />
            </Page>
          </Route>
          <Route path="/paket" exact>
            <Page>
              <Paket />
            </Page>
          </Route>

          <Route path="/ayarlar" exact>
            <Page>
              <Ayarlar />
            </Page>
          </Route>

          <Route path="/mesaj-gonder" exact>
            <Page>
              <MesajGonder />
            </Page>
          </Route>

          <Route path="/yorumlar" exact>
            <Page>
              <Yorumlar />
            </Page>
          </Route>

          <Route path="/kategori-listesi" exact>
            <Page>
              <KategoriListe />
            </Page>
          </Route>

          <Route path="/kategori-ekle" exact>
            <Page>
              <KategoriEkle />
            </Page>
          </Route>

          <Route path="/islemdeki-siparisler" exact>
            <Page>
              <IslemdekiSiparisler />
            </Page>
          </Route>

          <Route path="/tamamlanan-siparisler" exact>
            <Page>
              <TamamlananSiparisler />
            </Page>
          </Route>

          <Route path="/urun-ekle" exact>
            <Page>
              <UrunEkle />
            </Page>
          </Route>

          <Route path="/urun-listesi" exact>
            <Page>
              <UrunListe />
            </Page>
          </Route>

          <Route path="/masa-listesi" exact>
            <Page>
              <MasaListesi />
            </Page>
          </Route>

          <Route path="/masa-ekle" exact>
            <Page>
              <MasaEkle />
            </Page>
          </Route>

          <Route path="/istekler" exact>
            <Page>
              <Istek />
            </Page>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

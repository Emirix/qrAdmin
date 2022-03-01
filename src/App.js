import { width } from "@mui/system";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Page from "./components/Page"
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import IslemdekiSiparisler from "./pages/IslemdekiSiparisler";
import KategoriEkle from "./pages/KategoriEkle";
import KategoriListe from "./pages/KategoriListe";
import Login from "./pages/Login";
import TamamlananSiparisler from "./pages/TamamlananSiparisler";
import UrunEkle from "./pages/UrunEkle";
import UrunListe from "./pages/UrunListe";
import { ToastContainer, toast } from 'react-toastify';
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
  useEffect(()=>{
    const socket = socketIOClient("http://192.168.1.80:3050/");

    socket.on("output siparis", data => {
       toast.success(`YENI SIPARIS VAR.`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

         const audio = new Audio('success.mp3');
         audio.play();
    
  
     });

     socket.on("output istek", data => {
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
  },[])
  return (
    <Router>
      <div className="d-flex"> 
      <Sidebar/>
      <ToastContainer position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
     

      <Switch>
        <Route path="/" exact>
            <Page>
                <Index />
            </Page>
        </Route>

        

        <Route path="/login" exact>
            <Page>
                <Login/>
            </Page>
        </Route>


        <Route path="/kampanya" exact>
            <Page>
                <Kampanya/>
            </Page>
        </Route>


        <Route path="/qr" exact>
            <Page>
                <CreateQR/>
            </Page>
        </Route>
        <Route path="/paket" exact>
            <Page>
                <Paket/>
            </Page>
        </Route>
              

        <Route path="/ayarlar" exact>
            <Page>
                <Ayarlar/>
            </Page>
        </Route>

        <Route path="/mesaj-gonder" exact>
            <Page>
               <MesajGonder/>
            </Page>
        </Route>


        
        <Route path="/yorumlar" exact>
            <Page>
                <Yorumlar/>
            </Page>
        </Route>

        <Route path="/kategori-listesi" exact>
            <Page>
                <KategoriListe/>
            </Page>
        </Route>


        <Route path="/kategori-ekle" exact>
            <Page>
                <KategoriEkle/>
            </Page>
        </Route>

        <Route path="/islemdeki-siparisler" exact>
            <Page>
                <IslemdekiSiparisler/>
            </Page>
        </Route>

        <Route path="/tamamlanan-siparisler" exact>
            <Page>
              <TamamlananSiparisler/>
            </Page>
        </Route>

        <Route path="/urun-ekle" exact>
            <Page>
                <UrunEkle/>
            </Page>
        </Route>

        <Route path="/urun-listesi" exact>
            <Page>
                <UrunListe/>
            </Page>
        </Route>

        <Route path="/masa-listesi" exact>
            <Page>
                <MasaListesi/>
            </Page>
        </Route>

        <Route path="/masa-ekle" exact>
            <Page>
                <MasaEkle/>
            </Page>
        </Route>

        <Route path="/istekler" exact>
            <Page>
                <Istek/>
            </Page>
        </Route>


      </Switch>
      </div>
  </Router>
  );
}

export default App;

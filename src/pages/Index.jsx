import React from 'react';
import {Redirect,Link} from "react-router-dom"
function Index() {
 if(!localStorage.getItem("admin_id")){
     return <Redirect to="login"/>
 }else{
  return(
    <div className='sayfa'>
      <div className="admin-head-banner position-relative">
        <div className="sol ">
          <h4 className='fs-2'>Hoşgeldiniz Emir</h4>
          <p className='text-secondary fs-6 ' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum vel, perspiciatis facilis odio quos, voluptas quasi doloribus mollitia at quod illum ipsum placeat explicabo amet. Ea beatae consequatur dolorem cumque.</p>
        </div>
        <div className="sag flex-fill">
          <img src="/icons/is.svg" className='position-absolute' alt="" />
        </div>
      </div>



      <div className="row mt-3">
        <div className="col-12 col-md-6 col-lg-3">
          <Link to="/islemdeki-siparisler" className="easy-nav">
          <div className="sol">
          <i class="bi bi-currency-euro"></i>
          </div>
          <div className="sag">
            <div className="title">Siparişler</div>
            <div className="desc">Siparişlerinizi yönetin</div>
          </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
        <Link to="/istekler" className="easy-nav">
          <div className="sol">
          <i class="bi bi-chat-dots"></i>          </div>
          <div className="sag">
            <div className="title">Müşteri İstekleri</div>
            <div className="desc">İstekleri yönetin</div>
          </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
        <Link to="/mesaj-gonder" className="easy-nav">
          <div className="sol">
          <i class="bi bi-envelope"></i>       </div>
          <div className="sag">
            <div className="title">Mesaj Gönderme</div>
            <div className="desc">Belirli masalara mesaj gönderin</div>
          </div>
          </Link>
        </div>
      </div>

      <hr />
      <h5 className='mt-5'>Günlük İstatislikler</h5>
      <div className="row gy-3">
        <div className="col-lg-3 col-6 ">
          <div className="box bg-yesil">
            <div className="val">225,50 TL</div>
            <div className="key">BUGÜN YAPILAN SATIŞ</div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
        <div className="box bg-mavi">
            <div className="val">56</div>
            <div className="key">BUGÜN SATILAN ÜRÜN</div>
          </div>
        </div>
        <div className="col-lg-3 col-6 ">
          <div className="box bg-orange">
            <div className="val">0</div>
            <div className="key">SİPARİŞ BEKLENİYOR</div>
          </div></div>
        <div className="col-lg-3 col-6">
        <div className="box bg-dark">
            <div className="val">2</div>
            <div className="key">İSTEK VAR</div>
          </div>
        </div>
      
      </div>

    

   

      <hr />
      <div className="row">
      <div className="col-12 col-md-4">
        <div className="destek d-flex ">
          
          <div className="sag">
          <i class="bi bi-telephone"></i>

          </div>
          <div className="sol">
            <div className="title">0850 381 6590</div>
            <div className="desc">Destek Hattı</div>
          </div>
        </div>
      </div>
      </div>
    
    </div>
  )}
}

export default Index;

import React from 'react';
import {Redirect} from "react-router-dom"
function Index() {
 if(!localStorage.getItem("admin_id")){
     return <Redirect to="login"/>
 }else{
  return(
    <div className='sayfa'>
      <div className="admin-head-banner position-relative">
        <div className="sol w-50 ">
          <h4 className='fs-2'>Hoşgeldiniz Emir</h4>
          <p className='text-secondary fs-6 ' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum vel, perspiciatis facilis odio quos, voluptas quasi doloribus mollitia at quod illum ipsum placeat explicabo amet. Ea beatae consequatur dolorem cumque.</p>
        </div>
        <div className="sag flex-fill">
          <img src="/icons/is.svg" className='position-absolute' alt="" />
        </div>
      </div>

      <h5 className='mt-5'>Günlük İstatislikler</h5>

      <div className="row ">
        <div className="col-lg-3  ">
          <div className="box bg-yesil">
            <div className="val">225,50 TL</div>
            <div className="key">BUGÜN YAPILAN SATIŞ</div>
          </div>
        </div>
        <div className="col-lg-3 ">
        <div className="box bg-mavi">
            <div className="val">56</div>
            <div className="key">BUGÜN SATILAN ÜRÜN</div>
          </div>
        </div>
        <div className="col-lg-3 ">
          <div className="box bg-orange">
            <div className="val">0</div>
            <div className="key">SİPARİŞ BEKLENİYOR</div>
          </div></div>
        <div className="col-lg-3 ">
        <div className="box bg-dark">
            <div className="val">2</div>
            <div className="key">İSTEK VAR</div>
          </div>
        </div>
      
      </div>
    </div>
  )}
}

export default Index;

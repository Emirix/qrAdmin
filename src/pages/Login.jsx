import axios from 'axios';
import React from 'react';
import "./login.css"

function Login() {
    function submit(e){
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)

        axios.post("/login",{
            nick:e.target[0].value,
            pass:e.target[1].value
        }).then(res=>{
            console.log(res)
            localStorage.setItem("admin_id",res.data.id)
            localStorage.setItem("admin_slug",res.data.slug)
            window.location.replace("/")
        }).catch(err=>{
            alert("hata")
        })
    }
  return (
    <div className=''>
        <img class="wave" src="/login/wave.png"/>
	<div class="containerx">
		<div class="img">
			<img src="/login/bg.svg"/>
		</div>
		<div class="login-content">
			<form style={{width:"300px"}} onSubmit={e=>submit(e)}>
				<img src="/login/avatar.svg"/>
				<h2 class="title">ÜYE GİRİŞİ</h2>
           		<div class="input-div one">
           		   <div class="i">
           		   		<i class="fas fa-user"></i>
           		   </div>
           		   <div class="div">
                        <input type="text" name='nick' className='' placeholder="isim" />
           		   </div>
           		</div>
           		<div class="input-div pass">
           		   <div class="i"> 
           		    	<i class="fas fa-lock"></i>
           		   </div>
           		   <div class="div">
                           <input type="text" name="pass" className='' placeholder="şifre" />
            	   </div>
            	</div>
            	<a href="#">Şifrenizi mi unuttunuz?</a>
            	<input type="submit" class="btnx" value="GİRİŞ"/>
            </form>
        </div>
    </div>
    
    </div>
  );
}

export default Login;

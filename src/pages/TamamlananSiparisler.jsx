import React from 'react';

function TamamlananSiparisler() {
  return (
      
    <div className='sayfa'>
        <h1>Tamamlanan Siparişler</h1>
        <p className="text-secondary">Sistem üzerinden verilen bütün siparişleri buradan görebilirsiniz</p>
    
      
      
            <div class="mt-5 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Ürün</th>
                                        <th>Tutar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hitesh Chauhan</td>
                                        <td>Engine</td>
                                        <td class="text-danger"> 18.76% <i class="fa fa-arrow-down"></i></td>
                                        <td><label class="badge badge-danger">Pending</label></td>
                                    </tr>
                                 
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
       
    

    </div>
  );
}

export default TamamlananSiparisler;

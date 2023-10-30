import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import { useParams } from "react-router-dom";

export default function WebProductsShow() {
  // initial state
  document.title = "Desa digital - detail";

  //   useParams
  const { slug } = useParams();

  //   initial state
  const [product, setProduct] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);

  //   fetch detail data product
  const fetchDetaiDataProduct = async () => {
    // set loading to true
    setLoadingProduct(true);
    await Api.get(`/api/public/products/${slug}`).then((response) => {
      // pass data to product
      setProduct(response.data.data);

      // set loading to false
      setLoadingProduct(false);
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDetaiDataProduct();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body post-content">
                <img src={product.image} className="rounded w-100 mb-3" />
                <table className="table">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        style={{ width: "15%" }}
                        className="text-uppercase"
                      >
                        Nama Produk
                      </th>
                      <td style={{ width: "1%" }}>:</td>
                      <td>{product.title}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-uppercase">
                        No. Telp / WA
                      </th>
                      <td>:</td>
                      <td>{product.phone}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-uppercase">
                        Deskripsi
                      </th>
                      <td>:</td>
                      <td colSpan="2">
                        <p
                          dangerouslySetInnerHTML={{ __html: product.content }}
                        ></p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-uppercase">
                        Alamat
                      </th>
                      <td>:</td>
                      <td>{product.address}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-uppercase">
                        Beli Produk
                      </th>
                      <td>:</td>
                      <td>
                        <a
                          href={`https://api.whatsapp.com/send?phone=&${product.phone}text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20%${product.title}`}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Beli
                          Sekarang
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}

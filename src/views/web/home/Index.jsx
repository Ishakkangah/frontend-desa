import React, { useEffect, useState } from "react";

import LayoutWeb from "../../../layouts/Web";
import Sliders from "../../../components/web/Sliders";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import CardProduct from "../../../components/general/CardProduct";
import Api from "../../../services/Api";
import CardPostsHome from "../../../components/general/CardPostsHome";

export default function Index() {
  // initial title
  document.title = "Desa digital - Home";

  // initial state
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  // useState fetchDataProducstHome
  const fetchDataProducstHome = async () => {
    setLoadingProduct(true);
    await Api.get("/api/public/products_home").then((response) => {
      setProducts(response.data.data);
      setLoadingProduct(false);
    });
  };

  // useState fetchDataPostsHome
  const fetchDataPostsHome = async () => {
    await Api.get(`/api/public/posts_home`).then((response) => {
      setPosts(response.data.data);
    });
  };

  // useEffect
  useEffect(() => {
    // fetch data product home
    fetchDataProducstHome();
    // fetch data posts home
    fetchDataPostsHome();
  }, []);

  return (
    <LayoutWeb>
      <Sliders />

      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="section-title">
              <h4>
                <i className="fa fa-shopping-bag"></i>
                <strong style={{ color: "rgb(209 104 0)" }}> PRODUK </strong>
                DESA
              </h4>
            </div>
          </div>
          {loadingProduct ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <CardProduct key={product.id} product={product} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>

      <div className="container mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="section-title">
              <h4>
                <i className="fa fa-book"></i>
                <strong style={{ color: "rgb(209 104 0)" }}> BERITA </strong>
                TERBARU
              </h4>
            </div>
          </div>
          {/* this is posts */}

          {posts.length > 0 ? (
            posts.map((post, index) => (
              <CardPostsHome key={index} post={post} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}

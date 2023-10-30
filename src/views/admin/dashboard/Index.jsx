import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function Dashboard() {
  // initial title
  document.title = "Dashboard - Desa Digital";

  // hook state
  const [countCategories, setCountCategories] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countAparaturs, setCountAparaturs] = useState(0);

  // token from cookie
  const token = Cookies.get("token");

  // hook useEffect
  useEffect(() => {
    // featch api
    Api.get("/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setCountCategories(data.data.categories);
      setCountPosts(data.data.posts);
      setCountProducts(data.data.products);
      setCountAparaturs(data.data.aparaturs);
    });
  }, []);

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid px-4 mt-5">
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <strong>{countCategories}</strong> CATEGORIES
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/categories"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <strong>{countPosts}</strong> POSTS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/posts"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <strong>{countProducts}</strong> PRODUCTS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/products"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <strong>{countAparaturs}</strong> APARATURS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/aparaturs"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutAdmin>
    </>
  );
}

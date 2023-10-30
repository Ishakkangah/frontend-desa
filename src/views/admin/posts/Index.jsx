import { Link } from "react-router-dom";

import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";
import hasAnyPermission from "../../../utils/Permissions";

// react-confirm-alert
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";

export default function PostsIndex() {
  // initial title
  document.title = "Posts - Desa digital";

  //   initial state
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  //   fetch data postst
  //   use effect
  const fetchDataPosts = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/posts?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log("this is response  :", response);
      // pass data to posts
      setPosts(response.data.data.data);

      // pass data to pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  //   hook useeffect
  useEffect(() => {
    fetchDataPosts();
  }, []);

  //   search data
  const searchData = (e) => {
    e.preventDefault();

    fetchDataPosts(1, keywords);
  };

  //   delete post
  const deletePost = (id) => {
    // show react-confirm-alert
    confirmAlert({
      title: "Are you sure ?",
      message: "Want to delete this data ",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            // delete posts
            await Api.delete(`/api/admin/posts/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              // show toast
              toast.success(response.data.message, {
                duration: 4000,
                position: "top-right",
              });

              //   fetchdatapost
              fetchDataPosts(1, keywords);
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3 col-12 mb-2">
                  {hasAnyPermission(["posts.create"]) && (
                    <Link
                      to="/admin/posts/create"
                      className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  )}
                </div>
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <form action="#" onSubmit={searchData}>
                      <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="search here..."
                      />
                    </form>
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Title</th>
                          <th className="border-0" style={{ width: "20%" }}>
                            Category
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            User
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.length > 0 ? (
                          posts.map((post, index) => (
                            <tr key={Math.random() * index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{post.title}</td>
                              <td>{post.category.name}</td>
                              <td>{post.user.name}</td>
                              <td className="text-center">
                                {hasAnyPermission(["posts.edit"]) && (
                                  <Link
                                    to={`/admin/posts/edit/${post.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermission(["posts.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deletePost(post.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                role="alert"
                              >
                                Data Belum Tersedia!.
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) =>
                      fetchDataPosts(pageNumber, keywords)
                    }
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}

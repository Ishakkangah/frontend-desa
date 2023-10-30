import React from "react";
import { Route, Routes } from "react-router-dom";

// admin route
import Login from "../views/auth/Login";
import Forbidden from "../views/auth/Forbidden";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../views/admin/dashboard/Index";
import PermissionsIndex from "../views/admin/permissions/Index";
import RolesIndex from "../views/admin/roles/Index";
import RolesCreate from "../views/admin/roles/Create";
import RolesEdit from "../views/admin/roles/Edit";
import UsersIndex from "../views/admin/users/Index";
import UsersCreate from "../views/admin/users/Create";
import UsersEdit from "../views/admin/users/Edit";
import CategoriesIndex from "../views/admin/categories/Index";
import CategoriesCreate from "../views/admin/categories/Create";
import CategoriesEdit from "../views/admin/categories/Edit";
import PostsIndex from "../views/admin/posts/Index";
import PostsCreate from "../views/admin/posts/Create";
import PostsEdit from "../views/admin/posts/Edit";
import PagesIndex from "../views/admin/pages/Index";
import PagesCreate from "../views/admin/pages/Create";
import PagesEdit from "../views/admin/pages/Edit";
import ProductsIndex from "../views/admin/products/Index";
import ProductsCreate from "../views/admin/products/Create";
import ProductsEdit from "../views/admin/products/Edit";
import PhotosIndex from "../views/admin/photos/Index";
import SlidersIndex from "../views/admin/sliders/Index";
import AparatursIndex from "../views/admin/aparaturs/Index";
import AparatursCreate from "../views/admin/aparaturs/Create";
import AparatursEdit from "../views/admin/aparaturs/Edit";

// public route
import Home from "../views/web/home/Index";
import WebAparatursIndex from "../views/web/aparaturs/Index";
import WebPagesIndex from "../views/web/pages/Index";
import WebPagesShow from "../views/web/pages/Show";
import WebPhotosIndex from "../views/web/photos/Index";
import WebPostsIndex from "../views/web/posts/Index";
import WebPostsShow from "../views/web/posts/Show";
import WebProductsIndex from "../views/web/products/Index";
import WebProductsShow from "../views/web/products/Show";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />
      {/* private route '/admin/dashboard' */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/roles' */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />
      {/* private route 'admin/roles/create' */}
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />
      {/* private route 'admin/roles/edit */}
      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/users' */}
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <UsersIndex />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/users/create' */}
      <Route
        path="/admin/users/create"
        element={
          <PrivateRoutes>
            <UsersCreate />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/users/edit/:id' */}
      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoutes>
            <UsersEdit />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/categories/index' */}
      <Route
        path="/admin/categories"
        element={
          <PrivateRoutes>
            <CategoriesIndex />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/categories/create' */}
      <Route
        path="/admin/categories/create"
        element={
          <PrivateRoutes>
            <CategoriesCreate />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/categories/edit' */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoriesEdit />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/posts/' */}
      <Route
        path="/admin/posts"
        element={
          <PrivateRoutes>
            <PostsIndex />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/posts/create */}
      <Route
        path="/admin/posts/create"
        element={
          <PrivateRoutes>
            <PostsCreate />
          </PrivateRoutes>
        }
      />
      {/* private route '/admin/posts/edit/:id */}
      <Route
        path="/admin/posts/edit/:id"
        element={
          <PrivateRoutes>
            <PostsEdit />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/pages/' */}
      <Route
        path="/admin/pages"
        element={
          <PrivateRoutes>
            <PagesIndex />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/pages/create' */}
      <Route
        path="/admin/pages/create"
        element={
          <PrivateRoutes>
            <PagesCreate />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/pages/edit/:id' */}
      <Route
        path="/admin/pages/edit/:id"
        element={
          <PrivateRoutes>
            <PagesEdit />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/products' */}
      <Route
        path="/admin/products/"
        element={
          <PrivateRoutes>
            <ProductsIndex />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/products/create' */}
      <Route
        path="/admin/products/create"
        element={
          <PrivateRoutes>
            <ProductsCreate />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/products/edit/:id' */}
      <Route
        path="/admin/products/edit/:id"
        element={
          <PrivateRoutes>
            <ProductsEdit />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/photos' */}
      <Route
        path="/admin/photos"
        element={
          <PrivateRoutes>
            <PhotosIndex />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/sliders' */}
      <Route
        path="/admin/sliders"
        element={
          <PrivateRoutes>
            <SlidersIndex />
          </PrivateRoutes>
        }
      />
      {/* Private route '/admin/aparaturs' */}
      <Route
        path="/admin/aparaturs"
        element={
          <PrivateRoutes>
            <AparatursIndex />
          </PrivateRoutes>
        }
      />
      {/* Provate route 'admin/aparaturs/create' */}
      <Route
        path="/admin/aparaturs/create"
        element={
          <PrivateRoutes>
            <AparatursCreate />
          </PrivateRoutes>
        }
      />
      {/* Provate route 'admin/aparaturs/edit/:id' */}
      <Route
        path="/admin/aparaturs/edit/:id"
        element={
          <PrivateRoutes>
            <AparatursEdit />
          </PrivateRoutes>
        }
      />
      {/* route "/" */}
      <Route path="/" element={<Home />} />
      {/* route '/aparaturs' */}
      <Route path="/aparaturs" element={<WebAparatursIndex />} />

      {/* route '/pages' */}
      <Route path="/pages" element={<WebPagesIndex />} />

      {/* route '/pages/:slug' */}
      <Route path="/pages/:slug" element={<WebPagesShow />} />

      {/* route '/photos' */}
      <Route path="/photos" element={<WebPhotosIndex />} />

      {/* route '/posts/' */}
      <Route path="/posts" element={<WebPostsIndex />} />

      {/* route 'posts/:id' */}
      <Route path="/posts/:slug" element={<WebPostsShow />} />

      {/* route 'products/' */}
      <Route path="/products" element={<WebProductsIndex />} />

      {/* route 'products/:slug' */}
      <Route path="/products/:slug" element={<WebProductsShow />} />
    </Routes>
  );
}

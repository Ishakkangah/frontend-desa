import React from "react";
import { Link } from "react-router-dom";
import MoneyFormat from "../../utils/MoneyFormat";

export default function CardProduct({ product }) {
  return (
    <div className="col-md-4 mb-3" key={product.id}>
      <Link to={`/products/${product.slug}`} className="text-decoration-none">
        <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
          <img src={product.image} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">
              {product.title.length > 50
                ? `${product.title.substring(0, 50)}...`
                : product.title}
            </h5>
            <p className="card-text mt-3">{MoneyFormat(product.price)}</p>
            <hr />

            <a
              href={`https://api.whatsapp.com/send?phone=${product.phone}&text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20${product.title}`}
              className="btn btn-primary w-100"
              target="_blank"
            >
              <i className="fa-brands fa-whatsapp"></i> Beli Sekarang
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}

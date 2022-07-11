import React, { useEffect, useState } from "react";
import {
  GET_ALL_TAGS,
  GET_COLLECTIONS,
  GET_PAGINATIONS,
  IS_LOGED,
} from "../../services";
import { Switch, Route, Link } from "react-router-dom";

const Home = () => {
  // GET_COLLECTIONS
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getCollections();
  }, []);
  const getCollections = async () => {
    try {
      const res = await GET_COLLECTIONS();
      setCollections(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  // GET_PAGINATIONS
  let initialPage = 0;
  let [page, setPage] = useState(initialPage);
  let [pageData, setPageData] = useState([]);
  useEffect(() => {
    pagination();
  }, []);
  const pagination = async () => {
    try {
      const res = await GET_PAGINATIONS(page);
      setPageData(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  // NEXT_PAGE
  const next_page = async () => {
    if (pageData?.data?.length < 15) return;

    setPage((page += 1));
    try {
      const res = await GET_PAGINATIONS(page);
      setPageData(res);
    } catch (err) {}
    console.log(page);
  };
  // PREV_PAGE
  const prev_page = async () => {
    if (page <= 0) return;

    setPage((page -= 1));
    try {
      const res = await GET_PAGINATIONS(page);
      setPageData(res);
    } catch (err) {}
    console.log(page);
  };

  // GET_ALL_TAGS
  let [hashtags, setHashtags] = useState([]);
  useEffect(() => {
    tags();
  }, []);
  const tags = async () => {
    try {
      const res = await GET_ALL_TAGS();
      setHashtags(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        {collections.data?.map((item, index) => (
          <div className="col-lg-4 col-md-4 col-sm-12" key={index}>
            <div className="card mb-4">
              <img src={item.imageAddress} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{item.name}</h5>
                <p className="card-text">
                  <b>Author:</b> {item.author}
                </p>
                <p className="card-text">
                  <b>Topic:</b> {item.topic}
                </p>
                <Link className="btn btn-primary" to={`collection/${item?.id}`}>
                  Preview
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Topic</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.data?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item?.id}</th>
                <td>{item?.name}</td>
                <td>{item?.author}</td>
                <td>{item?.topic}</td>
                <td>
                  {/* <button className="btn btn-dark">Preview</button> */}
                  <Link className="btn btn-dark" to={`collection/${item?.id}`}>
                    Preview
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={prev_page}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={next_page}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="alert alert-warning" role="alert">
            {hashtags?.data?.map((item, index) => (
              <button className="btn me-2" key={index}>
                #<span>{item?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

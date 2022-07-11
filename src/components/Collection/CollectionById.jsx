import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CollectionById = () => {
  let currentURL = window.location.href;
  const id = currentURL.split("/")[5];

  const [html, setHTML] = useState({});
  console.log(html?.data);
  const tableData = html?.data?.responseItems;

  useEffect(() => {
    async function createMarkup(id) {
      try {
        let response;
        response = await axios.get(
          `https://backend-final-task-itransition.herokuapp.com/${id}`
        );

        // console.log(response);
        return setHTML(response);
      } catch (err) {
        // console.log(err.message);
        toast.error(err.message);
      }
    }
    createMarkup(id);
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 offset-sm-0 offset-md-3 py-5 offset-lg-4 text-sm-center">
          <div className="card">
            <img
              src={html?.data?.imageAddress}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title text-center">{html?.data?.name}</h5>
              <p className="card-text">
                <b>Description:</b> {html?.data?.description}
              </p>
              <p className="card-text">
                <b>Author:</b> {html?.data?.author}
              </p>
              <p className="card-text">
                <b>Topic:</b> {html?.data?.topic}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Tags</th>
              <th scope="col">Like count</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>
                  {item.hashtags?.map((item, index) => (
                    <span key={index}>{item?.name},</span>
                  ))}
                </td>
                <td>{item.likeCount}</td>
                <td>
                  <Link to={`item/${item.id}`} className="btn btn-primary">
                    Preview
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {tableData?.map((item, index) => {
          console.log(item);
        })} */}
      </div>
    </div>
  );
};

export default CollectionById;

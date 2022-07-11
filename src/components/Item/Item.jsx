import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import likeIcon from "../../assets/icons/like.png";
import "./item.css";

const Item = () => {
  let currentURL = window.location.href;
  const id = currentURL.split("/")[6];
  const itemId = currentURL.split("/")[4];

  let itemData = null;

  const [collection, setCollection] = useState({});
  // const columns?.data?.responseCollectionColumns;

  const columnItem = collection?.data?.responseItems;
  for (let i = 0; i < columnItem?.length; i++) {
    if (columnItem[i].id == id) {
      itemData = columnItem[i];
    }
  }
  // console.log(collection);
  const forTable = collection?.data?.responseCollectionColumns;
  const tableValue = [];
  for (let i = 0; i < forTable?.length; i++) {
    // console.log(forTable[i]);
    // console.log(console.log(itemData?.values));
    for (let j = 0; j < itemData?.values?.length; j++) {
      // console.log(itemData?.values?.[j]);
      if (forTable[i]?.id == itemData?.values[j]?.columnId) {
        // console.log(forTable[i]?.name, itemData?.values[j]?.value);
        tableValue.push({
          name: forTable[i]?.name,
          value: itemData?.values[j]?.value,
        });
      }
    }
  }
  const coment = itemData?.commentaries;
  let initialLike = itemData?.likeCount;
  useEffect(() => {
    async function collection(id) {
      try {
        let response;
        response = await axios.get(
          `https://backend-final-task-itransition.herokuapp.com/collection/${id}`
        );

        // console.log(response);
        return setCollection(response);
      } catch (err) {
        // console.log(err.message);
        toast.error(err.message);
      }
    }
    collection(itemId);
  }, []);
  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col">
          <div className="alert alert-info" role="alert">
            <h1 className="text-center">{itemData?.name}</h1>
            <div className="row">
              <div className="col">
                {itemData?.hashtags?.map((item, index) => (
                  <span className="badge bg-success me-2 hashtag" key={index}>
                    #{item.name}
                  </span>
                ))}
              </div>
              <div className="col d-flex justify-content-end">
                <button className="btn d-flex align-center">
                  <img
                    src={likeIcon}
                    alt="likeIcon"
                    className="iconLike me-2"
                  />{" "}
                  <b>{initialLike}</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-hover">
            <thead>
              <tr>
                {forTable?.map((item, index) => (
                  <th scope="col" key={index}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableValue?.map((item, index) => (
                  <td key={index}>{item?.value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
            />
            <label htmlFor="floatingTextarea2">Comments</label>
          </div> */}
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-0 border mt-5">
            <div className="card-body p-4">
              {/* ADD COMENT FOR LOGIN USER  */}
              {/* <div className="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  className="form-control"
                  placeholder="Type comment..."
                />
                <label className="form-label" htmlFor="addANote">
                  + Add a note
                </label>
              </div> */}
              <h4 className="text-center text-primary">Comment</h4>
              {coment?.map((item, index) => (
                <div className="card mb-4 " key={index}>
                  <b className="small mb-0 ms-2">User: {item.username}</b>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <p>{item.text}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

import axios from "axios";
const url = "https://backend-final-task-itransition.herokuapp.com";

// GET_COLLECTIONS
export const GET_COLLECTIONS = async () => {
  try {
    const res = await axios.get("https://backend-final-task-itransition.herokuapp.com/collection/get-top");
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

// GET_PAGINATIONS
export const GET_PAGINATIONS = async (page) => {
  try {
    const res = await axios.get(`https://backend-final-task-itransition.herokuapp.com/collection/get-all/${page}`);
    return res;
  } catch (err) {
    return err.message;
  }
};

// GET_ALL_TAGS
export const GET_ALL_TAGS = async () => {
  try {
    const res = await axios.get("https://backend-final-task-itransition.herokuapp.com/hashtag");
    return res;
  } catch (err) {
    return err.message;
  }
};

// ISLOGED
export const IS_LOGED = async (mytoken) => {
  try {
    const res = await axios.get("https://backend-final-task-itransition.herokuapp.com/auth/check-jwt", {
      headers: { Authorization: mytoken },
    });

    return res;
  } catch (err) {
    return err.message;
  }
};

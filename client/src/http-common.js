import axios from "axios";

export default axios.create({
    baseURL: "http://warehouse-ggc-3.cyom8fnp9kmy.us-east-2.rds.amazonaws.com:3306/api",
    headers: {
      "Content-type": "application/json"
    }
  });

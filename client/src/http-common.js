import axios from "axios";

export default axios.create({
    baseURL: "http://goatsportalversion3-env.eba-86ripgd3.us-east-1.elasticbeanstalk.com/api",
    headers: {
      "Content-type": "application/json"
    }
  });

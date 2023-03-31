import axios from "axios";

export default axios.create({
    baseURL: "http://goatsportalne-env.eba-jgwabt4g.us-east-1.elasticbeanstalk.com",
    headers: {
      "Content-type": "application/json"
    }
  });

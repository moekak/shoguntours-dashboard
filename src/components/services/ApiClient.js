import axios from "axios";

export function apiClient() {
      const token = localStorage.getItem("token")
      const fetchGet = async (url) => {
            try{
                  const response = await axios.get(url, {
                        headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                              "Content-Type": "application/json",
                        },
                  });

                  return response.data;
            }catch(error){
                  console.log(error);
                  throw error
            }

            
      };
      const fetchPost = async (url, data = {}) => {
            try{
                  const response = await axios.post(url, data, {
                        headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                              "Content-Type": "application/json",
                        },
                  });

                  return response.data;
            }catch(error){
                  throw error
            }
      };

      return { fetchGet, fetchPost };
}
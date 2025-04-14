import { useState } from "react";

const useFetchFromSheet = () => {
  const [loading, setLoading] = useState(false);

  const sendRequest = (formData, requestType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      google.script.run
        .withSuccessHandler((response) => {
          setLoading(false);
          resolve(response);
        })
        .withFailureHandler((error) => {
          setLoading(false);
          reject(error);
        })
        .checkRequest(formData, requestType);
    });
  };

  const addRequest = async (formData) => {
    return await sendRequest(formData, "addData");
  };

  const editRequest = async (formData) => {
    return await sendRequest(formData, "editData");
  };

  const deleteRequest = async (formData) => {
    return await sendRequest(formData, "deleteData");
  };

  const fetchRequest = async (formData) => {
    return await sendRequest(formData, "fetchData");
  };

  return { loading, addRequest, editRequest, deleteRequest, fetchRequest };
};

export default useFetchFromSheet;

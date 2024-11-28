import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from './Nav';
import Footer from '../User/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/style/gallery.css';
const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    axios
      .post(`http://localhost:8081/ngo/gallery/upload/${userId}`, formData)
      .then(() => {
        fetchImages();
        setSelectedFiles([]);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const fetchImages = () => {
    axios
      .get(`http://localhost:8081/ngo/gallery/${userId}`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const handleDelete = (imagename) => {
    axios
      .delete(`http://localhost:8081/ngo/gallery/${userId}/${imagename}`)
      .then(() => {
        fetchImages();
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <>
      <Nav />
      <div className="container" style={{ position: 'relative', top: '100px', marginBottom:"25vw"}}>
        <div className="text-center mb-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-control-file"
          />
          <button onClick={handleUpload} className="btn btn-primary mt-2 upload">
            Upload
          </button>
        </div>
        <div className="row">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.file} className="col-lg-4 col-md-6 mb-4">
                <div className="card gallery-card shadow-lg">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(image.file)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-12">No images available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;

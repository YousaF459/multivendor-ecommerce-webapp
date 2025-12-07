import VendorSidebar from "./VendorSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData';
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import Swal from "sweetalert2";


function UpdateProduct(){

   const userid = useUserData()
  const vendorid = VendorData()
  const navigate=useNavigate()
  const param=useParams()


  const [product, setProduct] = useState([]);
  const [specification, setSpecifications] = useState([{ title: "", content: "" }]);
  const [colors, setColors] = useState([{ name: "", color_code: "" }]);
  const [sizes, setSizes] = useState([{ name: "", price: "" }]);
  const [gallery, setGallery] = useState([{ image: "" }]);
  const [category, setCategory] = useState([]);
 


  const handleAddMore = (setStateFunction) => {
    setStateFunction((prevState) => [...prevState, {}]);
  };


  const handleRemove = (index, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };


  const handleInputChange = (index, field, value, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };

  const handleImageChange = (index, event, setStateFunction) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStateFunction((prevState) => {
          const newState = [...prevState];
          newState[index].image = { file, preview: reader.result };
          return newState;
        });
      };
      reader.readAsDataURL(file);
    } else {
      setStateFunction((prevState) => {
        const newState = [...prevState];
        newState[index].image = null;
        newState[index].preview = null;
        return newState;
      });
    }
  };

  const handleProductInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleProductFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          image: { file:event.target.files[0], preview: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };





  useEffect(() => {
    axiosAPI.get(`category/`).then((res) => {
      setCategory(res.data);
    });
  }, []);

   useEffect(() => {
    axiosAPI.get(`vendor-update-product/${vendorid}/${param.pid}/`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
      
      setSizes(res.data.size)
      setColors(res.data.color)
      setGallery(res.data.gallery)
      setSpecifications(res.data.specification)
    });
  }, [vendorid,param.pid]);


  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    // product
   {/*Object.entries(product).forEach(([key, value]) => {
      if (key === "image" && value) {
        formdata.append(key, value.file);
      }else {
        formdata.append(key, value);
      }
    });*/} 

    Object.entries(product).forEach(([key, value]) => {

  // 🟢 Skip image if no new file
  if (key === "image") {
    if (value && value.file instanceof File) {
      formdata.append("image", value.file);
    }
    return;
  }

  // 🟢 Skip vendor, pid, date (backend handles these)
  if (["vendor", "pid", "date", "views", "orders"].includes(key)) {
    return;
  }

  // 🟢 If category is an object → send only ID
  if (key === "category" && typeof value === "object" && value?.id) {
    formdata.append("category", value.id);
    return;
  }

  // 🟢 Skip empty strings & null values
  if (value === "" || value === null || value === undefined) {
    return;
  }

  // 🟢 Default case
  formdata.append(key, value);
});

    // specification
    specification.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        formdata.append(`specifications[${index}][${key}]`, value || "");
      });
    });

    // colors
    colors.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        formdata.append(`colors[${index}][${key}]`, value || "");
      });
    });

    // sizes
    sizes.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
      
          formdata.append(`sizes[${index}][${key}]`, value);
        
      });
    });

    // gallery
    gallery.forEach((item, index) => {
      if (item.image) {
        formdata.append(`gallery[${index}][image]`, item.image.file);
      }
    });


    try {
      const response = await axiosAPI.patch(`vendor-update-product/${vendorid}/${param.pid}/`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Swal.fire({
        icon:"success",
        title:"Product Updated Successfully"
      });
      navigate(`/vendor/products/`)
    } catch (error) {
      Swal.fire({
        icon:"warning",
        title:"Product Updation Failed"
      });
    }
  };
 



    return(
        <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left h-100">

      <VendorSidebar />

      <div className="col-md-9 col-lg-10 main mt-4">
        <div className="container">
          <form onSubmit={handleSubmit} className="main-body">
            <div className="tab-content" id="pills-tabContent">
<div class="alert alert-warning mt-3" role="alert">
  <h5 class="mb-1">Gallery Image Types Warning</h5>
  <p class="mb-0">
    Gallery image types may cause issues. If the product update does not work,
    please remove the images from the gallery and try again.
  </p>
</div>
              {/* PRODUCT DETAILS */}
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
                <div className="row gutters-sm shadow p-4 rounded">
                  <h4 className="mb-4">Product Details</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row text-dark">
                        <div className="col-lg-6 mb-2">
                          <label className="mb-2">Product Thumbnail</label>
                          <input type="file" className="form-control" onChange={handleProductFileChange} />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="mb-2">Title</label>
                          <input type="text" className="form-control" name="title"
                            value={product?.title || ""} onChange={handleProductInputChange} />
                        </div>

                        <div className="col-lg-12 mb-2">
                          <label className="mb-2">Description</label>
                          <textarea className="form-control" rows={5} name="description"
                            value={product?.description|| ""} onChange={handleProductInputChange}></textarea>
                        </div>

                        <div className="col-lg-12 mb-2">
                          <label className="mb-2">Category</label>
                          <select className="form-control" name="category"
                            value={product?.category || ""} onChange={handleProductInputChange}>
                            <option value="">- Select -</option>
                            {category.map((citem, i) => (
                              <option key={i} value={citem.id}>{citem.title}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label>Sale Price</label>
                          <input type="number" className="form-control" name="price"
                            value={product?.price || ""} onChange={handleProductInputChange} />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label>Regular Price</label>
                          <input type="number" className="form-control" name="old_price"
                            value={product?.old_price || ""} onChange={handleProductInputChange} />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label>Shipping Amount</label>
                          <input type="number" className="form-control" name="shipping_amount"
                            value={product?.shipping_amount || ""} onChange={handleProductInputChange} />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label>Stock Qty</label>
                          <input type="number" className="form-control" name="stock_qty"
                            value={product?.stock_qty || ""} onChange={handleProductInputChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GALLERY */}
              <div className="tab-pane fade" id="pills-gallery" role="tabpanel">
                <div className="row gutters-sm shadow p-4 rounded">
                  <h4 className="mb-4">Product Image</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      {gallery.map((iitem, iindex) => (


                        <div className="row text-dark mb-3" key={iindex}>
                          <div className="col-lg-6">

                            {iitem.image && (iitem.image.preview ? (
                                <img src={iitem?.image?.preview} className="w-100 rounded"
                                style={{ height: "200px", objectFit: "cover" }} alt="" />
                            ):(
                                <img src={iitem?.image} className="w-100 rounded"
                                style={{ height: "200px", objectFit: "cover" }} alt="" />

                            )) }



                            {!iitem.image && (
                              <div className="d-flex flex-column justify-content-center align-items-center bg-light"
                                style={{ width: "100%", height: "200px", borderRadius: "10px", border: "2px dashed #bbb" }}>
                                <i className="fas fa-image text-secondary fs-1 mb-2"></i>
                                <span>No Image</span>
                              </div>
                            )}


                          </div>

                          <div className="col-lg-3">
                            <label>Product Image</label>
                            <input type="file" className="form-control"
                              onChange={(e) => handleImageChange(iindex, e, setGallery)} />
                          </div>

                          <div className="col-lg-3">
                            <button type="button" className="btn btn-danger mt-4"
                              onClick={() => handleRemove(iindex, setGallery)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      <button type="button" className="btn btn-primary mt-4"
                        onClick={() => handleAddMore(setGallery)}>
                        <i className="fas fa-plus"></i> Add Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SPECIFICATIONS */}
              <div className="tab-pane fade" id="pills-spec" role="tabpanel">
                <div className="row gutters-sm shadow p-4 rounded">
                  <h4 className="mb-4">Specifications</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      {specification.map((sitem, sindex) => (
                        <div className="row text-dark mb-3" key={sindex}>
                          <div className="col-lg-5">
                            <label>Title</label>
                            <input type="text" className="form-control"
                              value={sitem?.title}
                              onChange={(e) => handleInputChange(sindex, "title", e.target.value, setSpecifications)} />
                          </div>

                          <div className="col-lg-5">
                            <label>Content</label>
                            <input type="text" className="form-control"
                              value={sitem?.content}
                              onChange={(e) => handleInputChange(sindex, "content", e.target.value, setSpecifications)} />
                          </div>

                          <div className="col-lg-2">
                            <button type="button" className="btn btn-danger mt-4"
                              onClick={() => handleRemove(sindex, setSpecifications)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      <button type="button" className="btn btn-primary mt-4"
                        onClick={() => handleAddMore(setSpecifications)}>
                        <i className="fas fa-plus"></i> Add Specification
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIZE */}
              <div className="tab-pane fade" id="pills-size" role="tabpanel">
                <div className="row gutters-sm shadow p-4 rounded">
                  <h4 className="mb-4">Size</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      {sizes.map((szitem, szindex) => (
                        <div className="row text-dark mb-3" key={szindex}>
                          <div className="col-lg-5">
                            <label>Size</label>
                            <input type="text" className="form-control"
                              placeholder="XXL"
                              value={szitem?.name}
                              onChange={(e) => handleInputChange(szindex, "name", e.target.value, setSizes)} />
                          </div>

                          <div className="col-lg-5">
                            <label>Price</label>
                            <input type="number" className="form-control"
                              placeholder="$20"
                              value={szitem?.price}
                              onChange={(e) => handleInputChange(szindex, "price", e.target.value, setSizes)} />
                          </div>

                          <div className="col-lg-2">
                            <button type="button" className="btn btn-danger mt-4"
                              onClick={() => handleRemove(szindex, setSizes)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      <button type="button" className="btn btn-primary mt-4"
                        onClick={() => handleAddMore(setSizes)}>
                        <i className="fas fa-plus"></i> Add Size
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLORS */}
              <div className="tab-pane fade" id="pills-color" role="tabpanel">
                <div className="row gutters-sm shadow p-4 rounded">
                  <h4 className="mb-4">Color</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      {colors.map((citem, cindex) => (
                        <div className="row text-dark mb-3" key={cindex}>
                          <div className="col-lg-4">
                            <label>Name</label>
                            <input type="text" className="form-control"
                              placeholder="Green"
                              value={citem?.name}
                              onChange={(e) => handleInputChange(cindex, "name", e.target.value, setColors)} />
                          </div>

                          <div className="col-lg-4">
                            <label>Code</label>
                            <input type="text" className="form-control"
                              placeholder="#f4f7f6"
                              value={citem?.color_code}
                              onChange={(e) => handleInputChange(cindex, "color_code", e.target.value, setColors)} />
                          </div>

                          <div className="col-lg-4">
                            <button type="button" className="btn btn-danger mt-4"
                              onClick={() => handleRemove(cindex, setColors)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      <button type="button" className="btn btn-primary mt-4"
                        onClick={() => handleAddMore(setColors)}>
                        <i className="fas fa-plus"></i> Add Color
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* TAB BUTTONS */}
            <ul className="nav nav-pills d-flex justify-content-center mt-5" id="pills-tab">
              <li className="nav-item">
                <button type="button" className="nav-link active" data-bs-toggle="pill" data-bs-target="#pills-home">Details</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-gallery">Gallery</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-spec">Specification</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-size">Size</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-color">Color</button>
              </li>
            </ul>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="btn btn-success mt-4 w-100">Update Product</button>

          </form>
        </div>
      </div>

    </div>
  </div>
    )

}

export default UpdateProduct
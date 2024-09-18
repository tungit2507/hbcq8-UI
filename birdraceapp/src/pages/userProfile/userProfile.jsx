import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
  // Initialize useForm
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [imagePreview, setImagePreview] = useState('/assets/img/no-person-placeholder.webp'); // Default image
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image

  // Submit handler
  const onSubmit = async (data) => {
    const { email, ...rest } = data;

    // Create FormData object
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('phone', data.phone);
    formData.append('birthday', data.birthday);
    formData.append('address', data.address);

    // Append image if selected
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    console.log(data);
    toast.success("Handle form thành công");
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  // Fetch user data when the component mounts
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setValue('email', user.email);
        setValue('phone', user.phone);
        setValue('birthday', formatDate(user.birthday));
        setValue('address', user.address);
        setValue('id', user.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setValue]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file
      setSelectedImage(file);

      // Update preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-xl px-4 mt-4 py-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header text-center">Ảnh Đại Diện</div>
            <div className="card-body text-center">
              <label htmlFor="user-image">
                <img 
                  className="img-account-profile rounded-circle mb-2" 
                  src={imagePreview} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </label>
              <div className="small font-italic text-muted mb-4">{errors.image && <p className="text-danger">{errors.image.message}</p>}</div>
            
              <label className="btn btn-primary" htmlFor="user-image">Upload new image</label>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Thông Tin Chi Tiết</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                id="user-image"
                onChange={handleImageChange}
                {...register('image', { required: 'Vui Lòng Chọn Hình Ảnh' })}
              />
                <div className="row gx-3 mb-3">
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                    <input 
                      className="form-control" 
                      id="inputEmailAddress" 
                      type="email" 
                      placeholder="" 
                      readOnly 
                      {...register('email')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputPhonenumber">Số Điện Thoại</label>
                    <input 
                      className="form-control" 
                      id="inputPhonenumber" 
                      type="text" 
                      placeholder="Enter your phone number" 
                      {...register('phone', { 
                        required: 'Vui Lòng Nhập Số điện thoại', 
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Số điện thoại phải đủ 10 số'
                        }
                      })}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">Ngày Sinh</label>
                    <input 
                      className="form-control" 
                      id="inputBirthday" 
                      type="date" 
                      name="birthday" 
                      {...register('birthday', { required: 'Ngày sinh là bắt buộc' })}
                    />
                    {errors.birthday && <p className="text-danger">{errors.birthday.message}</p>}
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">Địa Chỉ</label>
                    <input 
                      className="form-control" 
                      id="inputLocation" 
                      type="text" 
                      placeholder="Enter your location" 
                      {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
         position='top-center'
      />
    </div>
  );
};

export default Profile;

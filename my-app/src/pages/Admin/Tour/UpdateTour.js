import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

function UpdateTour() {
    const [selectedImages, setSelectedImages] = useState([]);
    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };
    console.log(selectedImages);
    const handleRemoveImage = (index) => {
        // Xóa ảnh theo chỉ số
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className=' border rounded'>
           <div className='p-2'>
           <h3>Thêm ảnh</h3>
            <label>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                    Thêm ảnh
                </Button>
            </label>
            {/* Hiển thị danh sách ảnh đã chọn */}
            <div className="d-flex">
                {selectedImages.map((image, index) => (
                    <div key={index} className="position-relative">
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        {/* Hình ảnh */}
                        <img
                            src={require(`../../../assets/images/Tour/${image.name}`)}
                            alt={`selected-${index}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                ))}
            </div>
           </div>
        </div>
    );
}

export default UpdateTour;

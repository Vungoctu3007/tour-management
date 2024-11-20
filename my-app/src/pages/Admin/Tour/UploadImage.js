import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';


function UploadImage({onImagesSelected}) {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages((prevImages) =>{
            const newImage=   [...prevImages, ...files]
            onImagesSelected(newImage.map((image)=> image.name));
            return newImage;
        });
    };
    const handleRemoveImage = (index) => {
        setSelectedImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            onImagesSelected(updated.map((img) => img.name));
            return updated;
        });
    };
  
    return (
        <div className="">
            <label>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                    upload file
                </Button>
            </label>
            {/* Hiển thị danh sách ảnh đã chọn */}
            <div className="d-flex border rounded"style={{ height: '150px', overflowX: 'auto', marginTop: '10px' }}>
                {selectedImages.map((image, index) => (
                    <div key={index} className="position-relative ms-2 mt-3">
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
                            // src={require(`../../../assets/images/Tour/${image.name}`)}
                            src={URL.createObjectURL(image)}
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
    );
}

export default UploadImage;

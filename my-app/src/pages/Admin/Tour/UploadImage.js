import React, { useState,memo,useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

function UploadImage({ onImagesSelected ,reset,initialImages}) {
    const [selectedImages, setSelectedImages] = useState(initialImages?.length ? initialImages :[]);
   
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files).map((file) => ({
            file, // Lưu `File` trực tiếp
            textImage: file.name,
            isPrimary: 0, // Gán mặc định isPrimary là 0
        }));
      
        setSelectedImages((prevImages) => {
            const newImages = [...prevImages, ...files];
            newImages[0].isPrimary = 1; // Đảm bảo ảnh đầu tiên có isPrimary = 1
            onImagesSelected(newImages.map((image) => ({
                textImage: image.textImage,
                isPrimary: image.isPrimary,
            })));
            return newImages;
        });
    };
   
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            setSelectedImages(initialImages);
        }
    }, [initialImages]);
    useEffect(() => {
        if (reset) {
           setSelectedImages([]);
        }
        
    }, [reset]);
    const handleRemoveImage = (index) => {
        setSelectedImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            if (updated.length > 0) {
                updated[0].isPrimary = 1; // Gán lại ảnh đầu tiên còn lại là isPrimary
            }
            onImagesSelected(updated.map((img) => ({
                textImage: img.textImage,
                isPrimary: img.isPrimary,
            })));
            return updated;
        });
    };
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            setSelectedImages(initialImages);
        }
    }, [selectedImages]);
    
    
    return (
        <div>
            <label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                    Upload file
                </Button>
            </label>
            {/* Hiển thị danh sách ảnh đã chọn */}
            <div className="d-flex border rounded" style={{ height: '150px', overflowX: 'auto', marginTop: '10px' }}>
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
                      
                            src={require(`../../../assets/images/Tour/${image.textImage}`)}
                            alt={`selected-${index}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                border: image.isPrimary ? '2px solid blue' : 'none', // Viền xanh nếu là ảnh chính
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(UploadImage);

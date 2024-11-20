import React, { useState, useEffect,useCallback  } from 'react';
import Select from 'react-select';
import UploadImage from './UploadImage';
import Leg from './Leg';
import { getAllRouteRoad } from '../../../services/routeService';
function AddTour() {
    const [roads, setRoads] = useState([]);
    const [tour, setTour] = useState({
        detailRouteName: '',
        price: '',
        routeId: '',
        stock: '',
        timeToDeparture: '',
        timeToFinish: '',
        description: '',
        images: [],
        legs: [],
    });
    const handleChangeTour = (e) => {
        const { id, value } = e.target;
        setTour((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleImagesSelected = useCallback((selected) => {
        setTour((prev) => ({
            ...prev,
            images: selected,
        }));
    },[])
    const handleLegSelected =useCallback( (selected) => {
        setTour((prev) => ({
            ...prev,
            legs: selected,
        }));
    },[])
   

    const fetRoads = async () => {
        try {
            const data = await getAllRouteRoad();
            setRoads(data.result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() =>fetRoads(),[]);
    // route
    const routeOptions = roads.map((item) => ({
        value: item.routeId,
        label: `${item.routeId} - ${item.departureName} - ${item.arrivalName}`,
    }));

    const handleRouteChange = (selectedOption) => {
        setTour((prev) => ({
            ...prev,
            routeId: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleAddTour = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('API_ENDPOINT', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tour),
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            alert('Tour added successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-2 " style={{ marginBottom: '100px' }}>
            <div>
                <h5 className="">Thêm Tour</h5>
            </div>
            <div className="">
                <span className="text-info d-flex  fs-5">Thông tin cơ bản</span>
                <div className="p-2 border rounded mt-2">
                    <div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="detailRouteName" className="form-label">
                                    Tên tour:
                                </label>
                                <input
                                    type="text"
                                    id="detailRouteName"
                                    className="form-control"
                                    value={tour.detailRouteName}
                                    onChange={handleChangeTour}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="price" className="form-label">
                                    Giá:
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    className="form-control"
                                    value={tour.price}
                                    onChange={handleChangeTour}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="routeId" className="form-label">
                                    Tuyến đường:
                                </label>
                                <Select
                                    id="routeId"
                                    className="form-select"
                                    value={routeOptions.find((option) => option.value === tour.routeId)}
                                    onChange={handleRouteChange}
                                    options={routeOptions}
                                    isClearable
                                    isSearchable
                                    placeholder=""
                                />
                            </div>

                            <div className="col-6">
                                <label htmlFor="stock" className="form-label">
                                    Số lượng:
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    className="form-control"
                                    value={tour.stock}
                                    onChange={handleChangeTour}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="timeToDeparture" className="form-label">
                                    Thời gian bắt đầu:
                                </label>
                                <input
                                    type="date"
                                    id="timeToDeparture"
                                    className="form-control"
                                    value={tour.timeToDeparture}
                                    onChange={handleChangeTour}
                                    required
                                />
                            </div>

                            <div className="col-6">
                                <label htmlFor="timeToFinish" className="form-label">
                                    Thời gian kết thúc:
                                </label>
                                <input
                                    type="date"
                                    id="timeToFinish"
                                    className="form-control"
                                    value={tour.timeToFinish}
                                    onChange={handleChangeTour}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Mô tả:
                            </label>
                            <textarea
                                id="description"
                                className="form-control"
                                value={tour.description}
                                onChange={handleChangeTour}
                            ></textarea>
                        </div>

                        <div className="row mb-3 ">
                            <label htmlFor="description" className="form-label">
                                Thêm ảnh:
                            </label>
                            <UploadImage onImagesSelected={handleImagesSelected} />
                        </div>
                    </div>
                </div>
            </div>
            <Leg onLegSelected={handleLegSelected} />
            <div className="mt-2 d-flex justify-content-center">
                <button type="submit" onClick={handleAddTour} className="btn btn-primary">
                    Add Tour
                </button>
            </div>
        </div>
    );
}

export default AddTour;

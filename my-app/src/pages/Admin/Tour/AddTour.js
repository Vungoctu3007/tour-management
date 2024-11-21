import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import UploadImage from './UploadImage';
import Leg from './Leg';
import { getAllRouteRoad } from '../../../services/routeService';
import { addTour } from '../../../services/routeService';
import { useNotification } from '../../../components/NotificationProvider';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function AddTour() {
    const notify = useNotification();
    const [roads, setRoads] = useState([]);
    const [errors, setErrors] = useState({});
    const [resetFields, setResetFields] = useState(false);

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
    }, []);
    const handleLegSelected = useCallback((selected) => {
        setTour((prev) => ({
            ...prev,
            legs: selected,
        }));
    }, []);

   
    useEffect(() => {
        const fetRoads = async () => {
            try {
                const data = await getAllRouteRoad();
                setRoads(data.result);
            } catch (error) {
                console.log(error);
            }
        };
        fetRoads();
    },[]);
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
    const validate = () => {
        const newErrors = {};
        if (!tour.detailRouteName) newErrors.detailRouteName = 'Tên tour không được để trống';
        if (!tour.price || tour.price <= 0) newErrors.price = 'Giá phải lớn hơn 0';
        if (!tour.routeId) newErrors.routeId = 'Tuyến đường không được để trống';
        if (!tour.stock || tour.stock <= 0) newErrors.stock = 'Số lượng phải lớn hơn 0';
        if (!tour.timeToDeparture) newErrors.timeToDeparture = 'Thời gian bắt đầu không được để trống';
        if (!tour.timeToFinish) newErrors.timeToFinish = 'Thời gian kết thúc không được để trống';
        if (tour.timeToDeparture && tour.timeToFinish && tour.timeToFinish <= tour.timeToDeparture) {
            newErrors.timeToFinish = 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu';
        }
        if (!tour.description) newErrors.description = 'Mô tả không được để trống';
        if (!tour.images.length) newErrors.images = 'Vui lòng thêm ít nhất một ảnh';
        if (!tour.legs.length) {
            newErrors.legs = 'Vui lòng thêm lịch trình.';
        } else {
            const invalidLegs = tour.legs.filter((leg) => !leg.title.trim() || !leg.description.trim());
            if (invalidLegs.length > 0) {
                newErrors.legs = 'Mỗi lịch trình phải có tiêu đề và mô tả.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTour = async (e) => {
        e.preventDefault();
        if (!validate()) {
            notify('Vui lòng kiểm tra lại thông tin!', 'error');
            return;
        }
        try {
            const data = await addTour(tour);
            notify(data);
            setTour({
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
            setErrors({});
            setResetFields(true);
            setTimeout(() => {
                setResetFields(false);
            }, 100);
        } catch (error) {
            console.error('Error adding tour:', error);
            notify('Failed to add tour: ' + (error.message || 'Unknown error'), 'error');
        }
    };

    return (
        <div className="p-2 " style={{ marginBottom: '100px' }}>
            <div>
                <h5>
                    <Link to="/admin/tour/list-tour">
                        {' '}
                        <ArrowBackIcon /> Danh sách tour
                    </Link>
                </h5>
                <h5 className="mt-4">Thêm Tour</h5>
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
                                {errors.detailRouteName && (
                                    <small className="text-danger">{errors.detailRouteName}</small>
                                )}
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
                                {errors.price && <small className="text-danger">{errors.price}</small>}
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
                                {errors.routeId && <small className="text-danger">{errors.routeId}</small>}
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
                                {errors.stock && <small className="text-danger">{errors.stock}</small>}
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
                                {errors.timeToDeparture && (
                                    <small className="text-danger">{errors.timeToDeparture}</small>
                                )}
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
                                {errors.timeToFinish && <small className="text-danger">{errors.timeToFinish}</small>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Mô tả:
                            </label>
                            <textarea
                            style={{height:"300px"}}
                                id="description"
                                className="form-control"
                                value={tour.description}
                                onChange={handleChangeTour}
                            ></textarea>
                            {errors.description && <small className="text-danger">{errors.description}</small>}
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="description" className="form-label">
                                Thêm ảnh:
                            </label>
                            <UploadImage onImagesSelected={handleImagesSelected} reset={resetFields} />
                            {errors.images && <small className="text-danger">{errors.images}</small>}
                        </div>
                    </div>
                </div>
            </div>
            <Leg onLegSelected={handleLegSelected} reset={resetFields} />
            {errors.legs && <small className="text-danger">{errors.legs}</small>}

            <div className="mt-2 d-flex justify-content-center">
                <button type="submit" onClick={handleAddTour} className="btn btn-primary">
                    Add Tour
                </button>
            </div>
        </div>
    );
}

export default AddTour;

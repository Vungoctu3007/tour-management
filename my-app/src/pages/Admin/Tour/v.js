function Leg({ onLegSelected, initialLegs = [] }) {
    const [legs, setLegs] = useState(initialLegs.length > 0 ? initialLegs : [{ title: '', description: '', sequence: 1 }]);

    const handleAddLeg = () => setLegs([...legs, { title: '', description: '', sequence: legs.length + 1 }]);

    const handleRemoveLegs = (index) => {
        const updatedLegs = legs.filter((_, i) => i !== index);
        const reIndexedLegs = updatedLegs.map((leg, i) => ({ ...leg, sequence: i + 1 }));
        setLegs(reIndexedLegs);
    };

    const handleChangeLeg = (index) => (e) => {
        const { name, value } = e.target;
        const updatedLegs = legs.map((leg, i) => (i === index ? { ...leg, [name]: value } : leg));
        setLegs(updatedLegs);
    };

    useEffect(() => onLegSelected(legs), [legs, onLegSelected]);

    return (
        <div className="mt-2">
            <span className="text-info d-flex fs-5">Thông tin chi tiết lịch trình</span>
            <div className="p-2 border rounded mt-2">
                {legs.map((leg, index) => (
                    <div className="row mb-3" key={index}>
                        <div className="col-5">
                            <label htmlFor={`title${index}`} className="form-label">Tên lịch trình:</label>
                            <input
                                className="d-none"
                                value={leg.sequence}
                                name="sequence"
                                onChange={handleChangeLeg(index)}
                            />
                            <input
                                value={leg.title}
                                type="text"
                                id={`title${index}`}
                                className="form-control"
                                required
                                onChange={handleChangeLeg(index)}
                                name="title"
                            />
                        </div>
                        <div className="col-5">
                            <label htmlFor={`description${index}`} className="form-label">Mô tả lịch trình:</label>
                            <textarea
                                value={leg.description}
                                id={`description${index}`}
                                className="form-control"
                                onChange={handleChangeLeg(index)}
                                name="description"
                            ></textarea>
                        </div>
                        <div className="col-2 d-flex align-items-end">
                            {index === legs.length - 1 && (
                                <button
                                    type="button"
                                    className="btn btn-success form-control"
                                    style={{ width: '50px' }}
                                    onClick={handleAddLeg}
                                >
                                    +
                                </button>
                            )}
                            {index !== legs.length - 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger form-control ms-2"
                                    style={{ width: '50px' }}
                                    onClick={() => handleRemoveLegs(index)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Leg);

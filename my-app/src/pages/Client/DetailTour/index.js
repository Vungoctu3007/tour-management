import { useParams } from 'react-router-dom';
function DetailTour() {
    const { id } = useParams(); 
    return ( 
        <h1>detail tour {id}</h1>
     );
}

export default DetailTour;
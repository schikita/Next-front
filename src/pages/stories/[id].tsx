import {NextPage} from 'next';
import { useRouter } from 'next/router';

const CarPage: NextPage = () => {

    const {asPath, pathname} = useRouter()

    return <div>Car page</div>
}

export default CarPage;
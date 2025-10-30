import { useRoutes } from "react-router-dom";
import { routers } from "../../routers";

function AllRouter(){
    const element = useRoutes(routers);
    return element;
}

export default AllRouter;
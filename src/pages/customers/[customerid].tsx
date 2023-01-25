import { NextPage } from "next";
import { useRouter } from "next/router";

const Customer: NextPage = () => {

    const router = useRouter();
    //console.log(router)

    //{ parameter_path } from router.query
    const { customerid } = router.query;
    

    return <h2>Customer ID: {customerid}</h2>
}

export default Customer;
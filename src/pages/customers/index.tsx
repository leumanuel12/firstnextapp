import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';


export type Customer = {
    id: number,
    name: string,
    industry: string
}


export const getStaticProps: GetStaticProps = async () => {

    //const result = await axios.get('https://63d12a66120b32bbe8f2a3b9.mockapi.io/customers');
    const result = await axios.get('http://localhost:8000/api/customers/');
    console.log(result.data)
    
    return {
        props: {
           customers: result.data.customer,
        },
        revalidate: 60,
    }
}

const Customers: NextPage = ({customers}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router = useRouter();
    //console.log(router)

    return (
        <div className="m-3">
                <h2 className="mb-5">All Customers</h2>

                {customers.map( (customer: Customer) => {
                    return (
                        <div
                            className="max-w-2xl grid grid-cols-3 p-3 border-b border-gray-200 max-sm:block max-sm:mb-3"
                            key={customer.id}>
                            <span className="col-span-1 flex mx-auto">{customer.id}</span>
                            <span className="col-span-1 flex mx-auto">{customer.name}</span>
                            <span className="col-span-1 flex mx-auto">{customer.industry}</span>
                        </div>
                    )
                } )}
        </div>
    );
}

export default Customers;
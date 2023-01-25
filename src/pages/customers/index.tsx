import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

// (5) declare the type of customers:
type Customer = {
    id: number,
    name: string,
    industry: string
}

//mock data only:
export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            customers: [
                {
                    id: 1,
                    name: "Elon Musk",
                    industry: "Electromotive"
                },
                {
                    id: 2,
                    name: "Mark Zuckerberg",
                    industry: "Social Networking"
                }
            ] as Customer[], // (4) set the type with "as"
        }
    }
}

// (1) For the data to be displayed, add it below as a prop. example: "NextPage = (props) => {"
// (2) Or, destructing way: "NextPage = ({customers}) => {"
// (3) Now if we do destructuring, we will need to define the customers type (since typescript)
/*
   (6) After declaring the type, we will need to import "import { InferGetStaticPropsType } from next",
       which will set the "type" of the props we will send below.
*/
const Customers: NextPage = ({customers}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router = useRouter();
    //console.log(router)

    return (
        <div className="m-3">
                <h2 className="mb-5">All Customers</h2>

                {/* (7) Now we can finally use it here without having the prefix "props" (props.customers)... 
                 ---- and optional chaining or checking if it has data is no more needed...
                 ---- since data is already guaranteed from our database query (async query) function getStaticProps */}

                {customers.map( (customer: Customer) => {
                    //console.log(customer.id, customer.name, customer.industry)
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
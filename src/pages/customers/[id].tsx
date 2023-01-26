import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import type { Customer } from "./index";

// (2) here we declare the type of "Props" equal to the type of "Customer"
type Props = {
    customer: Customer,
}

// (a7) declare as interface... and need to import ParsedUrlQuery from 'querystring'
interface Params extends ParsedUrlQuery{
    id: string, //type string
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    const result = await axios.get('http://localhost:8000/api/customers');
    const paths = result.data.customer.map( (customer: Customer) => {

        //console.log(customer.id)
        return { params : { id: customer.id.toString() } }
    } );


    return {
        paths: paths,
        fallback: false,
        //fallback is required in GetStaticPaths. fallback=false means that if the params=id is not in the paths array, the page will throw 404 page.
    }
  }

// (a6) here we will include the Props type and the ability to type Params...
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

    // (a1) optional chaining for possible undefined value: "const params = context?.params?.id;" call thru ${params}
    // (a2) else, we can use a non-null assertion operator to tell that the value is not null or undefined
    const params = context.params!;

    // (a3) we can define the data we expect we get from axios.
    // (a4) here we expect an object from "customer" with the type Props(Customer)
    // (a5) to know if ".id" is a valid value in params, we have an option to pass an additional type information in GetStaticProps...
    const result = await axios.get<{customer: Customer}>(`http://localhost:8000/api/customers/${params.id}`);
    console.log(result)

    return {
        props: {
            customer: result.data.customer,
        }
    }
}

// (1) simple way of using props. we also need to declare the type so we can have the set of property names when using the props.
const Customer: NextPage<Props> = (props) => {

    return <h2>Customer ID: {props.customer.id + ' ' + props.customer.name + ' ' + props.customer.industry}</h2>
}

export default Customer;
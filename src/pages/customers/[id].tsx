import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import type { Customer } from "./index";

// (2) here we declare the type of "Props" equal to the type of "Customer"
type Props = {
    customer: Customer,
}

export const getStaticPaths: GetStaticPaths = () => {
    //mock data
    return {
        paths: [
            {
                params: { id: '1' } //id should be a string, else will throw an error
            }
        ],
        fallback: false,
        //fallback is required in GetStaticPaths. fallback=false means that if the params=id is not in the paths array, the page will throw 404 page.
    }
  }

export const getStaticProps: GetStaticProps = () => {

    return {
        props: {
            customer: {
                id: 1,
                name: "test",
                industry: "test"
            },
        }
    }
}

// (1) simple way of using props. we also need to declare the type so we can have the set of property names when using the props.
const Customer: NextPage<Props> = (props) => {

    return <h2>Customer ID: {props.customer.id + ' ' + props.customer.name + ' ' + props.customer.industry}</h2>
}

export default Customer;
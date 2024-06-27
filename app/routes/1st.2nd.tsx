import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css";
import { Outlet } from "@remix-run/react";


export const loader = async ({ request }) => {
    console.log("＞＞＞ 2nd.loader");

    return json({
        request: request,
    });
};

export default function SecondApp() {
    const { request } = useLoaderData();

    return (
        <div className="2nd__container">
            <p>2nd__container</p>
            {/* <Outlet /> */}
        </div>
    );
}

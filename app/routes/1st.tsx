import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css";
import { Outlet } from "@remix-run/react";


export const loader = async ({ request }) => {
    console.log(">>> 1st.loader", request);

    return json({
        request: request,
    });
};

export default function App() {
    const { request } = useLoaderData();

    return (
        <div className="1st__container">
            <p>1st__container</p>
            <Outlet />
        </div>
    );
}

import { useLoaderData } from "react-router-dom";
import SiteCard from "./SiteCard.js";



export default function SitePage() {
    const {sites} = useLoaderData()
    return (
        sites.map((s) => <SiteCard site={s}/>)
    )

}
import { OgneApiClient } from "app/services/ogne-api/ogne-api-client";
import { OgneCoordinateListParameters } from "app/services/ogne-api/parameters/ogne-coordinate-list-parameters";
import { OgneCoordinateList } from "app/services/ogne-api/response/ogne-coordinate-list";
import { useEffect, useState } from 'react';


type CoordinateCardArgs = {
    slug: string;
    title: string;
    imageUrl: string;
    alternateText: string;
}


function CoordinateCard(data: CoordinateCardArgs) {
    return (
        <div className="">
            <div>
                <a href={`coordinate/?coordinate_slug=${data.slug}`} onClick={eval("")}>
                    <img src={data.imageUrl} alt={data.alternateText} />
                </a>
            </div>
            <div>
                <h3>{data.title}</h3>
            </div>
        </div>
    )
}

export default CoordinateCard;

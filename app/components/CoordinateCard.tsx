import { OgneApiClient } from "app/services/ogne-api/ogne-api-client";
import { OgneCoordinateListParameters } from "app/services/ogne-api/parameters/ogne-coordinate-list-parameters";
import { OgneCoordinateList } from "app/services/ogne-api/response/ogne-coordinate-list";
import { useEffect, useState } from 'react';
import { React } from 'react';


type CoordinateCardArgs = {
    slug: string;
    title: string;
    imageUrl: string;
    alternateText: string;
}


function CoordinateCard(data: CoordinateCardArgs) {
    const onClickImageLink = (event: React.HTMLAnchorElement) => {
        console.log("event", event);
        event.preventDefault();

        if (!(event.target.href)) {
            return;
        }

        history.pushState(null, '', event.target.href);
    }

    return (
        <div className="">
            <div>
                <a href={`coordinate/?coordinate_slug=${data.slug}`}
                    className="js-dh-ogne-content-loader__update-content-on-click"
                >
                    <img src={data.imageUrl} alt={data.alternateText}
                        className="w-full h-full aspect-auto"
                    />
                </a>
            </div>
            <div>
                <h3>{data.title}</h3>
            </div>
        </div>
    )
}

export default CoordinateCard;

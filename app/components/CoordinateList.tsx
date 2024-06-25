import { OgneApiClient } from "app/services/ogne-api/ogne-api-client";
import { OgneCoordinateListParameters } from "app/services/ogne-api/parameters/ogne-coordinate-list-parameters";
import { OgneCoordinateList } from "app/services/ogne-api/response/ogne-coordinate-list";
import { useEffect, useState } from 'react';
import CoordinateCard from "./CoordinateCard";


type CoordinateListArgs = {
    coordinateList: OgneCoordinateList;
}


function CoordinateList(data: CoordinateListArgs) {
    const coordinateElements = data.coordinateList.elements;

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="coordinate-list__element">
                {coordinateElements.map((element) => (
                    <CoordinateCard
                        key={element.id}
                        slug={element.slug}
                        title={element.title}
                        imageUrl={element.mainCoordinateImage.mainSizeUrl}
                        alternateText={element.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoordinateList;

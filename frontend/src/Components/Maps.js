import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet';
import '../Styles/mapsstyle.css'
import NavBar from "./Navbar";


const MapsComponent = () => {

    return(
        <>
        <NavBar />
            <section className="map-section">
            <h1 className="map-title">Maps</h1>
                <div className="map-wrapper">
                    <MapContainer center={[51.505, -0.09]} zoom={13} className="custom-map">
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    </MapContainer>
                </div>
            </section>
        </>


      );
}

export default MapsComponent;
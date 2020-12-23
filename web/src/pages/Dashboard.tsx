import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiTrash, FiEdit3 } from "react-icons/fi";

import AuthContext from "../contexts/auth";
import DashboardSideBar from ".././components/DashboardSidebar";
import api from "../services/api";

import "../styles/pages/dashboard.css";
import mapIcon from "../utils/mapIcon";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const { signed } = useContext(AuthContext);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return signed ? (
    <div id="dashboard-page">
      <DashboardSideBar />
      <main className="panel">
        <header id="title">
          <h1>Orfanatos cadastrados</h1>
          <span>2 orfanatos</span>
        </header>
        <div className="orphanages-list">
          {orphanages.map((orphanage) => {
            return (
              <div className="map-container" key={orphanage.id}>
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: "100%", height: 227 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                  />
                </Map>

                <footer>
                  <span>{orphanage.name}</span>
                  <div id="options">
                    <Link to="/" id="edit-button">
                      <FiEdit3 size={24} color="#15C3D6" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/dashboard/deleting-check/${orphanage.id}`,
                        search: `?name=${orphanage.name}`,
                      }}
                      id="delete-button"
                    >
                      <FiTrash size={24} color="#15C3D6" />
                    </Link>
                  </div>
                </footer>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Dashboard;

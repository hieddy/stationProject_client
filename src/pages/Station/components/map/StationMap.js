import React, { useEffect } from "react";

const StationMap = () => {
  const { kakao } = window;
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2886, 127.0519),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.2886, 127.0519);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export { StationMap };

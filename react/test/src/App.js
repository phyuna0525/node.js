import React, { useEffect, useState } from "react";

const { kakao } = window;

function App() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);

    function setCenter() {
      const moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
      newMap.setCenter(moveLatLon);
      displayLevel();
    }

    function panTo() {
      const moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);
      newMap.panTo(moveLatLon);
      displayLevel();
    }

    function zoomIn() {
      const level = newMap.getLevel();
      newMap.setLevel(level - 1);
      displayLevel();
    }

    function zoomOut() {
      const level = newMap.getLevel();
      newMap.setLevel(level + 1);
      displayLevel();
    }

    function displayLevel() {
      const levelEl = document.getElementById("maplevel");
      levelEl.innerHTML =
        "현재 지도 레벨은 " + newMap.getLevel() + " 레벨 입니다.";
    }

    // 함수들을 외부로 노출
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;

    setMarker(new kakao.maps.Marker({ map: newMap }));

    panTo();
    setCenter();
    displayLevel();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // map이 변경될 때마다 마커의 클릭 이벤트를 설정
    if (map && marker) {
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);

        const message =
          "클릭한 위치의 위도는 " +
          latlng.getLat() +
          " 이고, " +
          "경도는 " +
          latlng.getLng() +
          " 입니다";

        const resultDiv = document.getElementById("clickLatlng");
        resultDiv.innerHTML = message;
      });
    }
  }, [map, marker]);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "500px",
          height: "350px",
          position: "relative",
        }}
      ></div>
      <div>
        <button onClick={() => window.zoomIn()}>지도 레벨 - 1</button>
        <button onClick={() => window.zoomOut()}>지도 레벨 + 1</button>
        <span id="maplevel"></span>
      </div>
      <div id="clickLatlng"></div>
    </div>
  );
}

export default App;

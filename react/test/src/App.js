import React, { useEffect } from "react";
const { kakao } = window;

function App() {
  useEffect(() => {
    // 스크립트 로드 이후에 kakao.maps.services 확인
    if (!kakao.maps.services) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 1,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    // infowindow를 const로 선언
    const iwContent =
      '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
    const iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);

    marker.setMap(map);

    function setCenter() {
      var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
      map.setCenter(moveLatLon);
    }

    function panTo() {
      var moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);
      map.panTo(moveLatLon);
    }

    // 함수 호출 위치 조정
    setCenter();
    panTo();

    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      }
    );
  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  return (
    <div className="App">
      <div
        id="map"
        style={{
          padding: "0",
          margin: "0",
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
}

export default App;

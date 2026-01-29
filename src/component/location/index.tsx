import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 2호선·7호선 <b>건대입구역</b> 하차
            <br />
            → <b>건대입구역 자이엘라</b> 방향으로 이동 (도보권)
            <br />
            → <b>자이엘라 6층</b> 까사그랑데
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - 간선/지선/광역 등 이용
            <br />
            <b>건대입구역</b> 또는 <b>건대입구역사거리</b> 정류장 하차
            <br />
            → 도보로 <b>건대입구역 자이엘라</b> 이동
            <br />→ <b>6층</b> 까사그랑데
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>까사그랑데</b> 검색
            <br />
            - 주차장 이용 시 웨딩홀과 바로 연결
            <br />
            - 주차 요금은 웨딩홀 이용 시 무료입니다.
          </div>
          <div />
          <div className="content">
            <b>
              ※ 주차 공간이 제한적이오니 가급적 대중교통 이용을 권장드립니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}

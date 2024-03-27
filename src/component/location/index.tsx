import { Map } from "./map"

export const Location = () => {
  return (
    <div className="section" style={{ height: 700 }}>
      <h1>오시는길</h1>
      <Map style={{ width: 400, height: 400 }} />
    </div>
  )
}

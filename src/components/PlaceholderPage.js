const PlaceholderPage = ({ title }) => {
  return (
    <div className="placeholder-page" style={{ paddingTop: "100px", minHeight: "80vh" }}>
      <div className="container">
        <h1>{title}</h1>
        <p>This page is under construction. Please check back later.</p>
      </div>
    </div>
  )
}

export default PlaceholderPage

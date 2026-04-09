const db = require("../db");

exports.addSchool = (req, res) => {
  console.log(req.body);
  
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ message: "Latitude and Longitude must be numbers" });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({ message: "Latitude must be between -90 and 90" });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({ message: "Longitude must be between -180 and 180" });
  }

  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "School added successfully" });
  });
};


// distance function
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}



exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Coordinates required" });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    const sorted = results.map(school => {
      const distance = getDistance(
        lat,
        lon,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance: Number(distance.toFixed(2)) 
      };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  });
};
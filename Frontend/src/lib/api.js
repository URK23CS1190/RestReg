export const API_URL = "http://localhost:5000";
fetch(`${API_URL}/api/users`)
    .then(res => res.json())
    .then(data => console.log(data));
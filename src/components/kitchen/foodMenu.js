// import axios from "axios";
//
// export const FoodMenu = () => {
//     axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/fetchFoodMenu', {"Content-Type": "application/json"}).then(res => {
//         if (res.data) {
//             localStorage.setItem("menu", JSON.stringify(res.data))
//
//         } else {
//             alert("Unable to fetch food menu.");
//         }
//
//     }).catch(err => {
//         alert(err);
//     });
// }
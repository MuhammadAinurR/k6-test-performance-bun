// import http from "k6/http";
// import { check } from "k6";

// export const options = {
//   vus: 1000,
//   duration: "30s",
// };

// export default function () {
//   const res = http.get("http://localhost:3000");
//   check(res, { "status is 200": (r) => r.status === 200 });
// }


import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: '30s', target: 1000 }, // Ramp up to 1000 VUs over 30 seconds
  ],
};

export default function () {
  const res = http.get("http://localhost:3000");
  check(res, { "status is 200": (r) => r.status === 200 });
}

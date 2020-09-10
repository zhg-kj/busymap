const express = require('express');
  const app = express();
const path = require('path');

/***UTILITIES***/
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const webscraper = require('./webscraper.js');

const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  apiKey: 'AIzaSyAd6Tpl9TqVdyUKBZoNhmVwv4Aym20Bj34'
};
const geocoder = NodeGeocoder(options);

/***MARKERS***/
const markers = [
  {
    name: "Costco Wholesale",
    address: "9151 Bridgeport Rd, Richmond, BC V6X 3L9",
    position: { lat: 49.1930382, lng: -123.1218312 },
    placeID: 'ChIJWc2NzuF0hlQRDu0NNhdQCjM',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "IGA Richmond",
    address: "9100 Blundell Rd, Richmond, BC V6Y 2R1",
    position: { lat: 49.1547547, lng: -123.1239279 },
    placeID: 'ChIJTyaqpa0KhlQRTUixEuN9GZ4',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Kin's Farm Market",
    address: "6551, 1460a Number 3 Rd #1460a, Richmond, BC V6Y 2B9",
    position: { lat: 49.16600529999999, lng: -123.1385914 },
    placeID: 'ChIJcQdnVsoKhlQRX5wz0GRj92U',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Wah Shang Supermarket Ltd",
    address: "8108 Park Rd, Richmond, BC V6Y 1T1",
    position: { lat: 49.164272, lng: -123.1350855 },
    placeID: 'ChIJf4K0eLUKhlQRxhfb3ixw10g',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Save-on-Foods",
    address: "3673 Westminster Hwy, Richmond, BC V7C 5V2",
    position: { lat: 49.1707639, lng: -123.1831191 },
    placeID: 'ChIJ3WGvreEKhlQR0UNMuK-ty1E',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Super Grocer and Pharmacy",
    address: "12051 No 1 Rd, Richmond, BC V7E 1T5",
    position: { lat: 49.1256703, lng: -123.181684 },
    placeID: 'ChIJR_1tP9jhhVQReA8jXwbwork',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Safeway Seafair",
    address: "8671 No 1 Rd, Richmond, BC V7C 1V2",
    position: { lat: 49.1491585, lng: -123.1827175 },
    placeID: 'ChIJMz1XtfQKhlQRQgk-tA5NU54',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "PriceSmart Foods",
    address: "8200 Ackroyd Rd, Richmond, BC V6X 1B5",
    position: { lat: 49.1714673, lng: -123.1331415 },
    placeID: 'ChIJX0LkjzN1hlQRgPYJxWmMrqs',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "New 2000 Supermarket",
    address: "4600 Number 3 Rd #111, Richmond, BC V6X 2C2",
    position: { lat: 49.1803809, lng: -123.135466 },
    placeID: 'ChIJb9r02C51hlQR2_vMEsSHYI4',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "New Hong Kong Supermarket",
    address: "3779 Sexsmith Rd Unit 1178, Richmond, BC V6X 3Z9, Canada",
    position: { lat: 49.18565, lng: -123.129609 },
    placeID: 'ChIJQ-uQ6CZ1hlQR2q05ItZf_1A',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Real Canadian Superstore",
    address: "4651 Number 3 Rd, Richmond, BC V6X 2C4, Canada",
    position: { lat: 49.1793194, lng: -123.138493 },
    placeID: 'ChIJr8YlO_0LhlQRIBBeGuqDQmU',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Acme Grocery Store",
    address: "3031 Beckman Pl, Richmond, BC V6X 3R3, Canada",
    position: { lat: 49.1916284, lng: -123.1084648 },
    placeID: 'ChIJt8DHkhx1hlQRCXAAFisxoYs',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Rainbow Market",
    address: "9780 Cambie Rd, Richmond, BC V6X 1K4, Canada",
    position: { lat: 49.1843071, lng: -123.1149352 },
    placeID: 'ChIJNSLdkCCCC0ERt9ZVcYAMLU4',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Fruiticana",
    address: "4101 No 5 Rd, Richmond, BC V6X 2T9, Canada",
    position: { lat: 49.1838256, lng: -123.0919881 },
    placeID: 'ChIJTW_PxA11hlQRZcyT4PlaCw0',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Grocery Shop",
    address: "4117 No 5 Rd, Richmond, BC V6X 2T9, Canada",
    position: { lat: 49.1835519, lng: -123.0921777 },
    placeID: 'ChIJU34twg11hlQR1Z_pZwEUw7k',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Save-On-Foods",
    address: "11666 Steveston Hwy #3000, Richmond, BC V7A 5J3, Canada",
    position: { lat: 49.1319953, lng: -123.0961191 },
    placeID: 'ChIJK88dKQvghVQRoLpHSyCGJrA',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Exotic International Market",
    address: "11331 Coppersmith Way #110, Richmond, BC V7A 5J9, Canada",
    position: { lat: 49.1313683, lng: -123.0988872 },
    placeID: 'ChIJDexJygzghVQRii7RwK2EMTY',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Success Supermarket",
    address: "8780 Blundell Rd, Richmond, BC V6Y 3Y8, Canada",
    position: { lat: 49.1549127, lng: -123.1258403 },
    placeID: 'ChIJEz8Ywq0KhlQR-3cdr89MGDY',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "FreshCo No. 3 Rd. & Williams",
    address: "10151 Number 3 Rd, Richmond, BC V7A 4R6, Canada",
    position: { lat: 49.1390564, lng: -123.1379482 },
    placeID: 'ChIJ51eHEsbhhVQRe0Z_j-diZcA',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "M&M Food Market",
    address: "7020 Francis Rd #120, Richmond, BC V6Y 1A2, Canada",
    position: { lat: 49.1479306, lng: -123.1473907 },
    placeID: 'ChIJ60pOoqIKhlQRUQIBDXKycws',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "FreshCo No. 2 Rd. & Blundell",
    address: "6140 Blundell Rd, Richmond, BC V7C 1H8, Canada",
    position: { lat: 49.15475929999999, lng: -123.1577916 },
    placeID: 'ChIJSXvmT8cLhlQRhNdo_2BXRb0',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Kin’s Farm Market",
    address: "7820 Williams Rd Unit 105, Richmond, BC V7A 1G3, Canada",
    position: { lat: 49.14036110000001, lng: -123.1385747 },
    placeID: 'ChIJ3RJ-_x_ghVQRx_C_kDt-0ZU',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Tindahan Grocery Ltd",
    address: "5960 Minoru Blvd, Richmond, BC V6X 3J3, Canada",
    position: { lat: 49.170937, lng: -123.139586 },
    placeID: 'ChIJhWZ1wMwKhlQRd0jqT_J9GMM',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Pepper’s Produce",
    address: "8260 Westminster Hwy, Richmond, BC V6X 1A7, Canada",
    position: { lat: 49.1698185, lng: -123.1330779 },
    placeID: 'ChIJmblzjDR1hlQRiaIkafQ3Ztc',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Orchard’s Farm Market",
    address: "8260 Westminster Hwy, Richmond, BC V6X 3Y2, Canada",
    position: { lat: 49.1698185, lng: -123.1330779 },
    placeID: 'ChIJmblzjDR1hlQRj6rgrr94asE',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Smart N Save",
    address: "5300 Number 3 Rd #616, Richmond, BC V6X 2X9, Canada",
    position: { lat: 49.1755152, lng: -123.1324696 },
    placeID: 'ChIJIVQItDF1hlQR9k9F-WnT6O4',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "Izumiya Japanese Marketplace",
    address: "7971 Alderbridge Way #160, Richmond, BC V6X 2A4, Canada",
    position: { lat: 49.1775279, lng: -123.13837 },
    placeID: 'ChIJbXABxS11hlQRlRQeZwBU2Rc',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "T&T Supermarket",
    address: "Unit #MAJ1, 8311 Lansdowne Rd, Richmond, BC V6X 3A4, Canada",
    position: { lat: 49.1748917, lng: -123.130714 },
    placeID: 'ChIJ1TP3Rrx1hlQR5hWO5AofXu4',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "T&T Supermarket",
    address: "5511 Hollybridge Way, Richmond, BC V7C 0C3, Canada",
    position: { lat: 49.17358489999999, lng: -123.148357 },
    placeID: 'ChIJZ5vqn9MKhlQRpHniHHd_djI',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  },
  {
    name: "T&T Supermarket",
    address: "Yaohan Center , 1000, 3700 Number 3 Rd, Richmond, BC V6X 3X2, Canada",
    position: { lat: 49.1862612, lng: -123.1333551 },
    placeID: 'ChIJCUJPCCd1hlQRFxoiEpEGd6A',
    busy: 'none',
    visible: true,
    time: '',
    animation: null,
  }
];

/***FUNCTIONS***/
const getPositions = async function getPosition(){
  for(let i = 0; i < markers.length; i++){
    const temp = await geocoder.geocode(markers[i].address)
    markers[i].position.lat = temp[0].latitude;
    markers[i].position.lng = temp[0].longitude;
  }
}

const getBusyness = async function getBusyness(n){
  let busy;
  const d = new Date();
  await webscraper(markers[n].placeID)
  .then(busyness => {if(busyness != undefined){busy = busyness}else{busy = 'unavailable'}})
  .catch(() => {busy = 'unavailable'});
  markers[n].busy = busy;
  markers[n].time = d.toLocaleTimeString();
}

/***APIs***/
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getMarkers', async (req,res) => {
  //await getPositions();
  res.json(markers);
  console.log(markers)
});

app.post('/api/getBusyness', async (req,res) => {
  console.log('Request Recieved');
  const n = req.body.index;
  console.log(n);
  await getBusyness(n);
  console.log('Retrieve Data For Marker Complete');
  //markers[n].icon = Rendered;
  var mark = markers;
  res.json(mark);
  console.log('Sent Markers');
  console.log(markers);
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
const QRCode = require("qrcode");

QRCode.toDataURL("rytr76577gf7765", function (err, url) {
  console.log(url);
});
// QRCode.toDataURL("https://me.com", function (err, url) {
//   console.log(url);
// });


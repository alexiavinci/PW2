require('dotenv').config();

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = process.env.PINATA_JWT;

async function main() {
  try {
    const formData = new FormData();

    // const file = fs.createReadStream("./hello.txt");
    // formData.append("file", file);

    // const pinataMetadata = JSON.stringify({
    //   name: "File name",
    // });

    const image = fs.createReadStream("./Chaton.jpeg");
    formData.append("file", image);

    const pinataMetadata = JSON.stringify({
      name: "Chaton trop cute", 
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
          ...formData.getHeaders(),
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

main();

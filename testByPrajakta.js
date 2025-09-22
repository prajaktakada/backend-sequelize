
//     // ======= Private Constants =======
//     function getKey() {
//         return "1C7BE9FD837109A6CDF80B10936E26C6";
//     }

//     function getAccessCode() {
//         return "AVOA69BU89HA17HPJD";
//     }

//     function getInstituteId() {
//         return "CC57";
//     }

//     function getVersion() {
//         return "1.0";
//     }

//     function getAgentId() {
//         const agentArr = ["CC01CC57AGT000000638"]; // INT : CC01CC57INTU25949555
//         const randIndex = Math.floor(Math.random() * agentArr.length);
//         return agentArr[randIndex];
//     }

//     // ======= AES Encryption =======
//     function encrypt(plainText, key) {
//         const md5Key = crypto.createHash("md5").update(key).digest();
//         const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
//                                 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
//         const cipher = crypto.createCipheriv("aes-128-cbc", md5Key, iv);
//         const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
//         return encrypted.toString("hex");
//     }

//     function decrypt(encryptedHex, key) {
//         const md5Key = crypto.createHash("md5").update(key).digest();
//         const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
//                                 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
//         const encryptedBuffer = Buffer.from(encryptedHex, "hex");
//         const decipher = crypto.createDecipheriv("aes-128-cbc", md5Key, iv);
//         const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
//         return decrypted.toString("utf8");
//     }

//     // ======= Random String Generator =======
//     function generateRandomString(length = 35) {
//         const lastY = new Date().getFullYear().toString().slice(-1);
//         const startOfYear = new Date(new Date().getFullYear(), 0, 0);
//         const diff = new Date() - startOfYear;
//         const oneDay = 1000 * 60 * 60 * 24;
//         const nthDayOfYear = Math.floor(diff / oneDay);

//         const hour24 = String(new Date().getHours()).padStart(2, '0');
//         const minute = String(new Date().getMinutes()).padStart(2, '0');

//         const lastPart = `${lastY}${nthDayOfYear + 1}${hour24}${minute}`;
//         const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//         let randomString = '';
//         const charLength = characters.length;
//         const remainingLength = length - lastPart.length;

//         for (let i = 0; i < remainingLength; i++) {
//             randomString += characters.charAt(Math.floor(Math.random() * charLength));
//         }
//         return randomString + lastPart;
//     }

//     function getStringBetween(str, start, end) {
//         const startIndex = str.indexOf(start);
//         if (startIndex === -1) return '';
//         const endIndex = str.indexOf(end, startIndex + start.length);
//         if (endIndex === -1) return '';
//         return str.substring(startIndex + start.length, endIndex);
//     }

//     // ======= Main API Call =======
//     function getBillerInfoBBPS() {
//         //let url = "https://stgapi.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml?"; // UAT
//         // let url = "https://api.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml?"; // Live
//         let url = "https://masterpay.pro/appapi3/bbps_apicall?"; // MasterPay

//         const plainText = `<?xml version="1.0" encoding="UTF-8"?>
// <billerInfoRequest>
//     <billerId>AUBA00000NAT3Q</billerId>
//     <billerId>AXIS00000NATKF</billerId>
//     <billerId>BANK00000NAT0Q</billerId>
//     <billerId>BANK00000NATKB</billerId>
//     <billerId>CANA00000NATDO</billerId>
//     <billerId>DBSB00000NATPR</billerId>
//     <billerId>DHAN00000NAT6X</billerId>
//     <billerId>ESAF00000NATPB</billerId>
//     <billerId>FEDE00000NATDL</billerId>
//     <billerId>HDFC00000NATBH</billerId>
//     <billerId>HDFC00000NATW1</billerId>
//     <billerId>HSBC00000NAT4M</billerId>
//     <billerId>ICIC00000NATSI</billerId>
//     <billerId>IDBI00000NAT7G</billerId>
//     <billerId>IDFC00000NATFQ</billerId>
//     <billerId>INDI00000NAT8I</billerId>
//     <billerId>INDI00000NATFA</billerId>
//     <billerId>INDU00000NATL1</billerId>
//     <billerId>IOBC00000NATI3</billerId>
//     <billerId>KOTA00000NATED</billerId>
//     <billerId>ONEB00000NATS1</billerId>
//     <billerId>PUNJ00000NATEY</billerId>
//     <billerId>RBLB00000NATN3</billerId>
//     <billerId>SARA00000NAT16</billerId>
//     <billerId>SBIC00000NATDN</billerId>
//     <billerId>SOUT00000NAT68</billerId>
//     <billerId>SURY00000NATNX</billerId>
//     <billerId>UNIO00000NATG9</billerId>
//     <billerId>YESB00000NAT8U</billerId>
// </billerInfoRequest>`;

//         const key = getKey();
//         console.log("Key:", key);
//         console.log("XML:", plainText);

//         const encryptedXml = encrypt(plainText, key);
//         console.log("encryptedXml:", encryptedXml);

//         const params = {
//             accessCode: getAccessCode(),
//             requestId: generateRandomString(),
//             ver: getVersion(),
//             instituteId: getInstituteId(),
//         };

//         const finalUrl = url + new URLSearchParams(params).toString();
//         // const finalUrl = url;
//         console.log("Request Params:", params);
//         console.log("Final URL:", finalUrl);

//         try {
//             const response = axios.post(finalUrl, encryptedXml, {
//                 headers: { "Content-Type": "text/xml" },
//                 httpsAgent: new (require("https").Agent)({
//                     rejectUnauthorized: false // like CURLOPT_SSL_VERIFYPEER = false
//                 })
//             });

//             //console.log("Encrypted Response:", response.data);
//             const decrypted = decrypt(response.data, key);
//             // console.log("Decrypted Response:\n", decrypted);
//             fs.writeFileSync("response.xml", decrypted, "utf8");
//             console.log("Full response saved to response.xml");
//         } catch (err) {
//             console.error("Error calling API:", err.message);
//         }
//     }


// // ======= Usage Example =======
// (() => {
//     const api = new BillavenueAPI();
//     api.getBillerInfoBBPS();
// })();


function getKey() {
        return "1C7BE9FD837109A6CDF80B10936E26C6";
    }

    function getAccessCode() {
        return "AVOA69BU89HA17HPJD";
    }

    function getInstituteId() {
        return "CC57";
    }

    function getVersion() {
        return "1.0";
    }

    function getAgentId() {
        const agentArr = ["CC01CC57AGT000000638"]; // INT : CC01CC57INTU25949555
        const randIndex = Math.floor(Math.random() * agentArr.length);
        return agentArr[randIndex];
    }
let url = "https://masterpay.pro/appapi3/bbps_apicall?";
    // ======= AES Encryption =======
    function encrypt(plainText, key) {
        const md5Key = crypto.createHash("md5").update(key).digest();
        const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                                0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
        const cipher = crypto.createCipheriv("aes-128-cbc", md5Key, iv);
        const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
        return encrypted.toString("hex");
    }

    function decrypt(encryptedHex, key) {
        const md5Key = crypto.createHash("md5").update(key).digest();
        const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                                0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
        const encryptedBuffer = Buffer.from(encryptedHex, "hex");
        const decipher = crypto.createDecipheriv("aes-128-cbc", md5Key, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
        return decrypted.toString("utf8");
    }

    // ======= Random String Generator =======
    function generateRandomString(length = 35) {
        const lastY = new Date().getFullYear().toString().slice(-1);
        const startOfYear = new Date(new Date().getFullYear(), 0, 0);
        const diff = new Date() - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const nthDayOfYear = Math.floor(diff / oneDay);

        const hour24 = String(new Date().getHours()).padStart(2, '0');
        const minute = String(new Date().getMinutes()).padStart(2, '0');

        const lastPart = `${lastY}${nthDayOfYear + 1}${hour24}${minute}`;
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        const charLength = characters.length;
        const remainingLength = length - lastPart.length;

        for (let i = 0; i < remainingLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return randomString + lastPart;
    }
 const params = {
            accessCode: getAccessCode(),
            requestId: generateRandomString(),
            ver: getVersion(),
            instituteId: getInstituteId(),
        };

        const finalUrl = url + new URLSearchParams(params).toString();
        // const finalUrl = url;
        console.log("Request Params:", params);
        console.log("Final URL:", finalUrl);
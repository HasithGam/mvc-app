"use strict";
const https = require("https");

const getCatFacts = (req, res) => {
    const limit = req.query.limit || 1;

    const url = `https://catfact.ninja/facts?limit=${limit}`;

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            if (response.statusCode === 200) {
                try {
                    const facts = JSON.parse(data).data;

                    if (!facts || !Array.isArray(facts)) {
                        throw new Error("Invalid response format");
                    }

                    res.send({ result: 200, data: facts });
                } catch (err) {
                    console.log(err);
                    res.status(500).send({ result: 500, error: err.message });
                }
            } else {
                try {
                    const errorData = JSON.parse(data);
                    res.status(response.statusCode).send({ result: response.statusCode, error: errorData.message });
                } catch (err) {
                    res.status(response.statusCode).send({ result: response.statusCode, error: "Failed to parse error message" });
                }
            }
        });
    }).on("error", (err) => {
        console.log(err);
        res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
    getCatFacts
};

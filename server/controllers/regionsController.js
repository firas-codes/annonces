const db = require('../services/db');


const addPays = async (req, res) => {
    const { nompays } = req.body;
    if (!nompays) {
        res.status(401).json({ message: "please provide country name" });
    }
    try {
        const results = await db.promise().query(`INSERT INTO PAYS (nompays) VALUES('${nompays}')`);
        if (results[0].affectedRows) {
            const id = results[0].insertId;
            const getInsertedPays = await db
                .promise()
                .query(`SELECT * FROM PAYS WHERE idpays=${id}`);
            const insertedPays = getInsertedPays[0][0];
            res
                .status(201)
                .json({ msg: "country created", pays: insertedPays });
        } else {
            res.status(400).json({ msg: "country creation failed" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getPays = async (req, res) => {
    try {
        const results = await db.promise().query(`SELECT * FROM Pays`);
        res.status(200).json({ totalPays: results[0].length, pays: results[0] });
    } catch (error) {
        console.log(error);
    }
};

const getGouvernorats = async (req, res) => {
    try {
        // const results = await db.promise().query(`SELECT * FROM GOUVERNORAT`);
        const results2 = await db.promise().query(`SELECT GOUVERNORAT.idgouvernorat AS idGouvernorat, GOUVERNORAT.nomgouvernorat AS nomGouvernorat, PAYS.nompays as nomPays FROM GOUVERNORAT JOIN PAYS ON GOUVERNORAT.idpays = PAYS.idpays`);
        res.status(200).json({ totalGouvernorat: results2[0].length, gouvernorats: results2[0] });
    } catch (error) {
        console.log(error);
    }
}

const addGouvernorat = async (req, res) => {
    const { nomgouvernorat, idpays } = req.body;
    if (!nomgouvernorat) {
        res.status(401).json({ message: "please provide gouvernorat name" });
    }
    if (nomgouvernorat && !idpays) {
        res.status(401).json({ message: "please select country name" });
    }
    try {
        const results = await db.promise().query(`INSERT INTO GOUVERNORAT (nomgouvernorat,idpays) VALUES('${nomgouvernorat}',${idpays})`);
        if (results[0].affectedRows) {
            const id = results[0].insertId;
            const getInsertedGouvernorat = await db
                .promise()
                .query(`SELECT * FROM GOUVERNORAT WHERE idgouvernorat=${id}`);
            const insertedGouvernorat = getInsertedGouvernorat[0][0];
            res
                .status(201)
                .json({ message: "gouvernorat created", gouvernorat: insertedGouvernorat });
        } else {
            res.status(400).json({ message: "gouvernorat creation failed" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getVilles = async (req, res) => {
    try {
        const results = await db.promise().query(`SELECT VILLE.idville , VILLE.nomville, GOUVERNORAT.nomgouvernorat FROM VILLE JOIN GOUVERNORAT ON VILLE.idgouvernorat = GOUVERNORAT.idgouvernorat`);
        res.status(200).json({ totalVilles: results[0].length, villes: results[0] });
    } catch (error) {
        console.log(error);
    }
};

const addVille = async (req, res) => {
    const { nomville, idgouvernorat } = req.body;
    if (!nomville) {
        res.status(401).json({ message: "please provide ville name" });
    }
    if (nomville && !idgouvernorat) {
        res.status(401).json({ message: "please select gouvernorat name" });
    }
    try {
        const results = await db.promise().query(`INSERT INTO VILLE (nomville,idgouvernorat) VALUES('${nomville}',${idgouvernorat})`);
        if (results[0].affectedRows) {
            const id = results[0].insertId;
            const getInsertedVille = await db
                .promise()
                .query(`SELECT * FROM VILLE WHERE idville=${id}`);
            const insertedVille = getInsertedVille[0][0];
            res
                .status(201)
                .json({ message: "ville created", ville: insertedVille });
        } else {
            res.status(400).json({ message: "ville creation failed" });
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = { addPays, getPays, getGouvernorats, addGouvernorat,getVilles,addVille };
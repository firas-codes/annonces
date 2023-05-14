const db = require("../services/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// LOGIN controller
const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let isAdmin = false;
        let isUser = false;

        try {
            const results = await db
                .promise()
                .query(
                    `SELECT idadministrateur,nomadministrateur,prenomadministrateur,emailadministrateur,teladministrateur from ADMINISTRATEUR WHERE emailadministrateur = '${email}' AND mdpadministrateur = '${password}'`
                );
            const admin = results[0][0];

            const results2 = await db
                .promise()
                .query(
                    `SELECT idutilisateur,nomutilisateur,prenomutilisateur,emailutilisateur,mdputilisateur,telephoneutilisateur FROM UTILISATEUR WHERE emailutilisateur ='${email}' AND mdputilisateur ='${password}'`
                );
            const user = await results2[0][0];


            const userToken = generateToken(user?.idutilisateur);
            const adminToken = generateToken(admin?.idadministrateur);

            if (user) {
                isUser = true;
                const { idutilisateur, nomutilisateur, prenomutilisateur, emailutilisateur, telephoneutilisateur } = user;
                res.status(200).json({ user: { idutilisateur, nomutilisateur, prenomutilisateur, emailutilisateur, telephoneutilisateur }, isAdmin, isUser, token: userToken });
            }
            if (admin) {
                isAdmin = true;
                const { idadministrateur, nomadministrateur, prenomadministrateur, emailadministrateur, teladministrateur } = admin;
                res.status(200).json({ user: { idadministrateur, nomadministrateur, prenomadministrateur, emailadministrateur, teladministrateur }, isAdmin, isUser, token: adminToken });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json({ message: "email or password are invalid !" });
    }
};

// REGISTER controller
const register = async (req, res) => {
    const { nom, prenom, email, mdp, telephone } = req.body;
    if (nom && prenom && email && mdp && telephone) {
        // // encrypt password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(mdp, salt);
        try {
            const results = await db
                .promise()
                .query(
                    `INSERT INTO UTILISATEUR (nomutilisateur,prenomutilisateur,emailutilisateur,mdputilisateur,telephoneutilisateur) VALUES ('${nom}','${prenom}','${email}','${mdp}','${telephone}')`
                );
            if (results[0].affectedRows) {
                const id = results[0].insertId;
                const getInsertedUser = await db
                    .promise()
                    .query(`SELECT * FROM UTILISATEUR WHERE idutilisateur=${id}`);
                const insertedUser = getInsertedUser[0][0];
                if (insertedUser) {
                    res.status(201).json({ user: insertedUser });
                } else {
                    res.status(400).json({ msg: "user creation failed" });
                }
            }
        } catch (error) {
            console.log("error from catch insert user", error);
        }
    } else {
        res.status(400).json({
            msg: "problem with insert, please check for duplicated or empty values ",
        });
    }
}


module.exports = { login, register };
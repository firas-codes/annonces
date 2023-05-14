const db = require('../services/db');


const getCategories = async(req,res)=>{
    try {
        const results = await db.promise().query(`SELECT * FROM CATEGORIE`);
        res.status(200).json({totalcategories:results[0].length,categories:results[0]});
    } catch (error) {
        console.log(error);
    }
};

const addCategory = async(req,res)=>{
    const {nomcategorie,idcategorieparent} = req.body;
    if(!nomcategorie){
        res.status(401).json({message:"please provide category name"});
    }
    if(!idcategorieparent){
        try {
            const results = await db.promise().query(`INSERT INTO CATEGORIE (nomcategorie,idcategorieparent) VALUES('${nomcategorie}',0)`);
            if (results[0].affectedRows) {
                //   console.log("insert success id:", results[0].insertId);
                const id = results[0].insertId;
                const getInsertedCategory = await db
                  .promise()
                  .query(`SELECT * FROM CATEGORIE WHERE idcategorie=${id}`);
                const insertedCategory = getInsertedCategory[0][0];
                //   console.log("inserted category", insertedCategory);
                res
                  .status(201)
                  .json({ msg: "category created", category: insertedCategory });
              } else {
                res.status(400).json({ msg: "category creation failed" });
              }
        } catch (error) {
            console.log(error);
        }
    }
    else{
        try {
            const results = await db.promise().query(`INSERT INTO CATEGORIE (nomcategorie,idcategorieparent) VALUES('${nomcategorie}',${Number(idcategorieparent)})`);
            if (results[0].affectedRows) {
                //   console.log("insert success id:", results[0].insertId);
                const id = results[0].insertId;
                const getInsertedCategory = await db
                  .promise()
                  .query(`SELECT * FROM CATEGORIE WHERE idcategorie=${id}`);
                const insertedCategory = getInsertedCategory[0][0];
                //   console.log("inserted category", insertedCategory);
                res
                  .status(201)
                  .json({ msg: "category created", category: insertedCategory });
              } else {
                res.status(400).json({ msg: "category creation failed" });
              }
        } catch (error) {
            console.log(error);
        }
    }
    
};

const getSingleCategory = async(req,res)=>{
    const {id} = req.params;
    try {
        const results = await db.promise().query(`SELECT * FROM CATEGORIE WHERE idcategorie=${Number(id)}`);
        res.status(200).json({categorie: results[0][0]});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {addCategory,getCategories,getSingleCategory};
import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from "../database/data.js"


export async function getQuestions(req, res){
    try {
       const q = await Questions.find();
       res.json(q)
    } catch (error) {
        res.json({ error })
    }
}



export async function insertQuestions(req, res){
    try {
        const data = await Questions.create({ questions, answers });
        res.json({ msg: "Data Saved Successfully...!", data });
    } catch (error) {
        res.json({ error })
    }
}

    export async function dropQuestions(req, res){
        try {
             await Questions.deleteMany();
             res.json({ msg: "Questions Deleted Successfully...!"});
        } catch (error) {
             res.json({ error })
        }
     }
     


     export async function getResult(req, res){
        try {
            const filter = req.query.email ? { email: req.query.email } : {};
            const r = await Results.find(filter).sort({ createdAt: -1 });
            res.json(r)
        } catch (error) {
            res.json({ error })
        }
    }


    export async function storeResult(req, res) {
        try {
          const { username, email, result, attempts, points, achieved } = req.body;
          if (!username || !email || !result) throw new Error("Data Not Provided...!");
          const data = await Results.create({ username, email, result, attempts, points, achieved });
          res.json({ msg: "Result Saved Successfully...!", data });
        } catch (error) {
          res.json({ error: error.message });
        }
      }
     
     

     export async function dropResult(req, res){
        try {
            await Results.deleteMany();
            res.json({ msg : "Result Deleted Successfully...!"})
        } catch (error) {
            res.json({ error })
        }
    }

    export async function deleteResultById(req, res){
        try {
            const { id } = req.params;
            await Results.findByIdAndDelete(id);
            res.json({ msg : "Result Deleted Successfully...!"})
        } catch (error) {
            res.json({ error : error.message })
        }
    }
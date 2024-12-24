import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

/* Get environment variables */
import dotenv from "dotenv";
dotenv.config();

/* Connect to the database */
import ChildCareFacility, {
    IChildCareFacility,
} from "./models/ChildCareFacility";
import connectDB from "./config/db";
connectDB();

/* Configure the port */
const PORT: number = parseInt(process.env.PORT || "3000");

const app: Application = express();
app.use(express.json());
app.use(cors());

/* Start the server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* Get full list of facilities */
app.get("/childcare/facilities", async (req: Request, res: Response) => {
    try {
        const facilities = await ChildCareFacility.find({});
        res.status(200).json(facilities);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch full facilities list" });
    }
});

/* Get facility by ID */
app.get("/childcare/facilities/:id", async (req: Request, res: Response) => {
    try {
        const facility = await ChildCareFacility.findById(req.params.id).exec();
        if (facility) {
            res.status(200).json(facility);
        } else {
            res.status(404).send(
                `Facility with ID [${req.params.id} not found]`
            );
        }
    } catch (err) {
        res.status(500).json({
            error: `Failed to fetch facility with id: ${req.params.id}`,
        });
    }
});

/* Create new facility */
app.post("/childcare/facilities", async (req: Request, res: Response) => {
    const facilityData = req.body as IChildCareFacility;

    try {
        const newFacility = new ChildCareFacility(facilityData);
        await newFacility.save();
        res.status(201).json(newFacility);
    } catch (err) {
        res.status(500).json({ error: "Failed to create new facility" });
        console.log(err);
    }
});

/* Error handling for incorrect routes */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: "Route not found" });
});

/* General error handler */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Seeding for data base
const sequelize = require("./db");

const Student = require("./models/s.model");
const Teacher = require("./models/t.model");
const TeachingAssignment = require("./models/ta.model");

async function seed() {
    try {
        await sequelize.sync({ force: false });

        // ---------------- TEACHERS ----------------
        const teachers = await Teacher.bulkCreate(
            [
                { name: "Ms. Smith", contactDetails: "smith@school.com" },
                { name: "Mr. Lee", contactDetails: "lee@school.com" },
                { name: "Ms. Johnson", contactDetails: "johnson@school.com" },
                { name: "Mr. Adams", contactDetails: "adams@school.com" },
            ],
            { returning: true }
        );

        // ---------------- TEACHING ASSIGNMENTS ----------------
        await TeachingAssignment.bulkCreate([
            { subject: "Math", classNumber: 1, section: "A", TeacherId: teachers[0].id },
            { subject: "Science", classNumber: 1, section: "A", TeacherId: teachers[1].id },
            { subject: "Math", classNumber: 2, section: "B", TeacherId: teachers[2].id },
            { subject: "English", classNumber: 2, section: "B", TeacherId: teachers[3].id },
        ]);

        // ---------------- STUDENTS ----------------
        await Student.bulkCreate([
            {
                name: "Ram", classNumber: 1,
                section: "A",
                rollNumber: 1,
                contactDetails: "9841000001",
            },
            {
                name: "Sita",
                classNumber: 1,
                section: "A",
                rollNumber: 2,
                contactDetails: "9841000002",
            },
            {
                name: "Hari",
                classNumber: 2,
                section: "B",
                rollNumber: 1,
                contactDetails: "9841000003",
            },
            {
                name: "Gita",
                classNumber: 2,
                section: "B",
                rollNumber: 2,
                contactDetails: "9841000004",
            },
        ]);

        console.log("✅ Teachers, subjects, and students seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();

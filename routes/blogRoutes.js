const express = require("express")
const studentController = require("../controllers/studentController")

const router = express.Router();

router.get('/', studentController.student_index)

router.post("/", studentController.student_create_post)

router.get("/:id", studentController.student_details)

router.delete("/:id", studentController.student_deleteStudent)

router.put("/checkin/:id", studentController.student_checkin)

router.put("/checkout/:id", studentController.student_checkout)

module.exports = router;
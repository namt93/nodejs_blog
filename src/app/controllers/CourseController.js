const Course = require("../models/Course");
const { mongooseToObject } = require("../../utils/mongoose");

class CourseController {
  // [GET] / /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET] / /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] / /courses/add
  add(req, res, next) {
    const formData = req.body;
    formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/13/13.png`;
    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {});
  }
}

module.exports = new CourseController();

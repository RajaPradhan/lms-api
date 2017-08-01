import mongoose from 'mongoose';
import q from 'q';

const Course = mongoose.model('Course'),

getAllCourses = () => {
  const deferred = q.defer();
  Course.find().exec((err, courses) => {
      if(err) {
          deferred.reject({"status": 500, "jsonResult": {"result": err}});
      } else if(!courses) {
          deferred.reject({"status": 404, "jsonResult": {"result": "Courses not found"}});
      } else {
          deferred.resolve({"status": 200, "jsonResult": {"result": courses}});
      }
  });
  return deferred.promise;
},

getCourseDetailsById = _id => {
  const deferred = q.defer();
  Course.findById(_id).exec(function(err, course) {
      if(err) {
          deferred.reject({"status": 500, "jsonResult": {"result": err}});
      } else if(!course) {
          deferred.reject({"status": 404, "jsonResult": {"result": "Course not found"}});
      } else {
          deferred.resolve({"status": 200, "jsonResult": {"result": course}});
      }
  });
  return deferred.promise;
},

addCourse = (courseDetails) => {
  const deferred = q.defer();
  let course = new Course();

  course.name = courseDetails.name;
  course.lname = courseDetails.name.toLowerCase();
  course.desc = courseDetails.desc;
  course.category = courseDetails.category;
  course.facets = courseDetails.facets;
  course.pricing = {price: courseDetails.price, offer: courseDetails.offer};
  course.batches = courseDetails.batches,
  course.lastUpdated = Date.now();
  console.log(course);

  course.save(err => {
    if(err) {
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else {
      deferred.resolve({"status": 200, "jsonResult": {"result": "Course added successfully"}});
    }
  });

  return deferred.promise;
},

updateCourseById = (_id, courseDetails) => {
  const deferred = q.defer();
  Course.findById(_id).exec(function(err, course) {
      if(err) {
        deferred.reject({"status": 500, "jsonResult": {"result": err}});
      } else if(!course) {
        deferred.reject({"status": 404, "jsonResult": {"result": "Course not found"}});
      } else {
        course.name = courseDetails.name;
        course.lname = courseDetails.name.toLowerCase();
        course.desc = courseDetails.desc;
        course.category = courseDetails.category;
        course.facets = courseDetails.facets;
        course.pricing = {price: courseDetails.price, offer: courseDetails.offer};
        course.batches = courseDetails.batches,
        course.lastUpdated = Date.now();
        console.log(course);

        course.save(function(err, course) {
          if(err) {
              deferred.reject({"status": 500, "jsonResult": {"result": err}});
          } else {
              deferred.resolve({"status": 200, "jsonResult": {"result": course}});
          }
        });
      }
  });
  return deferred.promise;
},

deleteCourseById = _id => {
  const deferred = q.defer();
  Course.findByIdAndRemove(_id).exec(function(err, course) {
      if(err) {
          deferred.reject({"status": 500, "jsonResult": {"result": err}});
      } else if(!course) {
          deferred.reject({"status": 404, "jsonResult": {"result": "Course not found"}});
      } else {
          deferred.resolve({"status": 200, "jsonResult": {"result": "Course deleted successfully"}});
      }
  });
  return deferred.promise;
};

export {
  getAllCourses as getAllCoursesService,
  getCourseDetailsById as getCourseDetailsByIdService,
  addCourse as addCourseService,
  updateCourseById as updateCourseByIdService,
  deleteCourseById as deleteCourseByIdService
};

import {
  getAllCoursesService,
  getCourseDetailsByIdService,
  addCourseService,
  updateCourseByIdService,
  deleteCourseByIdService
} from '../../services/course/courseService';

const sendJSONResponse = (res, responseObj) => {
    console.log('responseObj=>', responseObj);
    res.status(responseObj.status);
    res.json(responseObj.jsonResult);
},

getAllCourses = (req, res) => {
  getAllCoursesService()
  .then(responseObj => {
      console.log('Promise resolved');
      sendJSONResponse(res, responseObj);
  })
  .catch(responseObj => {
      console.log('Promise rejected');
      sendJSONResponse(res, responseObj);
  });
},

getCourseDetailsById = (req, res) => {
  const _id = req.params.id;
  if(!_id) {
    const responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
    sendJSONResponse(res, responseObj);
  } else {
    getCourseDetailsByIdService(_id)
    .then(responseObj => {
        console.log('Promise resolved');
        sendJSONResponse(res, responseObj);
    })
    .catch(responseObj => {
        console.log('Promise rejected');
        sendJSONResponse(res, responseObj);
    });
  }
},

addCourse = (req, res) => {
  if(!req.body.name
  || !req.body.desc
  || !req.body.category
  || !req.body.price) {
    sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required."}});
  } else {
    addCourseService({
      name: req.body.name,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      offer: req.body.offer,
      batches: req.body.batches.length > 0 ? req.body.batches : []
    })
    .then(responseObj => {
        console.log('Promise resolved');
        sendJSONResponse(res, responseObj);
    })
    .catch(responseObj => {
        console.log('Promise rejected');
        sendJSONResponse(res, responseObj);
    });
  }
},

updateCourseById = (req, res) => {
  const _id = req.params.id;
  if(!_id) {
      const responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
      sendJSONResponse(res, responseObj);
  } else {
      const courseDetails = {
        name: req.body.name,
        desc: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        offer: req.body.offer,
        batches: req.body.batches.length > 0 ? req.body.batches : []
      };
      updateCourseByIdService(_id, courseDetails)
      .then(responseObj => {
          sendJSONResponse(res, responseObj);
      })
      .catch(responseObj => {
          sendJSONResponse(res, responseObj);
      });
  }
},

deleteCourseById = (req, res) => {
  const _id = req.params.id;
  console.log('_id:' + _id);
  if(!_id) {
      const responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
      sendJSONResponse(res, responseObj);
  } else {
      deleteCourseByIdService(_id)
      .then(responseObj => {
          console.log('responseObj', responseObj);
          sendJSONResponse(res, responseObj);
      })
      .catch(responseObj => {
          sendJSONResponse(res, responseObj);
      });
  }
};

export {
  getAllCourses,
  getCourseDetailsById,
  addCourse,
  updateCourseById,
  deleteCourseById
};

import mongoose from 'mongoose';
import q from 'q';

const Course = mongoose.model('Course'),

courseSearch = queryStr => {
  const deferred = q.defer();

  Course.find({lname: new RegExp(queryStr)}).exec((err, courses) => {
    if(err) {
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else if(!courses) {
      deferred.reject({"status": 404, "jsonResult": {"result": "No matching course found"}});
    } else {
      console.log('courses res=', courses);
      deferred.resolve({"status": 200, "jsonResult": {"result": courses}});
    }
  });

  return deferred.promise;
},

facetSearch = facets => {
  const deferred = q.defer();
  
  Course.find({facets: {$in: facets}}).exec((err, courses) => {
    if(err) {
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else if(!courses) {
      deferred.reject({"status": 404, "jsonResult": {"result": "No matching course found"}});
    } else {
      console.log('courses res=', courses);
      deferred.resolve({"status": 200, "jsonResult": {"result": courses}});
    }
  });

  return deferred.promise;
};

export { courseSearch as courseSearchService, facetSearch as facetSearchService };

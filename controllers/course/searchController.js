import { courseSearchService, facetSearchService } from '../../services/course/searchService';

const sendJSONResponse = (res, responseObj) => {
    res.status(responseObj.status);
    res.json(responseObj.jsonResult);
},

courseSearch = (req, res) => {
  const queryStr = req.query.q;
  console.log('queryStr=', queryStr);

  courseSearchService(queryStr)
  .then(responseObj => {
    sendJSONResponse(res, responseObj);
  })
  .catch(responseObj => {
    sendJSONResponse(res, responseObj);
  });
},

facetSearch = (req, res) => {
  const facets = req.body.facets;

  facetSearchService(facets)
  .then(responseObj => {
    sendJSONResponse(res, responseObj);
  })
  .catch(responseObj => {
    sendJSONResponse(res, responseObj);
  });
};

export { courseSearch, facetSearch };

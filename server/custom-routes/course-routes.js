let Courses = require('../models/course')
let Lists = require('../models/list')


module.exports = {
  specificCourse: {
    path: '/courses/:courseId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find course by CourseID'
      Courses.findById(req.params.courseId)
        .then(course => {
          res.send(handleResponse(action, course))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  listsOncourses: {
    path: '/courses/:courseId/lists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Lists by courseID'
      Lists.find({ courseId: req.params.courseId })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  courseList: {
    path: '/courses/:courseId/lists',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create List On course'
      Lists.create(req.body)
        .then(list => {
          res.send(handleResponse(action, list))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  usercourses: {
    path: '/usercourses',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create User course'
      courses.create(req.body)
        .then(course => {
          res.send(handleResponse(action, course))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  course: {
    path: '/usercourses/:courseId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find course'
      Courses.findbyId(req.params.courseId)
        .then(course => {
          res.send(handleResponse(action, course))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  lists: {
    path: '/usercourses/:courseId/lists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find course Lists'
      Lists.find({ courseId: req.params.courseId })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  list: {
    path: '/usercourses/:courseId/lists/:listId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List'
      Lists.findbyId(req.params.listId)
        .then(list => {
          res.send(handleResponse(action, list))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  tasks: {
    path: '/usercourses/:courseId/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List Tasks'
      Tasks.find({ listId: req.params.listId })
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  task: {
    path: '/usercourses/:courseId/lists/:listId/tasks/:taskId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Task'
      Tasks.findById(req.params.taskId)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  comments: {
    path: '/usercourses/:courseId/lists/:listId/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Task Comments'
      Comments.find({ taskId: req.params.taskId })
        .then(comments => {
          res.send(handleResponse(action, comments))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  comment: {
    path: '/usercourses/:courseId/lists/:listId/tasks/:taskId/comments/:commentId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Comments'
      Comments.findById(req.params.commentId)
        .then(comment => {
          res.send(handleResponse(action, comment))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedcourses: {
    path: '/sharedcourses',
    reqType: 'get',
    method(req, res, next) {
      Courses.find({ collaborators: { $in: req.session.uid } })
        .then(courses => {
          res.send(handleResponse(action, courses))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
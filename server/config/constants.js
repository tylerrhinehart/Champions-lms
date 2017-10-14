const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  course: {
    name: 'Course',
    endpoint: 'courses',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  list: {
    name: 'List',
    endpoint: 'lists',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  task: {
    name: 'Task',
    endpoint: 'tasks',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  comment: {
    name: 'Comment',
    endpoint: 'comments',
    // useCustomRoutes:true,
  },
  vault: {
    name: 'Vault',
    endpoint: 'vaults',
    // preventDefaultApi: true,
    useCustomRoutes: true
  },
  keep: {
    name: 'Keep',
    endpoint: 'keeps',
    // preventDefaultApi: true,
    useCustomRoutes: true
  },
}


module.exports = {
  actions,
  models
}
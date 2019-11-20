export const pathToStatusMapping = {
  '/': 'PENDING',
  '/completed': 'COMPLETED',
  '/deleted': 'DELETED',
  '/add': 'ADD',
  '/update': 'ADD'
}

export const statusToPathMapping = {
  'PENDING': '/',
  'COMPLETED': '/completed',
  'DELETED': '/deleted'
}


export const toDoStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  DELETED: 'DELETED'
}

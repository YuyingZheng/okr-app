export default function (instance) {
  return {
    saveTask(taskArray) {
      return instance
        .post('/devLogin.json?username=admin', taskArray)
        .then(response => response.data)
    }
  }
}

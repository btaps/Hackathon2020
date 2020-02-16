const endPoint = 'http://10.3.18.204:8080/'

class RouteModels {
  static all = () => {
    return fetch(endPoint)
            .then(res => res.json())
            .catch(err => console.log('Could not get all route data using fetch', err))
  }
}

export default RouteModels

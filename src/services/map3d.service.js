import httpService from './http.service'
import envConfig from '@/config/env-config'

export default {
  // visual/{project_id}/{scheme_id} getSchemeVisualInfo
  getSchemeVisualInfo (project_id, scheme_id) {
    return httpService.get(envConfig.apiBaseUrl + `/visual/${project_id}/${scheme_id}`, {}, true)
  },

  getNoiseData (scheme_id) {
    const formData = new FormData()
    formData.append('scheme_id', scheme_id)
    return httpService.post(envConfig.apiBaseUrl + `/setting/countNoise`, formData, true)
  },
  getCreditData (scheme_id) {
    const formData = new FormData()
    formData.append('scheme_id', scheme_id)
    return httpService.post(envConfig.apiBaseUrl + `/setting/performCredit`, formData, true)
  },
  getRiskData (scheme_id) {
    const formData = new FormData()
    formData.append('scheme_id', scheme_id)
    return httpService.post(envConfig.apiBaseUrl + `/setting/recognizeriskPoints`, formData, true)
  },
  getWindMapData (project_id, scheme_id) {
    return httpService.get(envConfig.apiBaseUrl + `/visual/${project_id}/${scheme_id}`, {}, true)
  }
}

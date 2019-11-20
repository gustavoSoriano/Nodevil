const {assert} = require('chai')
const {auth}   = require('../app/middlewares/auth')()

describe('Testes de middlewares:', () => {

  describe('Validando jwt', () => {
    let payload = {
      req: {
        method:'get', 
        path:'/usuarios', 
        headers:{authorization:'bearer 53920590gjdfsjljkgfgq90'}
      },
      res: {
        status: cod => ({ json: json => json })
      },
      next: () => ({status:true}) 
    }
    
    it('Deve retornar status false', () => {
      assert.equal( auth(payload.req, payload.res, payload.next).error, 'Token inválido')
    })
  })

})






module.exports = app => {
   /**
    * 
    * DEMO TEMPLATE EJS
    */
   app.get('/', (req, res) => {
      res.render('home', {title:'Título da página', people: ['Jhon rambo', 'Bob esponja', 'Van dame']})
   })
}
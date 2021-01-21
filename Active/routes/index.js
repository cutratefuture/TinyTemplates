const express = require('express')
const router = express.Router()

// router.get('/', (req, res, next) => {
//   res.render('index')
// })
/* object menu */
const menu = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
]

/* route */
router.get('/', (req, res) => {
  let data = {
    title: 'Home',
    url: req.url,
    menu: menu,
  }
  res.render('index', data)
})

router.get('/about', (req, res) => {
  let data = {
    title: 'About',
    url: req.url,
    menu: menu,
  }
  res.render('pages/about', data)
})

router.get('/contact', (req, res) => {
  let data = {
    title: 'Contact',
    url: req.url,
    menu: menu,
  }
  res.render('pages/contact', data)
})

module.exports = router

const express = require('express')
const router = express.Router()
const Message = require('../models/Msg') //imports mongoose schema for message

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

router.get('/contact', (req, res, next) => {
  //contact
  res.render('pages/contact', {
    title: 'About',
    url: req.url,
    menu: menu,
    message: new Message(),
  })
})

router.post(
  //contact form submit
  '/submit',
  async (req, res, next) => {
    const { name, email, msg } = req.body
    let errors = []
    //check required fields
    if (!name || !email || !msg) {
      errors.push({ msg: 'Please fill in all Fields' })
    }
    req.flash('success_msg', 'Submitted!')
    req.message = new Message()
    next()
  },
  saveMessageAndRedirect('new')
)

function saveMessageAndRedirect(path) {
  return async (req, res) => {
    let message = req.message
    message.name = req.body.name
    message.email = req.body.email
    message.msg = req.body.msg
    try {
      message = await message.save()
      //browser path to object
      res.redirect('/contact') // on successful submit stay on page
    } catch (e) {
      res.render(`messages/${path}`, { message: message })
    }
  }
}

module.exports = router

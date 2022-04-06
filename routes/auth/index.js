import express from 'express'
import createDebug from 'debug'
import User from '../../models/User.js'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import bcrypt from 'bcrypt'

const saltRounds = 14

const debug = createDebug('week9:routes:auth')
const router = express.Router()

// Register a new user
router.post('/users', sanitizeBody, async (req, res) => {
  try {
    let newUser = new User(req.sanitizedBody)
    const itExists = await User.countDocuments({ email: newUser.email })
    if (itExists) {
      return res.status(400).json({
        errors: [
          {
            status: '400',
            title: 'Validation Error',
            detail: `Email address '${newUser.email}' is already registered.`,
            source: { pointer: '/data/attributes/email' },
          },
        ],
      })
    }

    router.post('/tokens', sanitizeBody, async (req, res) => {
      const { email, password } = req.sanitizedBody
      const user = await User.findOne({ email: email })

      const badHash = `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
      const hashedPassword = user ? user.password : badHash
      const passwordDidMatch = await bcrypt.compare(password, hashedPassword)

      if (!user || !passwordDidMatch) {
        return res.status(401).json({ errors: ['we will build this later'] })
      }

      const accessToken = 'iamatoken'
      res.status(201).json(formatResponseData({ accessToken }, 'tokens'))
    })

    newUser.password = await bcrypt.hash(newUser.password, saltRounds)
    await newUser.save()
    res.status(201).json(formatResponseData(newUser))
  } catch (err) {
    debug(err)
    res.status(500).send({
      errors: [
        {
          status: '500',
          title: 'Server error',
          description: 'Problem saving document to the database.',
        },
      ],
    })
  }
})

function formatResponseData(payload, type = 'users') {
  if (payload instanceof Array) {
    return { data: payload.map((resource) => format(resource)) }
  } else {
    return { data: format(payload) }
  }

  function format(resource) {
    const { _id, ...attributes } = resource.toJSON
      ? resource.toJSON()
      : resource
    return { type, id: _id, attributes }
  }
}

export default router

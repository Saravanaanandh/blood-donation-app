import express from 'express'
import {
    acceptReq,
    createRecipients, 
    getAllRequests, 
    getRequest, 
    rejectReq, 
    sendRequest
} from './../controllers/reqBloodController.js' 

const router = express.Router() 

router.get('/',getAllRequests)
router.get('/:id',getRequest)
router.put('/:id',acceptReq)
router.put('/reject/:id',rejectReq)

router.post('/new-recipient',createRecipients)
router.post('/:id',sendRequest)

export default router
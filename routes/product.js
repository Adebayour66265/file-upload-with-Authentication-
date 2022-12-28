const express = require('express');
const upload = require('../util/fileUpload');
const { isAuthenticated, isSeller } = require('../middlewares/auth');
const router = express.Router();

router.post('/create', isAuthenticated, isSeller, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                message: "something went wrong"
            });
        }

        const { name, price } = req.body;
        if (!name || !price || !req.file) {
            return res.status(400).json({
                message: "please enter correct data all input field must be filled "
            });
        }

        if (Number.isNaN(price)) {
            return res.status(400).json({
                message: "price should be number"
            })
        }

        let productDetails = {
            name,
            price,
            images: req.file.path
        }
        return res.status(200).json({
            status: "ok",
            productDetails
        })
    })

});



module.exports = router;
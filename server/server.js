const stripe=require("stripe")('k_test_51QvC5cPwOecqZ4beW18fsbuMo77pMuJSjM0rDa7rnN9r03NkfiA7Wqd8Au3vPMfyxeydZCgHZtZDDHXFtos1hzt100dcUOJc5M')
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     res.send("Hello");
// });

app.post("paymentSheet",async(rez,res)=>{
    const customer=await stripe.paymentIntent.create()
    const ephemeralKey=await stripe.ephemeralKey.create(
        
            {customer:customer.id},
            {appVersion:"2025-08-02"},
        
    )
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, 
        currency: "eur", 
        customer: customer.id,
        payment_method_types: ["card"],
    });
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
    });
})


const PORT = 4002; // ✅ Correct port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

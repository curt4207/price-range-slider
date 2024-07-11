const rangeValue = document.querySelector(".slider-container .price-slider");
const rangeInputValue = document.querySelectorAll(".range-input input");

// Set the price gap
let priceGap = 500;

// Add eventlistener to price input elements
const priceInputValue = document.querySelectorAll(".price-input input");

for(let i = 0; i < priceInputValue.length; i++) {
    priceInputValue[i].addEventListener("input", e => {

        // parse min and max value of the range input
        let minp = parseInt(priceInputValue[0].value)
        let maxp = parseInt(priceInputValue[1].value)
        let diff = maxp - minp;

        if (minp < 0) {
            alert("minimum price cannot be less than 0")
            priceInputValue[0].value = 0;
            minp = 0;
        }
        if (maxp > 10000) {
            alert("maximum price cannot be grater than 10000")
            priceInputValue[1].value = 10000;
            minp = 10000;
        }
        // Validate the input value
        if(minp > maxp - priceGap) {
            priceInputValue[0].value = maxp - priceGap;
            minp - maxp -priceGap;

            if(minp < 0) {
                priceInputValue[0].value = 0
                minp = 0
            }
        }

        // Check if the price gap is met and max price is within range

    if (diff >= priceGap && maxp <= rangeInputValue[1].max) {
        if(e.target.className === "min-input"){
            rangeInputValue[0].value = minp;
            let value1 = rangeInputValue[0].max;
            rangeValue.style.left = `${(minp / value1) * 100}%`
        }
    }
    });

    // Add event listeners to range input elements
    for(let i = 0 ; i < rangeInputValue.length; i++) {
        rangeInputValue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputValue[0].value)
            let maxVal = parseInt(rangeInputValue[1].value)

            let diff = maxVal - minVal;

            // check if the price gap is exceeded
            if(diff < priceGap) {
                
                // Check if the input is the min range input
                if(e.target.className === "min-range") {
                    rangeInputValue[0].value = maxVal - priceGap;
                } else {
                    rangeInputValue[1].value = minVal - priceGap;
                    
                }
            }
            else {
                // Update price inputs and range progress
                priceInputValue[0].value = minVal;
                priceInputValue[1].value = maxVal;
                rangeValue.style.left = `${(minVal / rangeInputValue[0].max) * 100}%`
                rangeValue.style.Right = `${100 - (maxVal / rangeInputValue[1].max) * 100}%`
            }
        })
    }
}
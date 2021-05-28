/*export default function formatCurreny (num) {
    return "£" + Number(num.toFixed(2)).toLocaleString() + " ";
} */

const formatCurrency = (num) => {    
    const price = Number(num).toFixed(2)
    return `£ ${price}`;
}

export default formatCurrency
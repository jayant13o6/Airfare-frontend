export const compareDestinations = (placeTofind, userInput) =>{
    // var x = userInput
    // if (placeTofind === {regex: /^x/i}){
    //     return true;
    // }
    var regex = new RegExp(userInput)
    if (regex.test(placeTofind)){return true}
    else{ return false}
}
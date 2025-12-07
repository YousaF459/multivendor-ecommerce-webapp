

function CartID(){

    const generateRandomString=()=>{
        const length=30;
        const characters="ABCDEFGHIJKL1234567"
        let randomString=""

        for (let i=0;i<length;i++){
            const randomIndex=Math.floor(Math.random()*characters.length)
            randomString+=characters.charAt(randomIndex)
        }

        localStorage.setItem("randomString",randomString)

    }

    const existingrandomString=localStorage.getItem("randomString")


    if (!existingrandomString){
        generateRandomString()
        
    }
    else{
        //Log existing sTRING
    }


    return existingrandomString;


}

export default CartID;
import { useEffect, useState } from "react"
import axiosAPI from "../../Axios/axiossetup"

function VendorData() {
  const [vendorData, setvendorData] = useState(null)



  useEffect(() => {
    axiosAPI.get("vendorData/")
      .then(res => {
        
        
        setvendorData(res.data.user.vendor_id)
        
      
      }
      )
      .catch(() => {
        
        setvendorData(null)
        
      })
  }, [])

  return vendorData
}

export default VendorData

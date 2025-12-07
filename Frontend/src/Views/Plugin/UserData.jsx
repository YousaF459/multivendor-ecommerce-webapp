import { useEffect, useState } from "react"
import axiosAPI from "../../Axios/axiossetup"

function useUserData() {
  const [userData, setUserData] = useState(null)



  useEffect(() => {
    axiosAPI.get("userData/")
      .then(res => {
        
        setUserData(res.data.id)
        
      
      }
      )
      .catch(() => {
        
        setUserData(null)
        
      })
  }, [])

  return userData
}

export default useUserData

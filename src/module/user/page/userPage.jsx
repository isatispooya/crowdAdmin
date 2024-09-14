import { Box } from "@mui/material";
import UserFeature from "../feature/userfeature";

const UserPage=()=>{
    console.log('dfkjd');
    
return(    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      padding: '0 16px',
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        padding: 3,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        marginTop: '40px',
      }}
    >
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">کاربران</h1>
      </div>
      <UserFeature/>
      </Box>
      </div>
    
      )
}
export default UserPage;